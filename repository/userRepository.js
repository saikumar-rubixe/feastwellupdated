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
let { runQuery, con } = require("../config/database");

//con = con();
//runQuery = runQuery();

const date = require("date-and-time");
const bcrypt = require("bcrypt");
let newDate = new Date();
console.log(date.format(newDate, "YYYY/MM/DD HH:mm:ss"));

/*1 get resident Details By ID  */
const getUserByIdRepository = async (id, res) => {
  try {
    let query = "select * from users where user_id =?";
    //let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let array = results[0];
      let model = new UserModel();
      model.fill(
        (userId = array.user_id),
        (fullName = array.full_name),
        (phoneNumber = array.phone_number),
        (userName = array.username),
        (password = array.password),
        (usertype = array.user_type),
        (userStatus = array.status),
        (lastLogin = array.last_login),
        (loggedIpAddress = array.logged_ip_address),
        (createdDate = array.created_date),
        (updatedDate = array.updated_date)
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
    let query = "select * from users  where 1=1 ";
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
        (password = array.password),
        (usertype = array.user_type),
        (userStatus = array.status),
        (lastLogin = array.last_login),
        (loggedIpAddress = array.logged_ip_address),
        (createdDate = array.created_date),
        (updatedDate = array.updated_date)
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

// 5 createUserRepository
let createUserRepository = async (
  fullName,
  phoneNumber,
  userName,
  password,
  userType,
  userStatus,
  loggedIpAddress
) => {
  // hasing the password
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  // hash complete

  let query =
    "INSERT INTO `users`( `full_name`,`phone_number`,`username`,`password`,`user_type`,`status`,`logged_ip_address`,`created_date`,`updated_date`) VALUES (?,?,?,?,?,?,?,?,?) ";

  let results = await runQuery(query, [
    fullName,
    phoneNumber,
    userName,
    hashedPassword,
    userType,
    userStatus,
    loggedIpAddress,
    newDate,
    newDate,
  ]);
  // if userType =(2 Center Manager 4 center admin 5 nurse  6 facility head) add facility details
  /**  if( userType == 7){
  createResidentFacilityController(userId, facilityCenterId, status, createdBy)
  
}
*/
  return results.insertId;
};

// 6 update UserRepository
let updateUserRepository = async (
  id,
  fullName,
  phoneNumber,
  userName,
  // userType,
  userStatus,
  loggedIpAddress
) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    // console.log(password);
    // console.log("password and sal are ");
    // console.log(salt);
    // const hashedPassword = await bcrypt.hash(password, salt);
    let query =
      "UPDATE users SET full_name =?,phone_number = ?,username=?,status=?,logged_ip_address=?,updated_date=?  WHERE user_id=? ";
    // let sql = con.format(query, [
    //   fullName,
    //   phoneNumber,
    //   userName,
    //   userType,
    //   userStatus,
    //   loggedIpAddress,
    //   newDate,
    //   id,
    // ]);

    let results = await runQuery(query, [
      fullName,
      phoneNumber,
      userName,
      userStatus,
      loggedIpAddress,
      newDate,
      id,
    ]);

    return 0;
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

// ************************  export modules  *********************************** */
module.exports = {
  getUserByIdRepository: getUserByIdRepository,
  userCheckRepository: userCheckRepository,
  getAllUsersRepository: getAllUsersRepository,
  createUserRepository: createUserRepository,
  updateUserRepository: updateUserRepository,
  deleteUserRepository: deleteUserRepository,
};
