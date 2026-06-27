I’ll inspect the key entrypoints and route wiring to map how each folder and file works together, then I’ll give you a detailed mind-map style guide of the whole backend.

I’m now pulling the core startup and configuration files so the mind map is accurate about app boot flow, database/auth setup, and shared middleware.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/package.json)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/config/email.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/config/db.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/index.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/config/auth.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/config/secret.js)

Core wiring is clear: Express bootstraps in index, mounts all feature routes, and shares auth/error/config layers from config and middleware. Next I’ll inspect route files plus representative controllers/services/models to map request flow end-to-end.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/user.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/product.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/order.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/admin.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/review.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/cloudinary.routes.js)

I’ve mapped major public/admin endpoints; next I’m collecting the remaining route groups and shared middleware so the mind map includes every API surface and protection/error layer.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/middleware/authorization.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/category.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/brand.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/coupon.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/middleware/global-error-handler.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/middleware/verifyToken.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/middleware/uploder.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/user.order.routes.js)

I now have the endpoint map and middleware behavior; I’ll extract controller/service/model responsibilities next so you get a complete “who does what” mind map across business logic and data layer.

Ran terminal command:  cd /workspaces/shofy-fashion-ecommerce-backend && rg -n "module\.exports|exports\.|const\s+\w+\s*=\s*async|function\s+\w+" controller/*.js services/*.js model/*.js errors/*.js utils/*.js seed.js

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/user.controller.js#1-1), lines 1 to 320

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/order.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/admin.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/product.controller.js)

I found a full auth/account flow and most product/order/admin logic; I’ll finish by reading the remaining controllers and all models/services so your map is complete and consistent.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/user.controller.js#320-320), lines 320 to 348

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/brand.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/category.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/coupon.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/upload.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/cloudinary.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/user.order.controller.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/controller/review.controller.js)

The remaining controller layer is captured. I’ll now map the service and model internals, since they define query logic, schema relations, and business rules behind those endpoints.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/services/category.service.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/services/product.service.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/services/brand.service.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/services/cloudinary.service.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/User.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Admin.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Products.js)

I’ve mapped core schema and service logic; final pass now covers the rest of models, helper utilities, error wrappers, seed data loader, and docs so nothing is missing in the guide.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Category.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Brand.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Coupon.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Order.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/model/Review.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/errors/api-error.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/errors/handle-cast-error.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/errors/handle-validation-error.js)

I’ve completed the data models and error system. I’ll quickly inspect utility modules and bootstrap docs/scripts so the final mind map includes seeding, token helpers, and integration utilities.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/token.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/cloudinary.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/routes/uploadFile.routes.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/vercel.json)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/seed.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/README.MD)

I’ve finished core runtime files. I’ll do one quick sweep of utility seed datasets to explain what each utils file contributes and where JSON-backed mock data is used.

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/products.js#1-1), lines 1 to 140

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/categories.js#1-1), lines 1 to 120

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/coupons.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/test.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/orders.js#1-1), lines 1 to 120

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/users.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/reviews.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/admin.js)

Read [](file:///workspaces/shofy-fashion-ecommerce-backend/utils/brands.js#1-1), lines 1 to 120

I’m done gathering project context and will now produce a mind-map plus a detailed folder-by-folder guide; first I’m checking memory space for any existing notes to align with your preferences in future sessions.

Read memory

Project architecture mapped. Here is a full folder + flow guide with a mind-map view of what is available and how files work together.

**Mind Map (System View)**
Shofy Backend  
├─ App Entry  
│  ├─ index.js → boots Express, mounts routes, static files, error handling  
│  ├─ package.json → scripts/dependencies  
│  └─ vercel.json → Vercel runtime routing  
├─ Config  
│  ├─ secret.js → reads env vars into one config object  
│  ├─ db.js → MongoDB connection  
│  ├─ auth.js → JWT auth helpers/middleware  
│  └─ email.js → Nodemailer sendEmail helper  
├─ Routing Layer  
│  ├─ user.routes.js  
│  ├─ admin.routes.js  
│  ├─ product.routes.js  
│  ├─ category.routes.js  
│  ├─ brand.routes.js  
│  ├─ order.routes.js  
│  ├─ user.order.routes.js  
│  ├─ coupon.routes.js  
│  ├─ review.routes.js  
│  ├─ cloudinary.routes.js  
│  └─ uploadFile.routes.js  
├─ Controller Layer  
│  ├─ request parsing, validation checks, response formatting  
│  ├─ delegates business logic to services (brand/category/product/cloudinary)  
│  └─ direct model access in user/admin/order/review/coupon controllers  
├─ Service Layer  
│  ├─ product.service.js  
│  ├─ category.service.js  
│  ├─ brand.service.js  
│  └─ cloudinary.service.js  
├─ Data Layer (Mongoose Models)  
│  ├─ User.js  
│  ├─ Admin.js  
│  ├─ Products.js  
│  ├─ Category.js  
│  ├─ Brand.js  
│  ├─ Order.js  
│  ├─ Review.js  
│  └─ Coupon.js  
├─ Middleware & Error Handling  
│  ├─ verifyToken.js → JWT verification  
│  ├─ authorization.js → role gate  
│  ├─ uploder.js → local file upload filter/storage  
│  ├─ global-error-handler.js  
│  └─ errors helpers for cast/validation/custom API errors  
└─ Seed/Data Utilities  
   ├─ seed.js imports demo data into collections  
   └─ utils JSON-like datasets + token/cloudinary helpers

**How Requests Flow (End-to-End)**
1. Client calls endpoint mounted in index.js.
2. Route file in routes maps path to controller method.
3. Optional middleware runs first (JWT verify, uploader, role checks).
4. Controller handles request data and calls:
   1. Service layer for structured business logic, or
   2. Model directly for CRUD-heavy handlers.
5. Mongoose model performs DB operations in model.
6. Response returns JSON.
7. Any thrown error is normalized by global-error-handler.js.

**Folder-by-Folder Detailed Guide**

| Folder/File | What it does | Key working details |
|---|---|---|
| index.js | Main server bootstrap | Loads dotenv, enables CORS/JSON/morgan/static files, connects DB, mounts all API groups under /api/*, defines root and 404, then global error handler. |
| config | Environment + external integrations | secret.js centralizes env keys (DB, JWT, SMTP, Cloudinary, Stripe, URLs); db.js connects with Mongoose; email.js sends email; auth.js provides token utilities and auth helpers. |
| routes | URL map | Keeps endpoint structure clean; each route points to one controller module. |
| controller | Request/response logic | User/admin auth, catalog CRUD, order/payment, coupons, reviews, dashboard analytics, cloudinary upload/delete. |
| services | Reusable business logic | Product/category/brand services implement query/update behavior and relationship syncing; cloudinary service uploads/deletes media. |
| model | MongoDB schemas | Defines entities, validations, refs, hooks (password hash, invoice autogen), enums and timestamps. |
| middleware | Cross-cutting request logic | Auth verification, role authorization, upload filtering/storage, centralized error serializer. |
| errors | Error shape adapters | Converts Mongoose cast/validation/custom errors into a consistent API error format. |
| utils | Support + seed datasets | Token helper, cloudinary config, and large demo datasets used by seeding script. |
| seed.js | One-shot data bootstrap | Clears and inserts data for brand/category/product/coupon/order/user/review/admin collections. |
| images | Local uploaded images | Used by disk uploader middleware and served statically by Express. |

**API Surface by Route Group**

| Base path | Route file | Main capability |
|---|---|---|
| /api/user | user.routes.js | Signup/login, email verification, forgot/reset/change password, profile update, provider login |
| /api/admin | admin.routes.js | Admin/staff register/login/manage staff/password reset |
| /api/product | product.routes.js | Product CRUD, by-type listing, offers, related, top-rated, stock-out, review-product list |
| /api/category | category.routes.js | Category CRUD and filtering by product type/show status |
| /api/brand | brand.routes.js | Brand CRUD, active/all brands |
| /api/order | order.routes.js | Stripe payment intent, create order, list/get order, update status |
| /api/user-order | user.order.routes.js | User order history + dashboard analytics + sales reports |
| /api/coupon | coupon.routes.js | Coupon CRUD/bulk add |
| /api/review | review.routes.js | Add review with purchase check, delete product reviews |
| /api/cloudinary | cloudinary.routes.js | Single/multi image upload and image delete in Cloudinary |

**Core Entity Relationships**

- Product links to Brand and Category by embedded name + referenced id in Products.js.
- Product has many Review ids.
- User has many Review ids in User.js.
- Review stores userId + productId in Review.js.
- Order references User and includes cart snapshot objects in Order.js.
- Brand and Category keep product id arrays in Brand.js and Category.js.
- Service layer updates these links during product creation/import in product.service.js.

**Important Working Behaviors**

- User password hashing is automatic on save hook in User.js.
- Order invoice number auto-increments in pre-save hook in Order.js.
- Product add flow prepends primary image into imageURLs in product.controller.js.
- Review creation enforces one-review-per-user-per-product and purchase verification in review.controller.js.
- Dashboard analytics (today/yesterday/month totals, sales report, top category) run in user.order.controller.js.
- Stripe payment intent is handled in order.controller.js.

**Environment Variables Expected**
Defined through secret.js:
- PORT, NODE_ENV, MONGO_URI
- TOKEN_SECRET, JWT_SECRET_FOR_VERIFY
- SERVICE, EMAIL_USER, EMAIL_PASS, HOST, EMAIL_PORT
- CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_PRESET
- STRIPE_KEY
- STORE_URL, ADMIN_URL

If you want, I can generate a second view focused only on endpoints (as an API map with method + path + controller function) so you can use it as backend documentation directly..