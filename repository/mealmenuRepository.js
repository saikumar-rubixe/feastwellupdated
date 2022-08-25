let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
let { MealMenuModel } = require("../models/mealMenuModel");
const date = require("date-and-time");
let newDate = new Date();

//**  1 get details By id */
const getMealMenuDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_menu` where meal_menu_id  =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);

    if (results.length != 0) {
      let result = results[0];
      let model = new MealMenuModel();
      let menuId = result.meal_menu_id;
      model.fill(
        (mealMenuId = result.meal_menu_id),
        (mealMenuName = result.meal_menu_name),
        (menuDescription = result.meal_menu_description),
        (mealType = result.meal_type),
        (mealStatus = result.status),
        (userId = result.user_id),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date),
        (mealItems = await getMealItems(menuId))
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

//**  2 get all details */
const getAllMealMenuDetailsRepository = async (req, res) => {
  try {
    console.log(`in repository block`);
    let array = [];
    let query = "select * from `meal_menu` ";
    // let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    console.log("consolling results length");
    console.log(count);
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new MealMenuModel();
        let result = results[i];
        let menuId = result.meal_menu_id;

        model.fill(
          (mealMenuId = result.meal_menu_id),
          (mealMenuName = result.meal_menu_name),
          (menuDescription = result.meal_menu_description),
          (mealType = result.meal_type),
          (mealStatus = result.status),
          (userId = result.user_id),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date),
          (mealItems = await getMealItems(menuId))
          //fetch meal items by menu id ->by fetching mealitems  id from mealcontents tble and then callig  the melitems table based on response
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

//** 3 Create meal menu */
const createMealMenuRepository = async (
  mealMenuName,
  menuDescription,
  mealType,
  mealStatus,
  userId,
  mealItems
) => {
  //** insertion of meal menu  after creation of menu , with (menu id, mealitems ,userid and status ) needed to insert these all ids in menu contents table according to no of meal items id  sent */
  try {
    console.log(`*************in to repo  *******************`);
    let query =
      "INSERT into `meal_menu` (`meal_menu_name`,`meal_menu_description`,`meal_type`,`status`,`user_id`,`created_date`,`updated_date`) VALUES(?,?,?,?,?,?,?) ";
    /**  let sql = con.format(query, [
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      newDate,
      newDate,
    ]);
    */
    let insert = await runQuery(query, [
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      newDate,
      newDate,
    ]);
    const menuId = insert.insertId; // menu inserted Id
    // insert meal items into  menuContents with the menuId
    let insertItems = await insertMealItemsInMenuContents(
      menuId,
      mealItems,
      userId,
      mealStatus
    );
    if (!insertItems || insertItems == null) {
      console.log(" insert meal items failed ");
    }
    return { menuId, insertItems };
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong failed failed failed!");
    return false;
  }
};

//** 4 update meal menu */
const updateMealMenuRepository = async (
  id,
  mealMenuName,
  menuDescription,
  mealType,
  mealStatus,
  userId,
  mealItems
) => {
  try {
    let menuId = id;

    let query =
      " UPDATE `meal_menu` set `meal_menu_name`=?,`meal_menu_description`=?,`meal_type`=?,`status`=? ,`user_id`=?,`updated_date`=? where meal_menu_id  =?";
    // let sql = con.format(query, [
    //   mealMenuName,
    //   menuDescription,
    //   mealType,
    //   mealStatus,
    //   userId,
    //   id,
    // ]);
    let results = await runQuery(query, [
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      newDate,
      id,
    ]);

    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);

    // UPDATE_MEAL_ITEMS: 1. delete old items 2 insert new meal items from request
    //1. delete old items
    let deleteRecords = await deleteMenuContentsByMenuId(menuId);
    if (!deleteRecords) {
      console.log("delete old records failed");
    }
    //2 insert new meal items from request

    let insertItems = await insertMealItemsInMenuContents(
      menuId,
      mealItems,
      userId,
      mealStatus
    );
    if (!insertItems || insertItems == null) {
      console.log(" insert meal items failed ");
    }

    if (value == 1 && deleteRecords && insertItems) {
      let details = {
        message: "update succesful",
        menuUpdate: value,
        NoOfOldRecordsDeleted: deleteRecords,
        newRecordsInsertedId: insertItems,
      };
      return details;
    } else if (value == 1 && deleteRecords && !insertItems) {
      let details = {
        message: "new records insertion failed",
        menuUpdate: value,
        NoOfOldRecordsDeleted: deleteRecords,
        newRecordsInsertedId: insertItems,
      };
      return details;
    } else if (value == 1 && !deleteRecords && insertItems) {
      let details = {
        message: "old records deletion failed",
        menuUpdate: value,
        NoOfOldRecordsDeleted: deleteRecords,
        newRecordsInsertedId: insertItems,
      };
      return details;
    } else if (value == 1 && !deleteRecords && !insertItems) {
      let details = {
        message: "old deletion and new insertion failed",
        menuUpdate: value,
        NoOfOldRecordsDeleted: deleteRecords,
        newRecordsInsertedId: insertItems,
      };

      return details;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");

    return false;
  }
};

//** */
const deleteMealMenuRepository = async (id, res) => {
  try {
    let query = "DELETE from  `meal_menu` where meal_menu_id =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);

    let deleteRecords = await deleteMenuContentsByMenuId(id);
    if (!deleteRecords) {
      return null;
    }
    let details = {
      mealMenuDeleteAffectedRows: value,
      menuContentsDeleteAffectedRows: deleteRecords,
    };

    return details;
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

//*******************************  HELPER METHODS  ************************************************** */

//**  6 insertMealItemsInMenuContents*/
/** 7 insertMealItemsInMenuContents 
insert the meal items into meal contents table /menuId
 * 
 * @param {*} id  (menu id)
 * @param {*} mealItems (meal items ids )
 * @param {*} userId 
 * @param {*} mealStatus 
 * @returns itemsCreateIds
 */
const insertMealItemsInMenuContents = async (
  menuId,
  mealItems,
  userId,
  mealStatus
) => {
  try {
    let itemsCreateIds = []; // to store the inserted ids after insertion of mapping
    let arrayMealItems = []; // def an array to store the mealItems ids

    arrayMealItems = mealItems; // assigning mealItems to array

    if (arrayMealItems == 0 || arrayMealItems == null) {
      console.log("in if condition false result");

      return false;
    }
    var array = arrayMealItems.split(","); // slpit the array with comma
    let length = array.length; // get the length of the array
    if (length > 0) {
      for (i = 0; i < length; i++) {
        let query =
          "insert into `meal_menu_contents` (meal_menu_id,meal_item_id,user_id,status,created_date,updated_date) VALUES (?,?,?,?,?,?)";
        let insert2 = await runQuery(query, [
          menuId,
          array[i],
          userId,
          mealStatus,
          newDate,
          newDate,
        ]);
        itemsCreateIds[i] = insert2.insertId; // assinging the inserted ids into created array
      }
    }

    return itemsCreateIds;
  } catch (error) {
    console.log(error);
    console.log(`CBE: error while inserting meal_item_ids into contents table`);

    return null;
  }
};

//**  7  deleteMenuContentsByMenuId */
/** used in update and delete fn calls of menuRepo
 * @param {*} id
 * @returns affectedRows
 */
const deleteMenuContentsByMenuId = async (menuId) => {
  try {
    let query = "DELETE  FROM `meal_menu_contents` where  meal_menu_id=?";
    let results = await runQuery(query, [menuId]);
    let affectedRows = results.affectedRows;
    // console.log(`Number of records deleted: ${affectedRows}`); //delete

    return affectedRows;
  } catch (error) {
    //console.log(`error in deleting menu contents`);//delete
    console.log(error);

    return null;
  }
};

//** 8 get meal items/
const getMealItems = async (menuId) => {
  let query =
    "SELECT t1.`meal_item_id` as mealItem  ,t2.`meal_item_name` as mealItemName  from meal_menu_contents AS t1  INNER JOIN meal_items AS t2  ON t1.`meal_item_id`= t2.`meal_item`  where  t1.meal_menu_id=?";
  let results = await runQuery(query, [menuId]);

  return results;
};

// exports
module.exports = {
  getMealMenuDetailByIdRepository,
  getAllMealMenuDetailsRepository,
  createMealMenuRepository,
  updateMealMenuRepository,
  deleteMealMenuRepository,
};
