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
const { runQuery, con } = require("../config/database");
const { menuCategoryModel } = require("../models/menuCategoryModel");
let newDate = new Date();

// 1 get all categories
const getAllMenuCategoryDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "SELECT * from  `menu_category` where 1=1 ";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new menuCategoryModel();
        let result = results[i];
        model.fill(
          (categoryId = result.category_id),
          (categoryName = result.category_name),
          (menuStatus = result.status),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 2 get by id
const getMenuCategoryDetailByIdRepository = async (id, res) => {
  try {
    let query = "SELECT * FROM `menu_category` where `category_id` =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new menuCategoryModel();
      model.fill(
        (categoryId = result.category_id),
        (categoryName = result.category_name),
        (menuStatus = result.status),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

//  3 create
const createMenuCategoryRepository = async (categoryName, menuStatus) => {
  try {
    let query =
      "INSERT into `menu_category` (`category_name`,`status`,`created_date`,`updated_date`) VALUES(?,?,?,?) ";
    let sql = con.format(query, [categoryName, menuStatus, newDate, newDate]);
    let results = await runQuery(sql);
    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 4 update
const updateMenuCategoryRepository = async (id, categoryName, menuStatus) => {
  try {
    let query =
      " UPDATE `menu_category` set `category_name`=?,`status`=?,`updated_date`=? where category_id  =?";
    let sql = con.format(query, [categoryName, menuStatus, newDate, id]);
    let results = await runQuery(sql);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

//  delete
const deleteMenuCategoryRepository = async (id, res) => {
  try {
    let query = "DELETE  from  `menu_category` where category_id=?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

module.exports = {
  getMenuCategoryDetailByIdRepository,
  getAllMenuCategoryDetailsRepository,
  createMenuCategoryRepository,
  updateMenuCategoryRepository,
  deleteMenuCategoryRepository,
};
