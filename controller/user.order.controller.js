const mongoose = require("mongoose");
const Order = require("../model/Order");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const isToday = require("dayjs/plugin/isToday");
const isYesterday = require("dayjs/plugin/isYesterday");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");

// Apply necessary plugins to dayjs
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// Helper function to safely query string or objectId values dynamically
const getSafeUserMatch = (userId) => {
  if (!userId) return null;
  // If it's a Clerk alphanumeric user ID string, return it raw
  if (userId.toString().startsWith("user_")) {
    return userId.toString();
  }
  // If it's a legacy valid 24-character hex ID, allow native casting fallback
  if (mongoose.Types.ObjectId.isValid(userId)) {
    return new mongoose.Types.ObjectId(userId);
  }
  return userId.toString();
};

// 1. Get All Orders For Dynamic User Dashboard
module.exports.getOrderByUser = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const currentUserId = req.user?._id;
    if (!currentUserId) {
      return res.status(401).json({ success: false, message: "User context unverified" });
    }

    const safeUserMatch = getSafeUserMatch(currentUserId);

    const totalDoc = await Order.countDocuments({ user: safeUserMatch });

    // Aggregate Pending Metrics Safely
    const totalPendingOrder = await Order.aggregate([
      {
        $match: {
          status: "pending",
          user: safeUserMatch,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Aggregate Processing Metrics Safely
    const totalProcessingOrder = await Order.aggregate([
      {
        $match: {
          status: "processing",
          user: safeUserMatch,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Aggregate Delivered Metrics Safely
    const totalDeliveredOrder = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          user: safeUserMatch,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const orders = await Order.find({ user: safeUserMatch })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limits);

    res.send({
      orders,
      pending: totalPendingOrder.length === 0 ? 0 : totalPendingOrder[0].count,
      processing: totalProcessingOrder.length === 0 ? 0 : totalProcessingOrder[0].count,
      delivered: totalDeliveredOrder.length === 0 ? 0 : totalDeliveredOrder[0].count,
      totalDoc,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get Single Order Details By ID
module.exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Admin Panel - Financial Aggregates
exports.getDashboardAmount = async (req, res, next) => {
  try {
    const todayStart = dayjs().startOf("day");
    const todayEnd = dayjs().endOf("day");

    const yesterdayStart = dayjs().subtract(1, "day").startOf("day");
    const yesterdayEnd = dayjs().subtract(1, "day").endOf("day");

    const monthStart = dayjs().startOf("month");
    const monthEnd = dayjs().endOf("month");

    const todayOrders = await Order.find({
      createdAt: { $gte: todayStart.toDate(), $lte: todayEnd.toDate() },
    });

    let todayCashPaymentAmount = 0;
    let todayCardPaymentAmount = 0;

    todayOrders.forEach((order) => {
      if (order.paymentMethod === "COD") {
        todayCashPaymentAmount += order.totalAmount;
      } else if (order.paymentMethod === "Card") {
        todayCardPaymentAmount += order.totalAmount;
      }
    });

    const yesterdayOrders = await Order.find({
      createdAt: { $gte: yesterdayStart.toDate(), $lte: yesterdayEnd.toDate() },
    });

    let yesterDayCashPaymentAmount = 0;
    let yesterDayCardPaymentAmount = 0;

    yesterdayOrders.forEach((order) => {
      if (order.paymentMethod === "COD") {
        yesterDayCashPaymentAmount += order.totalAmount;
      } else if (order.paymentMethod === "Card") {
        yesterDayCardPaymentAmount += order.totalAmount;
      }
    });

    const monthlyOrders = await Order.find({
      createdAt: { $gte: monthStart.toDate(), $lte: monthEnd.toDate() },
    });

    const totalOrders = await Order.find();
    
    const todayOrderAmount = todayOrders.reduce((total, order) => total + order.totalAmount, 0);
    const yesterdayOrderAmount = yesterdayOrders.reduce((total, order) => total + order.totalAmount, 0);
    const monthlyOrderAmount = monthlyOrders.reduce((total, order) => total + order.totalAmount, 0);
    const totalOrderAmount = totalOrders.reduce((total, order) => total + order.totalAmount, 0);

    res.status(200).send({
      todayOrderAmount,
      yesterdayOrderAmount,
      monthlyOrderAmount,
      totalOrderAmount,
      todayCardPaymentAmount,
      todayCashPaymentAmount,
      yesterDayCardPaymentAmount,
      yesterDayCashPaymentAmount,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Admin Panel - Weekly Analytics Chart Data
exports.getSalesReport = async (req, res, next) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const salesOrderChartData = await Order.find({
      updatedAt: {
        $gte: startOfWeek,
        $lte: new Date(),
      },
    });

    const salesReport = salesOrderChartData.reduce((resObj, value) => {
      const onlyDate = value.updatedAt.toISOString().split("T")[0];

      if (!resObj[onlyDate]) {
        resObj[onlyDate] = { date: onlyDate, total: 0, order: 0 };
      }
      resObj[onlyDate].total += value.totalAmount;
      resObj[onlyDate].order += 1;
      return resObj;
    }, {});

    res.status(200).json({ salesReport: Object.values(salesReport) });
  } catch (error) {
    next(error);
  }
};

// 5. Admin Panel - Category Volume Metrics
exports.mostSellingCategory = async (req, res, next) => {
  try {
    const categoryData = await Order.aggregate([
      { $unwind: "$cart" },
      {
        $group: {
          _id: "$cart.productType",
          count: { $sum: "$cart.orderQuantity" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({ categoryData });
  } catch (error) {
    next(error);
  }
};

// 6. Admin Panel - Live Global Feed Stream
exports.getDashboardRecentOrder = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const queryObject = {
      status: { $in: ["pending", "processing", "delivered", "cancel"] },
    };

    const totalDoc = await Order.countDocuments(queryObject);

    const orders = await Order.aggregate([
      { $match: queryObject },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: limits },
      {
        $project: {
          invoice: 1,
          createdAt: 1,
          updatedAt: 1,
          paymentMethod: 1,
          name: 1,
          user: 1,
          totalAmount: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).send({
      orders: orders,
      page: pages,
      limit: limits,
      totalOrder: totalDoc,
    });
  } catch (error) {
    next(error);
  }
};