let { runQuery } = require("../config/database");
const { getPstDate } = require("../helper/getCanadaTime");
const {
  ImagePredictionRepsonseModel,
} = require("../models/imagePredictionResponseModel");

const insertImagePredictionRespsonseRepository = async (
  referenceId,
  jsonResponse
) => {
  try {
    const imageTableId = referenceId;
    let sql =
      "insert into  `image_prediction_response` (`image_details_table_id`,`json_response`,`created_date`) VALUES (?,?,?)";
    const details = await runQuery(sql, [
      imageTableId,
      jsonResponse,
      getPstDate(),
    ]);
    const insertedId = details.insertId;
    if (insertedId) {
      let sql =
        "update `image_details`  set `flag` =1 where image_details_id = ?  ";
      let results = await runQuery(sql, [imageTableId]);
      if (results.affectedRows == 1) {
        return insertedId;
      } else {
        return false; //! need to change and add response accordingly
      }
    } else return false;
  } catch (error) {
    return false;
  }
};

const getImagePredictionResponseByReferenceIdRepository = async (id) => {
  try {
    let array = [];
    let sql =
      " select * from `image_prediction_response` where  image_details_table_id =?";
    let details = await runQuery(sql, [id]);
    const count = details.length;
    if (count != 0) {
      // for (i = 0; i < count; i++) {
      let result = details[0];
      let model = new ImagePredictionRepsonseModel();
      model.fill(
        (id = result.image_prediction_response_id),
        (imageTableId = result.image_details_table_id),
        (createdDate = ""),
        (residentId = ""),
        (uploadedBy = ""),
        (flag = ""),
        (mealType = ""),
        (jsonResponse = JSON.parse(result.json_response))
      );
      array.push(model);
      //}
      return array;
    } else {
      console.log(`no results in repository`);
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getImagePredictionResponseByIdRepository = async (id) => {
  try {
    let sql =
      " select * from `image_prediction_response` where  image_prediction_response_id =?";
    let results = await runQuery(sql, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new ImagePredictionRepsonseModel();
      model.fill(
        (id = result.id),
        (imageTableId = result.image_details_table_id),
        (createdDate = ""),
        (residentId = ""),
        (uploadedBy = ""),
        (flag = ""),
        (mealType = ""),
        (jsonResponse = result.json_response)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getNutrientsValueRepository = async (residentId) => {
  try {
    let array = [];
    sql =
      " select impr.* , img.resident_id,img.flag,img.meal_type,img.nurse_id as uploaded_by from image_prediction_response as impr inner join image_details as img on impr.image_details_table_id = img.image_details_id  where img.flag =1 ";
    if (residentId) {
      sql += " and img.resident_id =" + residentId;
    }

    let details = await runQuery(sql);
    const count = details.length;

    if (count != 0) {
      for (i = 0; i < count; i++) {
        let result = details[i];
        let model = new ImagePredictionRepsonseModel();
        model.fill(
          (id = result.image_prediction_response_id),
          (imageTableId = result.image_details_table_id),
          (createdDate = result.created_date),
          (residentId = result.resident_id),
          (uploadedBy = result.uploaded_by),
          (flag = result.flag),
          (mealType = result.meal_type),
          (jsonResponse = JSON.parse(result.json_response))
        );
        array.push(model);
      }
      return array;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
module.exports = {
  insertImagePredictionRespsonseRepository,
  getImagePredictionResponseByReferenceIdRepository,
  getImagePredictionResponseByIdRepository,
  getNutrientsValueRepository,
};
