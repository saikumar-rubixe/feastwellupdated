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
    const routeFullName = req.originalUrl;
    const routeArray = routeFullName.split("/");

    routeName = routeArray[routeArray.length - 1];

    const isInt = parseInt(routeName);

    if (isInt) {
      routeName = routeArray[routeArray.length - 2];
    }
  } catch (err) {}
  return routeName;
};

module.exports = { getRouteName };
