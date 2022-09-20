/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 *  Model is used to show the response with respective fields for mapping &  easy understanding
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *  date-and-time is used to take the current date for created date and updated date
 *  ------------------------------------------------------------------------------------------
 *    User Activity log file is to track the  users requests activty etc
 * The methods Calls were as follows
 * 1.getUserLogDetailByIdRepository -->fetch the user by ID
 *
 */
let { RolesModel } = require("../models/rolesModel");
let { runQuery, con } = require("../config/database");
const { getPstDate } = require("../helper/getCanadaTime");

//con = con();
//runQuery = runQuery();
// 1 get by id roles
const getRolesDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from `roles` where role_id =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new RolesModel();
      model.fill(
        (roleId = result.role_id),
        (roleName = result.role_name),
        (userTypeId = result.user_type_id),
        (roleStatus = result.status),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date)
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

// 2 get all details
const getAllRolesDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "SELECT  * from `roles` where 1=1 ";
    //let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new RolesModel();
        let result = results[i];
        model.fill(
          (roleId = result.role_id),
          (roleName = result.role_name),
          (userTypeId = result.user_type_id),
          (roleStatus = result.status),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date)
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

// 3 create role
const createRoleRepository = async (roleName, userTypeId, roleStatus) => {
  try {
    let query =
      "INSERT into `roles` (`role_name`,`user_type_id`,`status`,`created_date`,`updated_date`) VALUES(?,?,?,?,?) ";

    let results = await runQuery(query, [
      roleName,

      userTypeId,
      roleStatus,
      getPstDate(),
      getPstDate(),
    ]);
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

// 4 update role
const updateRolesRepository = async (
  id,
  roleName,

  userTypeId,
  roleStatus
) => {
  try {
    let query =
      " UPDATE `roles` set `role_name`=?,`user_type_id`=?,`status`=?,`updated_date`=? where role_id  =?";

    let results = await runQuery(query, [
      roleName,

      userTypeId,
      roleStatus,
      getPstDate(),
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

// 5 delete role
const deleteRolesRepository = async (id) => {
  try {
    let query = "DELETE from  `roles` where `role_id`=?";
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

// 6. getRoleForUserTypeRepository will return user RolesModel for particular user type
/*
  @param userType
  @return RolesModel
  @author galab
*/
const { color, log } = require("console-log-colors");
const { red, green, cyan } = color;
const getRoleForUserTypeRepository = async (userType) => {
  console.log(color.green(`5 in the get roole for User Type`));
  var roleReturnModel = null;
  try {
    let query = " select * from `roles` where user_type_id =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [userType]);
    if (results.length != 0) {
      let result = results[0];
      let model = new RolesModel();
      model.fill(
        (roleId = result.role_id),
        (roleName = result.role_name),
        (userTypeId = result.user_type_id),
        (roleStatus = result.status),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date)
      );
      roleReturnModel = model;
    }
  } catch (err) {
    console.log(err);
  }
  return roleReturnModel;
};

module.exports = {
  getRolesDetailByIdRepository,
  getAllRolesDetailsRepository,
  createRoleRepository,
  updateRolesRepository,
  deleteRolesRepository,
  getRoleForUserTypeRepository,
};
