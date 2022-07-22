/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {NutritionCategoryModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * *nutrition category is to get the each individual nutritions values of items /Menu
 * 
 * The methods Calls were as follows
 * 1. getNutritionCategoryDetailByIdRepository-->fetch the user by ID
 *
 */
let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
let { NutritionCategoryModel } = require("../models/nutritionCategoryModel");
let newDate = new Date();

// 1 get by id
const getNutritionCategoryDetailByIdRepository = async (id, res) => {
  try {
    let query = "SELECT * FROM `nutrition_category` where nutrition_id  =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new NutritionCategoryModel();
      model.fill(
        (nutritionId = result.nutrition_id),
        (mealItemId = result.meal_item_id),
        (carbohydrates = result.carbohydrates),
        (proteins = result.proteins),
        (fats = result.fats),
        (vitamins = result.vitamins),
        (minerals = result.minerals),
        (fiber = result.fiber),
        (water = result.water),
        (calories = result.calories),
        (userId = result.user_id),
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
//2 get all details
const getAllNutritionCategoryDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "select * from `nutrition_category` where 1=1 ";
    //let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new NutritionCategoryModel();
        let result = results[i];
        model.fill(
          (nutritionId = result.nutrition_id),
          (mealItemId = result.meal_item_id),
          (carbohydrates = result.carbohydrates),
          (proteins = result.proteins),
          (fats = result.fats),
          (vitamins = result.vitamins),
          (minerals = result.minerals),
          (fiber = result.fiber),
          (water = result.water),
          (calories = result.calories),
          (userId = result.user_id),
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

// 3 create
const createNutritionCategoryRepository = async (
  mealItemId,
  carbohydrates,
  proteins,
  fats,
  vitamins,
  minerals,
  fiber,
  water,
  calories,
  userId
) => {
  try {
    let query =
      "INSERT into `nutrition_category` (`meal_item_id`, `carbohydrates`,`proteins`,    `fats`, `vitamins`, `minerals`,`fiber`,`water`,  `calories`,  `user_id`,`created_date`,`updated_date`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ";
    // let sql = con.format(query, [
    //   mealItemId,
    //   carbohydrates,
    //   proteins,
    //   fats,
    //   vitamins,
    //   minerals,
    //   fiber,
    //   water,
    //   calories,
    //   userId,
    //   newDate,
    //   newDate,
    // ]);
    let results = await runQuery(query, [
      mealItemId,
      carbohydrates,
      proteins,
      fats,
      vitamins,
      minerals,
      fiber,
      water,
      calories,
      userId,
      newDate,
      newDate,
    ]);
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
const updateNutritionCategoryRepository = async (
  id,
  mealItemId,
  carbohydrates,
  proteins,
  fats,
  vitamins,
  minerals,
  fiber,
  water,
  calories,
  userId
) => {
  try {
    let query =
      " UPDATE `nutrition_category` set `meal_item_id`=?,`carbohydrates`=?,`proteins`=?,`fats`=?,`vitamins`=?,`minerals`=?,`fiber`=?,`water`=?,`calories`=?,`user_id`=?,`created_date`=? , `updated_date`=? where nutrition_id =?";
    // let sql = con.format(query, [
    //   mealItemId,
    //   carbohydrates,
    //   proteins,
    //   fats,
    //   vitamins,
    //   minerals,
    //   fiber,
    //   water,
    //   calories,
    //   userId,
    //   newDate,
    //   newDate,
    //   id,
    // ]);
    let results = await runQuery(query, [
      mealItemId,
      carbohydrates,
      proteins,
      fats,
      vitamins,
      minerals,
      fiber,
      water,
      calories,
      userId,
      newDate,
      newDate,
      id,
    ]);
    let value = results.affectedRows;
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

//  5 delete Nutrition Category
const deleteNutritionCategoryRepository = async (id, res) => {
  try {
    let query = "DELETE from  `nutrition_category` where nutrition_id=?";
    //let sql = con.format(query, [id]);

    let results = await runQuery(query, [id]);
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
  getNutritionCategoryDetailByIdRepository,
  getAllNutritionCategoryDetailsRepository,
  createNutritionCategoryRepository,
  updateNutritionCategoryRepository,
  deleteNutritionCategoryRepository,
};

//
