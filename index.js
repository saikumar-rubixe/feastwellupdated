const express = require("express");

const createHttpError = require("http-errors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet"); //This library helps to secure Express APIs by defining various HTTP headers
const xss = require("xss-clean");

dotenv.config();
//const AppError = require("./utils/appError");

// app configuration
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

// routes import
//const { NutritionCategoryRoute } = require("./routes/nutritionCategoryRoutes"); // delete
//const { centerHeadRoute } = require("./routes/centerHeadRoutes"); // delete

const { authRoute } = require("./routes/loginAndAuthentication/authRoute");
const { userRoute } = require("./routes/usersAndActivity/userRoute");
const { facilityRoute } = require("./routes/facility/facilityRoute");
const { countryRoute } = require("./routes/countryStateCity/countryRoutes");
const { statesRoute } = require("./routes/countryStateCity/stateRoutes");
const { cityRoute } = require("./routes/countryStateCity/cityRoutes");
const { userTypeRoute } = require("./routes/rolesPermissions/userTypeRoutes");
const { rolesRoute } = require("./routes/rolesPermissions/roles");
const {
  permissionsRoute,
} = require("./routes/rolesPermissions/permissionsRoute");
const { MenuCategoryRoute } = require("./routes/sideBar/menuCategoryRoutes");
const {
  menuContentsRoute,
} = require("./routes/mealsAndMenu/mealMenuContentsRoutes");
const { mealItemsRoute } = require("./routes/mealsAndMenu/mealItemsRoutes");
const { mealMenuRoute } = require("./routes/mealsAndMenu/mealMenuRoutes");
const {
  residentFacilityRoute,
} = require("./routes/mappings/residentFacilityMapRoutes");
const {
  userActivityLog,
} = require("./routes/usersAndActivity/userActivityLogRoutes");
const {
  userIdActivityLogRoute,
} = require("./routes/usersAndActivity/userIdActivityLogRoutes");

const {
  imageUploadRoute,
} = require("./routes/mealImageUrlAndResponseData/imageupload2"); // image upload to s3

const { rolesRoute2 } = require("./helper/rolesCheck");
const {
  NutritionalRiskFactorRoute,
} = require("./routes/usersDetails/nutritionalRiskFactorRoutes");
const {
  imagePredictionResponse,
} = require("./routes/mealImageUrlAndResponseData/imagePredictionReponse");
const {
  imageDetailsRoute,
} = require("./routes/mealImageUrlAndResponseData/imageDetailsRoutes");
const { sideBarCheckRoute } = require("./routes/sideBar/sideBarCheck");
const {
  residentDetailsRoutes,
} = require("./routes/usersDetails/residentDetailsRoutes");
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

//app.use(`${apiBasePath}centerHead`, centerHeadRoute);//delete
//app.use(`${apiBasePath}nutritionCategory`, NutritionCategoryRoute);//delete

// ^ Country State City Routes
app.use(`${apiBasePath}country`, countryRoute);
app.use(`${apiBasePath}states`, statesRoute);
app.use(`${apiBasePath}city`, cityRoute);

// !Login!
app.use(`${apiBasePath}auth/login`, authRoute);
// !SideBar!
app.use(`${apiBasePath}menuCategory`, MenuCategoryRoute);
// ^Roles and Permissions
app.use(`${apiBasePath}roles`, rolesRoute);
app.use(`${apiBasePath}permissions`, permissionsRoute);
app.use(`${apiBasePath}userType`, userTypeRoute);
app.use(`${apiBasePath}menuAccess`, sideBarCheckRoute);

// ?meal and menu
app.use(`${apiBasePath}mealItems`, mealItemsRoute);
app.use(`${apiBasePath}mealMenu`, mealMenuRoute);
app.use(`${apiBasePath}mealContents`, menuContentsRoute);

// ^ users and users details
app.use(`${apiBasePath}user`, userRoute);
app.use(`${apiBasePath}facility`, facilityRoute);
app.use(`${apiBasePath}userActivityLog`, userActivityLog);
app.use(`${apiBasePath}userIdActivityLog`, userIdActivityLogRoute);
app.use(`${apiBasePath}residentFacility`, residentFacilityRoute);

app.use(`${apiBasePath}residentsDetails`, residentDetailsRoutes);
app.use(`${apiBasePath}nutritionalRiskFactors`, NutritionalRiskFactorRoute);

// !images upload and Response
app.use(`${apiBasePath}imageDetails`, imageDetailsRoute);
app.use(`${apiBasePath}uploadMealImage`, imageUploadRoute);
app.use(`${apiBasePath}imageResponse`, imagePredictionResponse);

/**   *********************************************************************************************************************************** */
//    TODO       FOR  LOCAL HOST TESTING  AND DEVLOPMENT PURPOSE ONLY     //
//app.use(`${localurl}centerHead`, centerHeadRoute);//delete
//app.use(`${localurl}nutritionCategory`, NutritionCategoryRoute);//delete

// ^ Country State City Routes
app.use(`${localurl}country`, countryRoute);
app.use(`${localurl}states`, statesRoute);
app.use(`${localurl}city`, cityRoute);

// !Login!
app.use(`${localurl}auth/login`, authRoute);
// !SideBar!
app.use(`${localurl}menuCategory`, MenuCategoryRoute);
// ^Roles and Permissions
app.use(`${localurl}roles`, rolesRoute);
app.use(`${localurl}permissions`, permissionsRoute);
app.use(`${localurl}userType`, userTypeRoute);
app.use(`${localurl}menuAccess`, sideBarCheckRoute);

// ?meal and menu
app.use(`${localurl}mealItems`, mealItemsRoute);
app.use(`${localurl}mealMenu`, mealMenuRoute);
app.use(`${localurl}mealContents`, menuContentsRoute);

// ^ users and users details
app.use(`${localurl}user`, userRoute);
app.use(`${localurl}facility`, facilityRoute);
app.use(`${localurl}userActivityLog`, userActivityLog);
app.use(`${localurl}userIdActivityLog`, userIdActivityLogRoute);
app.use(`${localurl}residentFacility`, residentFacilityRoute);

app.use(`${localurl}residentsDetails`, residentDetailsRoutes);
app.use(`${localurl}nutritionalRiskFactors`, NutritionalRiskFactorRoute);

// !images upload and Response
app.use(`${localurl}imageDetails`, imageDetailsRoute);
app.use(`${localurl}uploadMealImage`, imageUploadRoute);
app.use(`${localurl}imageResponse`, imagePredictionResponse);
//*  local host testing    */

//  handling wrong navigation url
// app.use((req, res, next) => {
//   next(createHttpError.NotFound());
// });
// app.use((error, req, res, next) => {
//   error.status = error.status || 500;
//   res.status(error.status);
//   res.send(error);
// });

// Data Sanitization against XSS attacks
app.use(xss());

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
