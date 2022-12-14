/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 *  Model is used to show the response with respective fields for eay understanding
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *  date-and-time is used to take the current date for created date and updated date
 * ------------------------------------------------------------------------------------------
 * The methods Calls were as follows
 * 1.getUserByIdRepository -->fetch the user by ID
 * 2.userCheckRepository   --> check whether username available or not
 * 3.getAllUsersRepository    --> fetch all users
 * 4.createUserRepository  --> create user
 * 5.updateUserRepository  --> update user with id
 * 6.deleteUserRepository  --> delete user by ID
 */
const mysql = require("mysql");
let { UserModel } = require("../models/userModel");
let { runQuery } = require("../config/database");
const {
  enrollementIdTag,
  generateRandomNumber,
  checkEnrolmentIdRepository,
} = require("../helper/enrollmentIDGenerator");
const { getPstDate } = require("../helper/getCanadaTime");
const date = require("date-and-time");
const bcrypt = require("bcrypt");
let newDate = new Date();

console.log(`IST : ${date.format(newDate, "YYYY/MM/DD HH:mm:ss")}`); //delete
let canadaDate = getPstDate();
console.log(`PST : ${canadaDate}`); //delete

//* generate enrolment id imports
const { valueExistCheck } = require("../helper/enrollmentIdCheck");

/**1 createUserRepository
 *
 * @param {*} fullName
 * @param {*} username
 * @param {*} password
 * @param {*} createUserTypeRequest
 * @param {*} req
 * @param {*} res
 * @returns
 */
let createUserRepository = async (
  fullName,
  username,
  password,
  userType,
  createdBy,
  updatedBy
) => {
  try {
    // hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hash complete
    const getTag = await enrollementIdTag(userType); //get the tag as per userType
    let uniqueId = await valueExistCheck(getTag); //randomId generate
    let date = getPstDate();

    let sql =
      "INSERT INTO `users`( `full_name`,`username`,`password`,`user_type`,`status`,`created_date`,`updated_date`,`enrolment_id`,created_by,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?) ";

    let results = await runQuery(sql, [
      fullName,
      username,
      hashedPassword,
      userType,
      1,
      date,
      date,
      uniqueId,
      createdBy,
      updatedBy,
    ]);

    if (results) {
      values = {
        insertId: results.insertId,
        enrolmentId: uniqueId,
      };
      return values;
    } else return false;
  } catch (error) {
    return false;
  }
};

// 2 update UserRepository
let updateUserRepository = async (id, fullName, username, userStatus) => {
  try {
    // const salt = await bcrypt.genSalt(10);

    // const hashedPassword = await bcrypt.hash(password, salt);
    let query =
      "UPDATE users SET full_name =?,username=?,status=?,updated_date=?  WHERE user_id=? ";

    let results = await runQuery(query, [
      fullName,
      username,
      userStatus,
      getPstDate(),
      id,
    ]);
    if (results.affectedRows == 1) {
      return 0;
    } else {
      return 1;
    }
  } catch (error) {
    return 1;
  }
};
// 3 delete UserRepository
let deleteUserRepository = async (id) => {
  try {
    let query = "delete from users where user_id =?";

    let results = await runQuery(query, [id]);

    if (results.affectedRows == 1 || results.affectedRows > 0) return true;
    else return false;
  } catch (error) {
    return 0;
  }
};

/*4 get all residents details*/
const getAllUsersRepository = async (userType, userStatus) => {
  try {
    let userArray = [];
    let query =
      "select users.*,user_facility_map.facility_id,facility.facility_name from users left join user_facility_map on users.user_id = user_facility_map.user_id left join facility on facility.facility_id = user_facility_map.facility_id where 1=1 ";
    if (userType) {
      query += " and user_type=" + mysql.escape(userType);
    }
    if (userStatus) {
      query += " and status=" + mysql.escape(userStatus);
    }

    let sqlResult = await runQuery(query);
    let count = sqlResult.length;
    if (count != 0) {
      for (let i = 0; i < sqlResult.length; i++) {
        let model = new UserModel();
        let array = sqlResult[i];
        model.fill(
          (userId = array.user_id),
          (fullName = array.full_name),
          (phoneNumber = array.phone_number),
          (userName = array.username),
          (usertype = array.user_type),
          (userStatus = array.status),
          (lastLogin = array.last_login),
          (loggedIpAddress = array.logged_ip_address),
          (createdDate = array.created_date),
          (updatedDate = array.updated_date),
          (enrolmentId = array.enrolment_id),
          (createdBy = array.created_by),
          (updatedBy = array.updated_by),
          (facilityId = array.facility_id),
          (facilityName = array.facility_name)

          // (password = array.password),
        );
        userArray.push(model);
      }
      response = {};
      response["count"] = count;
      response["userArray"] = userArray;

      return response;
    } else return { count, userArray };
  } catch (error) {
    return false;
  }
};

/*5 get resident Details By ID  */
const getUserByIdRepository = async (id, res) => {
  try {
    let query =
      "select users.*,user_facility_map.facility_id,facility.facility_name  from users left join user_facility_map on users.user_id = user_facility_map.user_id left join facility on user_facility_map.facility_id = facility.facility_id where users.user_id= ? ";

    let results = await runQuery(query, [id]);

    if (results.length != 0) {
      let array = results[0];

      let model = new UserModel();
      model.fill(
        (userId = array.user_id),
        (fullName = array.full_name),
        (phoneNumber = array.phone_number),
        (userName = array.username),
        (userType = array.user_type),
        (userStatus = array.status),
        (lastLogin = array.last_login),
        (loggedIpAddress = array.logged_ip_address),
        (createdDate = array.created_date),
        (updatedDate = array.updated_date),
        (enrolmentId = array.enrolment_id),
        (createdBy = array.created_by),
        (updatedBy = array.updated_by),
        (facilityId = array.facility_id),
        (facilityName = array.facility_name)
        // (password = array.password)
      );

      return model;
    }
  } catch (error) {
    return false;
  }
};

// 6 get user details by id without pwd  for fetching and showing
const getUserDetailsDisplayRepository = async (id, res) => {
  try {
    let query = "select * from users where user_id =?";

    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let array = results[0];

      let model = new UserModel();
      model.fill(
        (userId = array.user_id),
        (fullName = array.full_name),
        (phoneNumber = array.phone_number),
        (userName = array.username),
        (userType = array.user_type),
        (userStatus = array.status),
        (lastLogin = array.last_login),
        (loggedIpAddress = array.logged_ip_address),
        (createdDate = array.created_date),
        (updatedDate = array.updated_date),
        (enrolmentId = array.enrolment_id),
        (createdBy = array.created_by),
        (updatedBy = array.updated_by)
      );

      return model;
    }
  } catch (error) {
    return false;
  }
};
// 7 userCheckRepository
let userCheckRepository = async (userName, res) => {
  let query = "select * from users where username=?";
  let results = await runQuery(query, [userName]);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};
// 8 update user check repository
let updateuserCheckRepository = async (userName, id) => {
  let query = "select * from users where username=? and user_id != ?";
  let results = await runQuery(query, [userName, id]);
  if (results.length == 0) {
    return true;
  } else {
    return false;
  }
};

// 9 update user login details
let updateUserLoginDetailsRepository = async (
  id,
  lastLogin,
  loggedIpAddress
) => {
  try {
    let query =
      "UPDATE users SET last_login=?,logged_ip_address=?,updated_date=?  WHERE user_id=? ";

    let results = await runQuery(query, [
      lastLogin,
      loggedIpAddress,
      getPstDate(),
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

/**10 create resident repository
 *
 * @param {*} fullName
 * @param {*} createUserTypeRequest (6)
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createResidentrepository = async (
  fullName,
  createUserTypeRequest,
  req,
  res
) => {
  try {
    const getTag = await enrollementIdTag(createUserTypeRequest); //get the tag as per userType
    let uniqueId = await valueExistCheck(getTag); //randomId generate
    let date = getPstDate();
    let password = "carecrop123";

    let sql =
      "INSERT INTO `users`(`full_name`,`username`,`password`,`user_type`,`status`,`created_date`,`updated_date`,`enrolment_id`,created_by,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?) ";
    let results = await runQuery(sql, [
      fullName,
      uniqueId,
      password,
      createUserTypeRequest,
      1,
      date,
      date,
      uniqueId,
      req.userIdValue,
      req.userIdValue,
    ]);

    if (results) {
      return results.insertId;
    } else return false;
  } catch (error) {
    return error;
  }
};

// 11 get the userType of the userId
const getuserType = async (userId) => {
  try {
    let sql = "select user_type from users where user_id =" + userId;
    let results = await runQuery(sql);
    results[0].user_type;

    return results[0].user_type;
  } catch (error) {}
};

// ************************  export modules  *********************************** */
module.exports = {
  getUserByIdRepository: getUserByIdRepository,
  userCheckRepository: userCheckRepository,
  updateuserCheckRepository: updateuserCheckRepository,
  getAllUsersRepository: getAllUsersRepository,
  createResidentrepository: createResidentrepository,
  createUserRepository: createUserRepository,
  updateUserRepository: updateUserRepository,
  deleteUserRepository: deleteUserRepository,
  updateUserLoginDetailsRepository: updateUserLoginDetailsRepository,
  getuserType: getuserType,

  getUserDetailsDisplayRepository: getUserDetailsDisplayRepository,
};
