/*
 * Copyright (C) 2022 Rubixe
 *
 */

const {
  getMenuCategoryIdByRepository,
} = require("../repository/menuCategoryRepository");

// getRouteId middleware will insert categroy/menu id on the request body as categoryId iff available
/*
  @param req.routeName, res, next
  @return to next function defined in route
  @author galab
*/

const getRouteId = async (routeName) => {
  var categoryId = null;
  try {
    console.log("getting category id");
    categoryId = await getMenuCategoryIdByRepository(routeName);
  } catch (err) {
    console.log(err);
  }
  return categoryId;
};

module.exports = { getRouteId };
