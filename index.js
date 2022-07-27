const express = require("express");

const createHttpError = require("http-errors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
//const AppError = require("./utils/appError");

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
const { imageRoute2 } = require("./routes/imageupload2");

//  cors cross browser access
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

//* *****************ROUTES******************* */

let apiPath = "/feastwell-backend/api/";
let apiVersion = "v1";
let apiBasePath = `${apiPath}${apiVersion}/`;
let localurl = "/feastwell-backend/api/v1/";

app.use(`${apiBasePath}auth/login`, authRoute);
app.use(`${apiBasePath}user`, residentRoute);
app.use(`${apiBasePath}facility`, facilityRoute);
app.use(`${apiBasePath}centerHead`, centerHeadRoute);
app.use(`${apiBasePath}country`, countryRoute);
app.use(`${apiBasePath}states`, statesRoute);
app.use(`${apiBasePath}city`, cityRoute);
app.use(`${apiBasePath}userType`, userTypeRoute);
app.use(`${apiBasePath}roles`, rolesRoute);
app.use(`${apiBasePath}permissions`, permissionsRoute);
app.use(`${apiBasePath}menuCategory`, MenuCategoryRoute);
app.use(`${apiBasePath}nutritionCategory`, NutritionCategoryRoute);
app.use(`${apiBasePath}mealContents`, menuContentsRoute);
app.use(`${apiBasePath}mealItems`, mealItemsRoute);
app.use(`${apiBasePath}mealMenu`, mealMenuRoute);
app.use(`${apiBasePath}residentFacility`, residentFacilityRoute);
app.use(`${apiBasePath}userActivityLog`, userLogRoute);
app.use(`${apiBasePath}userIdActivityLog`, userIdActivityLogRoute);

/**   ********************************************** */
/** for  local host testing  and devlopment purpose*/
app.use(`${localurl}auth/login`, authRoute);
app.use(`${localurl}user`, residentRoute);
app.use(`${localurl}facility`, facilityRoute);
app.use(`${localurl}centerHead`, centerHeadRoute);
app.use(`${localurl}country`, countryRoute);
app.use(`${localurl}states`, statesRoute);
app.use(`${localurl}city`, cityRoute);
app.use(`${localurl}userType`, userTypeRoute);
app.use(`${localurl}roles`, rolesRoute);
app.use(`${localurl}permissions`, permissionsRoute);
app.use(`${localurl}menuCategory`, MenuCategoryRoute);
app.use(`${localurl}nutritionCategory`, NutritionCategoryRoute);
app.use(`${localurl}mealContents`, menuContentsRoute);
app.use(`${localurl}mealItems`, mealItemsRoute);
app.use(`${localurl}mealMenu`, mealMenuRoute);
app.use(`${localurl}residentFacility`, residentFacilityRoute);
app.use(`${localurl}userActivityLog`, userLogRoute);
app.use(`${localurl}userIdActivityLog`, userIdActivityLogRoute);
app.use(`${localurl}uploadMealImage`, imageRoute2);

/**    local host testing    */

//  handling wrong navigation url
// app.use((req, res, next) => {
//   next(createHttpError.NotFound());
// });
// app.use((error, req, res, next) => {
//   error.status = error.status || 500;
//   res.status(error.status);
//   res.send(error);
// });

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
