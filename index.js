const express = require("express");
var fs = require("fs");
const createHttpError = require("http-errors");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet"); //This library helps to secure Express APIs by defining various HTTP headers
const xss = require("xss-clean");

const morgan = require("morgan"); // for logs
var path = require("path"); // for logs
var rfs = require("rotating-file-stream"); // for logs
dotenv.config();

// app configuration
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
//* checking the logs using morgan
app.use(morgan("dev"));

//* Routes import
const { authRoute } = require("./routes/loginAndAuthentication/authRoute");
const {
  refreshRoute,
} = require("./routes/loginAndAuthentication/refreshRoute");

const { userRoute } = require("./routes/usersAndActivity/userRoute");
const { residentRoute } = require("./routes/usersDetails/residentRoutes");
const { facilityRoute } = require("./routes/facility/facilityRoute");
const { kitchenRoute } = require("./routes/facility/kitchenRoutes");

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
  userFacilityRoute,
} = require("./routes/mappings/userFacilityMapRoutes");
// residents by nurse id route
const {
  nurseResident,
} = require("./routes/usersAndActivity/nurseResidentFacilityRoute");
const {
  userActivityLog,
} = require("./routes/usersAndActivity/userActivityLogRoutes");

const {
  imageUploadRoute,
} = require("./routes/mealImageUrlAndResponseData/imageupload2"); // image upload to s3

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
  residentCarePlanRoutes,
} = require("./routes/usersDetails/residentCarePlanRoutes");

const {
  mealTypes,
} = require("./routes/mealImageUrlAndResponseData/mealTypesRoutes");

const { analyticsRoute } = require("./routes/analytics/analyticsRoute");
const { array } = require("joi");

//***********************************************************************************
//  cors cross browser access
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// homepage response
app.get("/", (req, res) => {
  res.send(" feast well  Application  is running good");
});

//* *****************ROUTES******************* */

let apiPath = "/feastwell-backend/api/";
let apiVersion = "v1";
let apiBasePath = `${apiPath}${apiVersion}/`;

// !Login!
app.use(`${apiBasePath}auth/login`, authRoute);
app.use(`${apiBasePath}auth/refresh`, refreshRoute);

// ^ Country State City Routes
app.use(`${apiBasePath}country`, countryRoute);
app.use(`${apiBasePath}states`, statesRoute);
app.use(`${apiBasePath}city`, cityRoute);

//* SideBar! MENU
app.use(`${apiBasePath}menuCategory`, MenuCategoryRoute);

// ^Roles and Permissions
app.use(`${apiBasePath}roles`, rolesRoute);
app.use(`${apiBasePath}permissions`, permissionsRoute);

// ?meal and menu
app.use(`${apiBasePath}mealTypes`, mealTypes);
app.use(`${apiBasePath}mealItems`, mealItemsRoute);
app.use(`${apiBasePath}mealMenu`, mealMenuRoute);
app.use(`${apiBasePath}mealContents`, menuContentsRoute);

// * Facility and kitchen
app.use(`${apiBasePath}facility`, facilityRoute); // facility
app.use(`${apiBasePath}kitchen`, kitchenRoute); // kitchen

// ^ users
app.use(`${apiBasePath}userType`, userTypeRoute);
app.use(`${apiBasePath}user`, userRoute); // users {admins,nurse,manger,dietcian etc}
app.use(`${apiBasePath}resident`, residentRoute); // residents

//* Activity Log
app.use(`${apiBasePath}userActivityLog`, userActivityLog); // users activity log

//! Mappings with user and nurse etc
app.use(`${apiBasePath}userFacility`, userFacilityRoute); // residents facility mapping
app.use(`${apiBasePath}nurseResident`, nurseResident); // resident of a faciluty where nurse works

// ^ Residents and addtional details
app.use(`${apiBasePath}residentsDetails`, residentCarePlanRoutes); //resident additional routes
app.use(`${apiBasePath}nutritionalRiskFactors`, NutritionalRiskFactorRoute); //resident additional details risk factors

// !images upload and Response

app.use(`${apiBasePath}uploadMealImage`, imageUploadRoute); //image uploads
app.use(`${apiBasePath}imageDetails`, imageDetailsRoute); //image details
app.use(`${apiBasePath}imageResponse`, imagePredictionResponse); //images prediction details

//^ Analytics
app.use(`${apiBasePath}analytics`, analyticsRoute); //nutrients details

//*************                    END OF ROUTES           ****************** */

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
app.listen(
  process.env.PORT,
  console.log(`Feast well Server Running on Port ...${process.env.PORT} `)
);
