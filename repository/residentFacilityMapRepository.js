const {
  ResidentFacilityMapModel,
} = require("../models/residentFacilityMapModel");
const { runQuery, con } = require("../config/database");

//1 get all details
const getAllDetailsRepository = async () => {
  let array = [];
  let query = "select * from `resident_facility_map` where 1=1 ";
  let results = await runQuery(query);
  let count = results.length;
  if (count != 0) {
    for (i = 0; i < count; i++) {
      let model = new ResidentFacilityMapModel();
      let result = results[i];
      model.fill(
        (residentFacilityId = result.resident_facility_id),
        (userId = result.user_id),
        (facilityId = result.user_id),
        (status = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by)
      );
      array.push(model);
    }
    return { count, array };
  } else {
    return false;
  }
};

// 2 get details by id

const getDetailsByIdController = async (id, res) => {
  try {
    let query =
      "select * from `resident_facility_map` where resident_facility_id =? ";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      let model = new ResidentFacilityMapModel();
      let result = results[0];
      model.fill(
        (residentFacilityId = result.resident_facility_id),
        (userId = result.user_id),
        (facilityId = result.user_id),
        (status = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by)
      );
      return model;
    } else return false;
  } catch (error) {
    console.log(error);
    console.log("Repo Error : Something went wrong CBE");
    return false;
  }
};
module.exports = {
  getAllDetailsRepository,
  getDetailsByIdController,
};
