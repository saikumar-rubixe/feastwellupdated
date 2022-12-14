let { UserFacilityMapModel } = require("../models/userFacilityMapModel");
let { runQuery } = require("../config/database");
const { array } = require("joi");
//con = con();
//runQuery = runQuery();
const { getPstDate } = require("../helper/getCanadaTime");

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
          (id = result.user_facility_id),
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
      return { count, array };
    }
  } catch (error) {
    return false;
  }
};

// 2 get details of residents  by facility id (get all the users of facility n)

const getUserFacilityDetailsByIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      "select `user_facility_map`.* ,users.full_name,users.username,users.user_type from `user_facility_map` INNER JOIN `users` on user_facility_map.user_id=users.user_id where  facility_id=? ";

    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new UserFacilityMapModel();
        let result = results[i];
        model.fill(
          (id = result.user_facility_map_id),
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
    return false;
  }
};

// 3 create user id & facility mappping
const createUserFacilityRepository = async (
  userId,
  facilityId,
  status,
  createdBy
) => {
  try {
    let query =
      " INSERT INTO `user_facility_map` (`user_id`,`facility_id`,`status`,`created_date`,`created_by`,`updated_date`,`updated_by`) VALUES(?,?,?,?,?,?,?)";

    let results = await runQuery(query, [
      userId,
      facilityId,
      status,
      getPstDate(),
      createdBy,
      getPstDate(),
      createdBy,
    ]);
    let value = results.insertId;

    if (value) {
      return value;
    } else return false;
  } catch (error) {
    return false;
  }
};

// 4 update

const updateUserFacilityRepository = async (
  id,
  facilityId,
  status,
  updatedBy
) => {
  try {
    let query =
      " UPDATE `user_facility_map` set facility_id=?,status=?,updated_date=?,updated_by=? where user_id=?";

    let results = await runQuery(query, [
      facilityId,
      status,
      getPstDate(),
      updatedBy,
      id,
    ]);
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

// delete
const deleteUserFacilityRepository = async (id, res) => {
  try {
    console.log(` step 2 : to delete residents facility`);
    let query = "DELETE from `user_facility_map` where user_id =?";
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

// get the details by table id
const getUserFacilityDetailsByTableIdRepository = async (id, res) => {
  try {
    let query = "select *  from `user_facility_map` where id=? ";

    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      let model = new UserFacilityMapModel();
      let result = results[0];
      model.fill(
        (id = result.user_facility_map_id),
        (userId = result.user_id),
        (facilityId = result.facility_id),
        (status = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by)
      );

      return model;
    } else return null;
  } catch (error) {
    return false;
  }
};

// get the userFacility   details by User Id
const getUserFacilityDetailsByUserIdRepository = async (id, res) => {
  try {
    let query = "select * from `user_facility_map`  where user_id=?";
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new UserFacilityMapModel();
      model.fill(
        (id = result.user_facility_map_id),
        (userId = result.user_id),
        (facilityId = result.facility_id),
        (status = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
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

// a**************************************************************************
module.exports = {
  getAllUserFacilityDetailsRepository,
  getUserFacilityDetailsByIdRepository,
  createUserFacilityRepository,
  updateUserFacilityRepository,
  deleteUserFacilityRepository,
  getUserFacilityDetailsByTableIdRepository,
  getUserFacilityDetailsByUserIdRepository,
};
