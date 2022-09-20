/*
 * Copyright (C) 2022 Rubixe
 *
 */

// getRouteName middleware will insert categroy/menu name on the request body as routeName
/*
  @param req.originalUrl, res, next
  @return to next function defined in route
  @author galab
*/
const getRouteName = function (req) {
  var routeName = "/";
  try {
    console.log("getting route name");
    const routeFullName = req.originalUrl;
    const routeArray = routeFullName.split("/");
    routeName = routeArray[routeArray.length - 1];

    const isInt = parseInt(routeName);
    console.log(isInt);
    if (isInt) {
      routeName = routeArray[routeArray.length - 2];
    }
    console.log(routeName);
  } catch (err) {
    console.log(err);
  }
  return routeName;
};

module.exports = { getRouteName };
