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
      let sql = "update `image_details`  set `flag` =1 where id = ?  ";
      let results = await runQuery(sql, [imageTableId]);
      if (results.affectedRows == 1) {
        return insertedId;
      } else {
        return false; //! need to change and add response accordingly
      }
    } else return false;
  } catch (error) {
    console.log(`CBE!  something went wrong error`);
    console.log(error);
    return false;
  }
};

const getImagePredictionResponseByReferenceIdRepository = async (
  referenceId
) => {
  try {
    //  let array = [];
    let sql =
      " select * from `image_prediction_response` where  image_details_table_id =?";
    let details = await runQuery(sql, [referenceId]);
    const count = details.length;
    if (count != 0) {
      // for (i = 0; i < count; i++) {
      let result = details[0];
      let model = new ImagePredictionRepsonseModel();
      model.fill(
        (id = result.id),
        (imageTableId = result.image_details_table_id),
        (jsonResponse = JSON.parse(result.json_response))
      );
      // array.push(model);
      //}
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`something went wrong CBE! error`);
    console.log(error);
    return false;
  }
};

const getImagePredictionResponseByIdRepository = async (id) => {
  try {
    let sql = " select * from `image_prediction_response` where  id =?";
    let results = await runQuery(sql, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new ImagePredictionRepsonseModel();
      model.fill(
        (id = result.id),
        (imageTableId = result.image_details_table_id),
        (jsonResponse = result.json_response)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`something went wrong CBE! error`);
    console.log(error);
    return false;
  }
};

// 4 send html response

const getHtmlImagePredictionResponseByReferenceIdRepository = async (
  referenceId
) => {
  try {
    //  let array = [];
    let sql =
      " select * from `image_prediction_response` where  image_details_table_id =?";
    let details = await runQuery(sql, [referenceId]);
    const count = details.length;
    if (count != 0) {
      // for (i = 0; i < count; i++) {
      let result = details[0];
      let model = new ImagePredictionRepsonseModel();
      model.fill(
        (id = result.id),
        (imageTableId = result.image_details_table_id),
        (jsonResponse = JSON.parse(result.json_response))
      );
      // array.push(model);
      //}
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`something went wrong CBE! error`);
    console.log(error);
    return false;
  }
};

module.exports = {
  insertImagePredictionRespsonseRepository,
  getImagePredictionResponseByReferenceIdRepository,
  getImagePredictionResponseByIdRepository,
  getHtmlImagePredictionResponseByReferenceIdRepository,
};
