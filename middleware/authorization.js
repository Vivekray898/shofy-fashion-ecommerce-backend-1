// backend/middleware/authorization.js
module.exports = (...roles) => {
  return (req, res, next) => {
    // Read the auth claims populated automatically by @clerk/express
    const clerkUserId = req.auth?.userId;
    const userRole = req.auth?.sessionClaims?.metadata?.role || "user";

    // Check if user is authenticated
    if (!clerkUserId) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in"
      });
    }

    // If roles array filter restrictions exist (like admin checking)
    if (roles.length > 0 && !roles.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        error: "You are not authorized to access this resource"
      });
    }

    // Maintain reverse compatibility for your data controllers that look for req.user._id
    req.user = {
      _id: clerkUserId,
      role: userRole
    };

    next();
  };
};