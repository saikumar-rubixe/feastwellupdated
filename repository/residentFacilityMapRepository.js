let {
  ResidentFacilityMapModel,
} = require("../models/residentFacilityMapModel");
let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
let newDate = new Date();

//1 get all details
const getAllResidentFacilityDetailsRepository = async () => {
  try {
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
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 2 get details by id

const getResidentFacilityDetailsByIdController = async (id, res) => {
  try {
    let query =
      "select * from `resident_facility_map` where resident_facility_id =? ";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
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

// 3 create user id & facility mappping
const createResidentFacilityRepository = async (
  userId,
  facilityCenterId,
  status,
  createdBy
) => {
  try {
    let query =
      " INSERT INTO `resident_facility_map` (`user_id`,`facility_id`,`status`,`created_date`,`created_by`,`updated_date`,`updated_by`) VALUES(?,?,?,?,?,?,?)";
    // let sql = con.format(query, [
    //   userId,
    //   facilityCenterId,
    //   status,
    //   newDate,
    //   createdBy,
    //   newDate,
    //   createdBy,
    // ]);
    // console.log(sql);
    let results = await runQuery(query, [
      userId,
      facilityCenterId,
      status,
      newDate,
      createdBy,
      newDate,
      createdBy,
    ]);
    let value = results.insertId;
    console.log(`value inseted id is ${value}`);
    if (value) {
      return value;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 4 update

const updateResidentFacilityRepository = async (
  id,
  userId,
  facilityCenterId,
  status,
  updatedBy
) => {
  try {
    let query =
      " UPDATE `resident_facility_map` set `user_id`=?,facility_id=?,status=?,updated_date=?,updated_by=? where resident_facility_id  =?";
    // let sql = con.format(query, [
    //   userId,
    //   facilityCenterId,
    //   status,
    //   newDate,
    //   updatedBy,
    //   id,
    // ]);
    let results = await runQuery(query, [
      userId,
      facilityCenterId,
      status,
      newDate,
      updatedBy,
      id,
    ]);
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

// delete
const deleteResidentFacilityRepository = async (id, res) => {
  try {
    let query =
      "DELETE from `resident_facility_map` where resident_facility_id =?";
    // let sql = con.format(query, [id]);
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
  getAllResidentFacilityDetailsRepository,
  getResidentFacilityDetailsByIdController,
  createResidentFacilityRepository,
  updateResidentFacilityRepository,
  deleteResidentFacilityRepository,
};
