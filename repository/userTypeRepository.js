/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {UserTypeModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * Usertype file is to get the type of users (user,admin,guest) etc to determine the routes
 * 
 * 1	Super Admin
 * 2	Center Manager
 * 3	Admin
 * 4	Center Admin
 * 5	Nurse
 * 6	Dietitian
 * 7	Resident
 * 8	Facility Head
 * 
 * The methods Calls were as follows
 * 1.getUserTypeDetailByIdRepository -->fetch the user_ttype by ID
 *
 */

let { UserTypeModel } = require("../models/userTypeModel");
let { runQuery } = require("../config/database");
//con = con();
//runQuery = runQuery();
const getUserTypeDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from  `users_type` where users_type_id =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new UserTypeModel();
      model.fill(
        (usersTypeId = result.users_type_id),
        (userTypeName = result.user_type_name)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

const getAllUserTypeDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "select * from `users_type` where 1=1 ";
    //let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new UserTypeModel();
        let result = results[i];
        model.fill(
          (usersTypeId = result.users_type_id),
          (userTypeName = result.user_type_name)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

const createUserTypeRepository = async (userTypeName) => {
  try {
    let query = "INSERT into `users_type` (`user_type_name`) VALUES(?) ";
    // let sql = con.format(query, [userTypeName]);
    let results = await runQuery(query, [userTypeName]);
    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

const updateUserTypeRepository = async (userTypeName, id) => {
  try {
    let query =
      " UPDATE `users_type` set `user_type_name`=? where users_type_id  =?";
    // let sql = con.format(query, [userTypeName, id]);
    let results = await runQuery(query, [userTypeName, id]);
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

const deleteUserTypeRepository = async (id, res) => {
  console.log(`into respository`);
  try {
    console.log(`before query`);
    let query = "DELETE from  `users_type` where users_type_id=?";

    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    console.log(`after query`);
    console.log(results);
    let value = results.affectedRows;
    // console.log(`affected rows : ${value}`);
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
  getUserTypeDetailByIdRepository,
  getAllUserTypeDetailsRepository,
  createUserTypeRepository,
  updateUserTypeRepository,
  deleteUserTypeRepository,
};
