let { UserFacilityMapModel } = require("../models/userFacilityMapModel");
let { runQuery, con } = require("../config/database");
const { array } = require("joi");
//con = con();
//runQuery = runQuery();
let newDate = new Date();

//1 get all details
const getAllUserFacilityDetailsRepository = async () => {
  try {
    let array = [];
    let query = "select * from `user_facility_map` where 1=1 ";
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new UserFacilityMapModel();
        let result = results[i];
        model.fill(
          (id = result.id),
          (userId = result.user_id),
          (facilityId = result.facility_id),
          (status = result.status),
          (createdDate = result.created_date),
          (createdBy = result.created_by),
          (updatedDate = result.updated_date),
          (updatedBy = result.updated_by)
          // (fullName = result.full_name),
          // (userName = result.username),
          // (userType = result.user_type)
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

// 2 get details by facility id (get all the users of facility n)

const getUserFacilityDetailsByIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      "select `user_facility_map`.* ,users.full_name,users.username,users.user_type from `user_facility_map` INNER JOIN `users` on user_facility_map.user_id=users.user_id where users.user_type=7 and  facility_id=? ";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new UserFacilityMapModel();
        let result = results[i];
        model.fill(
          (id = result.id),
          (userId = result.user_id),
          (facilityId = result.facility_id),
          (status = result.status),
          (createdDate = result.created_date),
          (createdBy = result.created_by),
          (updatedDate = result.updated_date),
          (updatedBy = result.updated_by),
          (fullName = result.full_name),
          (userName = result.username),
          (userType = result.user_type)
        );
        array.push(model);
      }
      return { count, array };
    } else return null;
  } catch (error) {
    console.log(error);
    console.log("Repo Error : Something went wrong CBE");
    return false;
  }
};

// 3 create user id & facility mappping
const createUserFacilityRepository = async (
  userId,
  facilityCenterId,
  status,
  createdBy
) => {
  try {
    let query =
      " INSERT INTO `user_facility_map` (`user_id`,`facility_id`,`status`,`created_date`,`created_by`,`updated_date`,`updated_by`) VALUES(?,?,?,?,?,?,?)";
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

const updateUserFacilityRepository = async (
  id,
  userId,
  facilityCenterId,
  status,
  updatedBy
) => {
  try {
    let query =
      " UPDATE `user_facility_map` set `user_id`=?,facility_id=?,status=?,updated_date=?,updated_by=? where resident_facility_id  =?";
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
const deleteUserFacilityRepository = async (id, res) => {
  try {
    let query = "DELETE from `user_facility_map` where resident_facility_id =?";
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
  getAllUserFacilityDetailsRepository,
  getUserFacilityDetailsByIdRepository,
  createUserFacilityRepository,
  updateUserFacilityRepository,
  deleteUserFacilityRepository,
};
