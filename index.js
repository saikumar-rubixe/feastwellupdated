const express = require("express");
const multer = require("multer");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

// app configuration
const app = express();
app.use(express.json());

// routes import
const { authRoute } = require("./routes/authRoute");
const { residentRoute } = require("./routes/userRoute");
const { facilityRoute } = require("./routes/facilitycenterRoute");
const { centerHeadRoute } = require("./routes/centerHeadRoutes");
const { countryRoute } = require("./routes/countryRoutes");
const { statesRoute } = require("./routes/stateRoutes");
const { cityRoute } = require("./routes/cityRoutes");
const { userTypeRoute } = require("./routes/userTypeRoutes");
const { rolesRoute } = require("./routes/roles");
const { permissionsRoute } = require("./routes/permissionsRoute");
const { MenuCategoryRoute } = require("./routes/menuCategoryRoutes");
const { NutritionCategoryRoute } = require("./routes/nutritionCategoryRoutes");
const { menuContentsRoute } = require("./routes/mealMenuContentsRoutes");
const { mealItemsRoute } = require("./routes/mealItemsRoutes");
const { mealMenuRoute } = require("./routes/mealMenuRoutes");
const { residentFacilityRoute } = require("./routes/residentFacilityMapRoutes");
const { userLogRoute } = require("./routes/userActivityLogRoutes");
const { userIdActivityLogRoute } = require("./routes/userIdActivityLogRoutes");

//cors cross browser access
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// checking the logs using morgan
app.use(morgan("dev"));

// homepage response
app.get("/", (req, res) => {
  res.send(" feast well  Application  is running good");
});

//******************ROUTES******************* */

app.use("/api/v1/auth/login", authRoute);
app.use("/api/v1/user", residentRoute);
app.use("/api/v1/facility", facilityRoute);
app.use("/api/v1/centerHead", centerHeadRoute);
app.use("/api/v1/country", countryRoute);
app.use("/api/v1/states", statesRoute);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/userType", userTypeRoute);
app.use("/api/v1/roles", rolesRoute);
app.use("/api/v1/permissions", permissionsRoute);
app.use("/api/v1/menuCategory", MenuCategoryRoute);
app.use("/api/v1/nutritionCategory", NutritionCategoryRoute);
app.use("/api/v1/mealContents", menuContentsRoute);
app.use("/api/v1/mealItems", mealItemsRoute);
app.use("/api/v1/mealMenu", mealMenuRoute);
app.use("/api/v1/residentFacility", residentFacilityRoute);
app.use("/api/v1/userActivityLog", userLogRoute);
app.use("/api/v1/userIdActivityLog", userIdActivityLogRoute);

/************************************************ */
//  handling wrong navigation url
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error);
});

// port listening on ...
app.listen(4000, console.log("Feast well Server Running on Port ... "));

/**
 * // file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".txt");
    },
  }),
}).single("choose_file");

app.post("/upload", upload, (req, res) => {
  res.send("file uploaded succesfully");
});

 */
