const { ImageUploadDetails } = require("../models/imageDetailsModel");
let { runQuery, con } = require("../config/database");
let newDate = new Date();
var mysql = require("mysql");

// get all images uploaded where flag =1
const getSingleimageUploadDetailRepository = async (req, res) => {
  let array = [];
  try {
    let query = "select * from `image_details` where 1=1 and flag =0 ";

    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      let model = new ImageUploadDetails();
      let result = results[0];
      model.fill(
        (tableId = result.id),
        (residentId = result.resident_id),
        (nurseId = result.nurse_id),
        (date = result.created_date),
        (flag = result.flag),
        (imageUrl = result.image_url)
      );
      array.push(model);

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

const getAllimageUploadDetailsRepository = async (flag) => {
  let array = [];
  try {
    let query =
      "select image_details.*, users.full_name ,meal_types.meal_name from `image_details` inner join `users` on image_details.resident_id=users.user_id  inner join meal_types on meal_types.id =image_details.meal_type  where 1=1  ";
    if (flag) {
      query += " and `flag` =" + mysql.escape(flag);
    }
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new ImageUploadDetails();
        let result = results[i];
        model.fill(
          (tableId = result.id),
          (residentId = result.resident_id),
          (nurseId = result.nurse_id),
          (date = result.created_date),
          (flag = result.flag),
          (imageUrl = result.image_url),
          (mealType = result.meal_type),
          (mealName = result.meal_name),
          (residentName = result.full_name)
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

const getImagesUploadedByNurseIdRepository = async (id, res) => {
  try {
    let breakfast_count = 0;
    let afternoonSnack_count = 0;
    let lunch_count = 0;
    let eveningSnack_count = 0;
    let dinner_count = 0;
    let query = " select meal_type from  `image_details` where nurse_id=?";

    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      const count = results.length;
      for (i = 0; i < count; i++) {
        let result = results[i];
        if (result.meal_type == 1) {
          breakfast_count += 1;
        }
        if (result.meal_type == 2) {
          lunch_count += 1;
        }
        if (result.meal_type == 3) {
          dinner_count += 1;
        }
        if (result.meal_type == 4) {
          afternoonSnack_count += 1;
        }
        if (result.meal_type == 5) {
          eveningSnack_count += 1;
        }
      }
      let totalUploads = {
        count: count,
        breakfast: breakfast_count,
        afternoonSnack: afternoonSnack_count,
        lunch: lunch_count,
        eveningSnack: eveningSnack_count,
        dinner: dinner_count,
      };
      return { totalUploads };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

const insertImageUrlDetailsRepository = async (
  imageUrl,
  residentId,
  adminId,
  mealType
) => {
  try {
    let query =
      "INSERT into `image_details` (`resident_id`,`nurse_id`,`flag`,`image_url`,`created_date`,`meal_type`) VALUES(?,?,?,?,?,?) ";
    let results = await runQuery(query, [
      residentId,
      adminId,
      0,
      imageUrl,
      newDate,
      mealType,
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

module.exports = {
  getSingleimageUploadDetailRepository,
  getAllimageUploadDetailsRepository,

  getImagesUploadedByNurseIdRepository,
  insertImageUrlDetailsRepository,
};