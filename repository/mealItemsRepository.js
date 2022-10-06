let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
const { getPstDate } = require("../helper/getCanadaTime");
let { mealItemsModel } = require("../models/mealitemsModel");

const getMealItemsDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_items` where meal_item_id=?";
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new mealItemsModel();
      model.fill(
        (mealItem = result.meal_item_id),
        (mealItemName = result.meal_item_name),
        (status = result.status),
        (createdBy = result.created_by),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getAllMealItemsDetailsRepository = async (status) => {
  try {
    let array = [];
    let query = "select * from `meal_items` where 1=1  ";
    if (status) {
      query += " and status =" + status;
    }
    let results = await runQuery(query);

    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new mealItemsModel();
        let result = results[i];
        model.fill(
          (mealItem = result.meal_item_id),
          (mealItemName = result.meal_item_name),
          (status = result.status),
          (createdBy = result.created_by),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date),
          (updatedBy = result.updated_by)
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
const createMealItemsRepository = async (mealItemName, status, createdBy) => {
  try {
    let query =
      "INSERT into `meal_items` (`meal_item_name`,`status`,`created_by`,`created_date`,`updated_date`,`updated_by`) VALUES(?,?,?,?,?,?) ";

    let results = await runQuery(query, [
      mealItemName,
      status,
      createdBy,
      getPstDate(),
      getPstDate(),
      createdBy,
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

const updateMealItemsRepository = async (
  id,
  mealItemName,
  status,
  updatedBy
) => {
  try {
    console.log(`in to the repo`);
    let query =
      " UPDATE `meal_items` set `meal_item_name`=?,`status`=?,`updated_date`=?,`updated_by`=? where meal_item_id  =?";

    let results = await runQuery(query, [
      mealItemName,
      status,
      getPstDate(),
      updatedBy,
      id,
    ]);
    console.log(query);
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

const deleteMealItemsRepository = async (id, res) => {
  try {
    let query = "DELETE from  `meal_items` where `meal_item_id`=?";
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

module.exports = {
  getMealItemsDetailByIdRepository,
  getAllMealItemsDetailsRepository,
  createMealItemsRepository,
  updateMealItemsRepository,
  deleteMealItemsRepository,
};
