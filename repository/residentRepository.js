let { runQuery } = require("../config/database");

let { ResidentModel } = require("../models/residentModel");

const { getPstDate } = require("../helper/getCanadaTime");
const { enrollementIdTag } = require("../helper/enrollmentIDGenerator");
const { valueExistCheck } = require("../helper/enrollmentIdCheck");

// create resident
const createResidentRepository = async (
  fullname,
  userType,
  createdBy,
  updatedBy
) => {
  try {
    const getTag = await enrollementIdTag();

    let enrolmentId = await valueExistCheck(getTag);
    let sql =
      "insert into `users` (full_name,user_type,status,username,created_date,updated_date,created_by,updated_by,enrolment_id) values(?,?,?,?,?,?,?,?,?)";
    let results = await runQuery(sql, [
      fullname,
      userType,
      1,
      enrolmentId,
      getPstDate(),
      getPstDate(),
      createdBy,
      updatedBy,
      enrolmentId,
    ]);
    let insertId = results.insertId;
    return { insertId, enrolmentId };
  } catch (error) {
    return false;
  }
};

//2 update resident repository
const updateResidentRepository = async (
  id,
  fullName,
  userStatus,
  updatedBy
) => {
  try {
    let query =
      "UPDATE users SET full_name =?,status=?,updated_date=?,updated_by=? WHERE user_id=? ";

    let results = await runQuery(query, [
      fullName,
      userStatus,
      getPstDate(),
      updatedBy,
      id,
    ]);
    if (results.affectedRows == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 3 delete resident respository
const deleteResidentRepository = async (id, res) => {
  try {
    let query = "delete from users where user_type =6 and user_id =?";
    let results = await runQuery(query, [id]);

    if (results.affectedRows == 1 || results.affectedRows > 0) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// 4 get resident details by id repository
const getresidentDetailByIdRepository = async (id, res) => {
  try {
    let query =
      "select users.*,user_facility_map.facility_id,facility.facility_name  from users left join user_facility_map on users.user_id = user_facility_map.user_id left join facility on user_facility_map.facility_id = facility.facility_id where users.user_id= ?  and user_type=6";
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let array = results[0];

      let model = new ResidentModel();
      model.fill(
        (userId = array.user_id),
        (enrolmentId = array.enrolment_id),
        (fullName = array.full_name),
        (userName = array.username),
        (userType = array.user_type),
        (userStatus = array.status),
        (createdDate = array.created_date),
        (updatedDate = array.updated_date),
        (createdBy = array.created_by),
        (updatedBy = array.updated_by),
        (facilityId = array.facility_id),
        (facilityName = array.facility_name)
      );

      return model;
    }
  } catch (error) {
    return false;
  }
};

// 5 get all residents
const getAllResidentsRepository = async (req, res) => {
  try {
    let userArray = [];
    let sql =
      "select users.*,user_facility_map.facility_id,facility.facility_name from users left join user_facility_map on users.user_id = user_facility_map.user_id left join facility on facility.facility_id = user_facility_map.facility_id where 1=1 and user_type= 6 ORDER by user_id";

    let results = await runQuery(sql);

    let count = results.length;

    if (count != 0) {
      for (let i = 0; i < count; i++) {
        let model = new ResidentModel();
        let array = results[i];
        model.fill(
          (userId = array.user_id),
          (enrolmentId = array.enrolment_id),
          (fullName = array.full_name),
          (userName = array.username),
          (userType = array.user_type),
          (userStatus = array.status),
          (createdDate = array.created_date),
          (updatedDate = array.updated_date),
          (createdBy = array.created_by),
          (updatedBy = array.updated_by),
          (facilityId = array.facility_id),
          (facilityName = array.facility_name)
          // (password = array.password),
        );
        userArray.push(model);
      }

      return { count, userArray };
    } else {
      return { count, userArray };
    }
  } catch (error) {
    return false;
  }
};

// 6 get all residents  by facility id respository details
const getAllResidentsOfFacilityRepository = async (userStatus) => {
  try {
    let userArray = [];
    let query =
      "select users.*,user_facility_map.facility_id,facility.facility_name from users left join user_facility_map on users.user_id = user_facility_map.user_id left join facility on facility.facility_id = user_facility_map.facility_id where 1=1 and user_type= 6 ORDER by user_id";

    if (userStatus) {
      query += " and status=" + mysql.escape(userStatus);
    }
    let sqlResult = await runQuery(query);
    let count = sqlResult.length;
    if (count != 0) {
      for (let i = 0; i < sqlResult.length; i++) {
        let model = new ResidentModel();
        let array = sqlResult[i];
        model.fill(
          (userId = array.user_id),
          (enrolmentId = array.enrolment_id),
          (fullName = array.full_name),
          (userName = array.username),
          (userType = array.user_type),
          (userStatus = array.status),
          (createdDate = array.created_date),
          (updatedDate = array.updated_date),
          (createdBy = array.created_by),
          (updatedBy = array.updated_by),
          (facilityId = array.facility_id),
          (facilityName = array.facility_name)
          //(password = "")
        );
        userArray.push(model);
      }
      response = {};
      response["count"] = count;
      response["userArray"] = userArray;

      return response;
    } else {
      return { count, userArray };
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  createResidentRepository,
  updateResidentRepository,
  deleteResidentRepository,
  getresidentDetailByIdRepository,
  getAllResidentsRepository,
  getAllResidentsOfFacilityRepository,
};
