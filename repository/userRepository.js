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
console.log(newDate);
console.log(`IST : ${date.format(newDate, "YYYY/MM/DD HH:mm:ss")}`); //delete
let canadaDate = getPstDate();
console.log(`PST : ${canadaDate}`); //delete

//* generate enrolment id imports
const { valueExistCheck } = require("../helper/enrollmentIdCheck");
/*1 get resident Details By ID  */
const getUserByIdRepository = async (id, res) => {
  try {
    let query = "select users.* from users where user_id =?";
    //let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let array = results[0];
      console.log(array.created_date);
      let model = new UserModel();
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
        (password = array.password),
        (facilityId = array.facility_id),
        (facilityName = array.facility_name)
      );
      return model;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 2 userCheckRepository
let userCheckRepository = async (userName, res) => {
  let query = "select * from users where username=?";
  //const sql = con.format(query, [userName]);
  let results = await runQuery(query, [userName]);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

/*4 get all residents details*/
const getAllUsersRepository = async (userType, userStatus) => {
  try {
    let userArray = [];
    let query =
      "select users.*,user_facility_map.facility_id,facility.facility_name from users left join user_facility_map on users.user_id = user_facility_map.user_id left join facility on facility.facility_id = user_facility_map.facility_id where 1=1";
    if (userType) {
      query += " and user_type=" + mysql.escape(userType);
    }
    if (userStatus) {
      query += " and status=" + mysql.escape(userStatus);
    }
    //  const sql = con.format(query);
    let sqlResult = await runQuery(query);
    let count = sqlResult.length;
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
        null,
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
  } catch (error) {
    console.log(`error in catch block is ${error}`);
    return false;
  }
};

// create resident repository
/**
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
    console.log(`consoling the user id value ${req.userIdValue}`);
    const getTag = await enrollementIdTag(createUserTypeRequest); //get the tag as per userType
    let uniqueId = await valueExistCheck(getTag); //randomId generate
    let date = getPstDate();
    let password = "carecrop123";

    console.log(`checking the unique id ${uniqueId} date is ${date}`); //delete

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
    console.log(results);
    console.log(`im at after the run query`);
    if (results) {
      console.log(`results afftected are ${results.affectedRows}`);
      return results.insertId;
    } else return false;
  } catch (error) {
    console.log(
      `something went wrong  in creating resident repository  :  ${error}`
    );
    return error;
  }
};

/**
 *
 * @param {*} fullName
 * @param {*} username
 * @param {*} password
 * @param {*} createUserTypeRequest
 * @param {*} req
 * @param {*} res
 * @returns
 */
// 5 createUserRepository
let createUserRepository = async (
  fullName,
  username,
  password,
  createUserTypeRequest,
  req,
  res
) => {
  try {
    console.log(`consoling the user id value ${req.userIdValue}`);
    // hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hash complete
    const getTag = await enrollementIdTag(createUserTypeRequest); //get the tag as per userType
    let uniqueId = await valueExistCheck(getTag); //randomId generate
    let date = getPstDate();
    console.log(`unique id and pst date `);
    let sql =
      "INSERT INTO `users`( `full_name`,`username`,`password`,`user_type`,`status`,`created_date`,`updated_date`,`enrolment_id`,created_by,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?) ";

    let results = await runQuery(sql, [
      fullName,
      username,
      hashedPassword,
      createUserTypeRequest,
      1,
      date,
      date,
      uniqueId,
      req.userIdValue,
      req.userIdValue,
    ]);

    if (results) {
      console.log(results);
      return results.insertId;
    } else return false;
  } catch (error) {
    console.log(error);
    console.log(
      `something went wrong  in creating user repository  :  ${error}`
    );
    return false;
  }
};

// 6 update UserRepository
let updateUserRepository = async (
  id,
  fullName,
  phoneNumber,
  userName,
  userStatus
) => {
  try {
    console.log(`checking the value passed`);
    console.log(`****************************************`);
    console.log(id, fullName, phoneNumber, userName, userStatus);
    console.log(`****************************************`);
    // const salt = await bcrypt.genSalt(10);
    // console.log(password);
    // console.log("password and sal are ");
    // console.log(salt);
    // const hashedPassword = await bcrypt.hash(password, salt);
    let query =
      "UPDATE users SET full_name =?,phone_number = ?,username=?,status=?,updated_date=?  WHERE user_id=? ";

    let results = await runQuery(query, [
      fullName,
      phoneNumber,
      userName,
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
    console.log("error from catch block");
    console.log(error);
    return 1;
  }
};
// 7 delete UserRepository
let deleteUserRepository = async (id) => {
  try {
    let query = "delete from users where user_id =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);

    return results.affectedRows;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

// 8 update user login details
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
      return 0;
    } else {
      return 1;
    }
  } catch (error) {
    console.log("error from catch block");
    console.log(error);
    return 1;
  }
};

// 9 get the userType of the userId
const getuserType = async (userId) => {
  try {
    let sql = "select user_type from users where user_id =" + userId;
    let results = await runQuery(sql);
    results[0].user_type;
    console.log(results[0].user_type);
    console.log(
      `in the usertype method checking the usertype values are beimg getting or not`
    );
    return results[0].user_type;
  } catch (error) {
    console.log(error);
  }
};

// ************************  export modules  *********************************** */
module.exports = {
  getUserByIdRepository: getUserByIdRepository,
  userCheckRepository: userCheckRepository,
  getAllUsersRepository: getAllUsersRepository,
  createResidentrepository: createResidentrepository,
  createUserRepository: createUserRepository,
  updateUserRepository: updateUserRepository,
  deleteUserRepository: deleteUserRepository,
  updateUserLoginDetailsRepository: updateUserLoginDetailsRepository,
  getuserType: getuserType,
};
