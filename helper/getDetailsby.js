/**used for user table  for checking user exist or not by email,id etc
 *
 */
let { UserModel } = require("../models/userModel");
let { runQuery } = require("../config/database");

// 1 get user details by email id
const getUserDetailByUsername = async (username) => {
  const query = "select * from users where (username =? OR enrolment_id =?)";
  let users = await runQuery(query, [username, username]);
  const user = users[0];
  var userModel = new UserModel();
  if (!user) return null;
  else {
    userModel.fill(
      (userId = user.user_id),
      (fullName = user.full_name),
      (phoneNumber = user.phone_number),
      (userName = user.username),
      (userType = user.user_type),
      (userStatus = user.status),
      (lastLogin = user.last_login),
      (loggedIpAddress = user.logged_ip_address),
      (createdDate = user.created_date),
      (updatedDate = user.updated_date),
      (enrolmentId = user.enrolment_id),
      (createdBy = user.created_date),
      (updatedBy = user.updated_date),
      (facilityId = ""),
      (facilityName = ""),
      (password = user.password) //hashed password from db is sent to userPasswordModel
    );

    return userModel;
  }
};

// 3 userCheckRepository
let userCheckRepository = async (userName, res) => {
  console.log(`checkingthe record exist or not`);
  let query = "select * from users where username=?";

  var results = await runQuery(query, [userName]);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

// 5 userUpdateCheckRepository
let userUpdateCheckRepository = async (userName, id, res) => {
  var query = "select * from users where username=? and user_id!=?";
  //const sql = con.format(query, [userName, id]);
  var results = await runQuery(query, [userName, id]);

  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

/**
// 6 get user details by enrolment Id
const getUserDetailByEnrolmentId = async (enrolmentId) => {
  const query = "select * from users where enrolment_id =?";
  let users = await runQuery(query, [enrolmentId]);
  const user = users[0];
  var userModel = new UserModel();
  if (!user) return null;
  else {
    userModel.fill(
      (userId = user.user_id),
      (fullName = user.full_name),
      (phoneNumber = user.phone_number),
      (userName = user.username),
      (userType = user.user_type),
      (userStatus = user.status),
      (lastLogin = user.last_login),
      (loggedIpAddress = user.logged_ip_address),
      (createdDate = user.created_date),
      (updatedDate = user.updated_date),
      (enrolmentId = user.enrolment_id),
      (password = user.password) //hashed password from db is sent to userPasswordModel
    );

    return userModel;
  }
};
 */
module.exports = {
  getUserDetailByUsername,
  userCheckRepository,
  // getUserDetailByEnrolmentId,

  userUpdateCheckRepository,
};
