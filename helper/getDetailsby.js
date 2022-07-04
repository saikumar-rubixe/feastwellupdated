/**used for user table  for checking user exist or not by email,id etc
 *
 */
const { UserModel } = require("../models/userModel");
const { runQuery, con } = require("../config/database");

// 1 get user details by email id
const getUserDetailByEmail = async (email) => {
  const query = "select * from users where email = ?";
  const sql = con.format(query, [email]);
  var users = await runQuery(sql);
  console.log(users);
  const user = users[0];
  var userModel = new UserModel();
  if (!user) return null;
  else {
    userModel.fill(
      (userId = user.user_id),
      (fullName = user.full_name),
      (email = user.email),
      (phoneNumber = user.phone_number),
      (userName = user.username),
      (password = user.password), //hashed password from db is sent to userPasswordModel
      (profileImage = user.profile_image),
      (userType = user.user_type),
      (userStatus = user.status),
      (lastLogin = user.last_login),
      (loggedIpAddress = user.logged_ip_address),
      (createdDate = user.created_date),
      (updatedDate = user.updated_date)
    );
    console.log("returning model");
    console.log(userModel);
    return userModel;
  }
};

// 2 emailCheckRepository
let emailCheckRepository = async (email, res) => {
  var query = "select * from users where email=?";
  const sql = con.format(query, [email]);
  console.log(`sql query  is ${sql}`);
  var results = await runQuery(sql);
  console.log(results);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

// 3 userCheckRepository
let userCheckRepository = async (userName, res) => {
  var query = "select * from users where username=?";
  const sql = con.format(query, [userName]);
  console.log(`sql query  is ${sql}`);
  var results = await runQuery(sql);
  console.log(results);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

// 4 emailCheckRepository
let emailUpdateCheckRepository = async (email, id, res) => {
  var query = "select * from users where email=? and user_id!=?";
  const sql = con.format(query, [email, id]);
  console.log(`sql query  is ${sql}`);
  var results = await runQuery(sql);
  console.log(results);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

// 5 userUpdateCheckRepository
let userUpdateCheckRepository = async (userName, id, res) => {
  var query = "select * from users where username=? and user_id!=?";
  const sql = con.format(query, [userName, id]);
  console.log(`sql query  is ${sql}`);
  var results = await runQuery(sql);
  console.log(results);
  if (results.length == 0) {
    return 0;
  } else {
    return 1;
  }
};

/** */
module.exports = {
  getUserDetailByEmail,
  emailCheckRepository,
  userCheckRepository,
  emailUpdateCheckRepository,
  userUpdateCheckRepository,
};