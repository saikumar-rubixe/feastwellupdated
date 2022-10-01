/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {menuCategoryModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * *menu category is to chechk the status (Active/InActive)
 * 
 * The methods Calls were as follows
 * 1.getMenuCategoryDetailByIdRepository -->fetch the user by ID
 *
 */
let { runQuery, con } = require("../config/database");

let { menuCategoryModel } = require("../models/menuCategoryModel");
const { getPstDate } = require("../helper/getCanadaTime");

// 1 get all categories
const getAllMenuCategoryDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "SELECT * from  `menu_category` where 1=1 ";
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new menuCategoryModel();
        let result = results[i];
        model.fill(
          (categoryId = result.menu_category_id),
          (categoryName = result.category_name),
          (menuStatus = result.status),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date),
          (parentFlag = result.parent_flag),
          (parentId = result.parent_id),
          (menuRoutes = result.menu_routes),
          (desktopSortOrder = result.desktop_sort_order),
          (mobileSortOrder = result.mobile_sort_order),
          (desktopIcons = result.desktop_icons),
          (mobileIcons = result.mobile_icons)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 2 get by id
const getMenuCategoryDetailByIdRepository = async (id, res) => {
  try {
    let query = "SELECT * FROM `menu_category` where `menu_category_id` =?";
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new menuCategoryModel();
      model.fill(
        (categoryId = result.menu_category_id),
        (categoryName = result.category_name),
        (menuStatus = result.status),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date),
        (parentFlag = result.parent_flag),
        (parentId = result.parent_id),
        (menuRoutes = result.menu_routes),
        (desktopSortOrder = result.desktop_sort_order),
        (mobileSortOrder = result.mobile_sort_order),
        (desktopIcons = result.desktop_icons),
        (mobileIcons = result.mobile_icons)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//  3 create
/**
 *
 * @param {*} categoryName
 * @param {*} menuStatus
 * @returns created Id
 */
const createMenuCategoryRepository = async (categoryName, menuStatus) => {
  try {
    let query =
      "INSERT into `menu_category` (`category_name`,`status`,`created_date`,`updated_date`) VALUES(?,?,?,?) ";

    let results = await runQuery(query, [
      categoryName,
      menuStatus,
      getPstDate(),
      getPstDate(),
    ]);
    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 4 update
/**
 *
 * @param {*} id
 * @param {*} categoryName
 * @param {*} menuStatus
 * @returns  true or false
 */
const updateMenuCategoryRepository = async (id, categoryName, menuStatus) => {
  try {
    let query =
      " UPDATE `menu_category` set `category_name`=?,`status`=?,`updated_date`=? where menu_category_id  =?";

    let results = await runQuery(query, [
      categoryName,
      menuStatus,
      getPstDate(),
      id,
    ]);
    let value = results.affectedRows;

    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 5   delete deleteMenuCategoryRepository deletes the record
/**
 *
 * @param {*} id
 * @param {*} res
 * @returns  true or false
 * @author
 */
const deleteMenuCategoryRepository = async (id, res) => {
  try {
    let query = "DELETE  from  `menu_category` where menu_category_id=?";
    let results = await runQuery(query, [id]);
    let value = results.affectedRows;

    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 6. getMenuCategoryIdByMenuRouteRepository will return categroy id for the provided routeName
/*
 * @param routeName
 *  @return category_id
 * @author galab
 */

const getMenuCategoryIdByRepository = async (routeName) => {
  var returnId = null;
  try {
    let query = `SELECT menu_category_id FROM menu_category where 
    menu_routes = '${routeName}'
    OR menu_routes LIKE '${routeName},%'  
    OR menu_routes LIKE '%,${routeName},%' 
    OR menu_routes LIKE '%,${routeName}' limit 1`;
    console.log(`route request is ${routeName}`); //delete
    let results = await runQuery(query);

    if (results.length != 0) {
      let result = results[0];
      returnId = result.menu_category_id;
    }
  } catch (error) {
    console.log("Error: getMenuCategoryIdByRepository, " + error); //delete
  }
  return returnId;
};

module.exports = {
  getMenuCategoryDetailByIdRepository,
  getAllMenuCategoryDetailsRepository,
  createMenuCategoryRepository,
  updateMenuCategoryRepository,
  deleteMenuCategoryRepository,
  // get category by route name
  getMenuCategoryIdByRepository,
};
