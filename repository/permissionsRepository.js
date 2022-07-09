/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * permissions file is to check the speicific user_type has the permission to make CRUD operations
 * 													
* 1. permission_id	
* 2. role_id	
* 3. read_access	
* 4. write_access
* 5. update_access
* 6. delete_access
* 7. status
* 8. created_date
* 9. updated_date

 * The methods Calls were as follows
 * 1.getPermissionsDetailByIdRepository -->fetch the user by ID
 *
 */
const { runQuery, con } = require("../config/database");
const { permissionsModel } = require("../models/permissionsModel");
let newDate = new Date();

// 1 get all permissions
const getAllPermissionsDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "SELECT * FROM permissions WHERE 1=1  ";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new permissionsModel();
        let result = results[i];
        model.fill(
          (permissionId = result.permission_id),
          (roleId = result.role_id),
          (readAccess = result.read_access),
          (writeAccess = result.write_access),
          (updateAccess = result.update_access),
          (deleteAccess = result.delete_access),
          (permissionStatus = result.status),
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

// 2 get by id
const getPermissionsDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from `permissions` where permission_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new permissionsModel();
      model.fill(
        (permissionId = result.permission_id),
        (roleId = result.role_id),
        (readAccess = result.read_access),
        (writeAccess = result.write_access),
        (updateAccess = result.update_access),
        (deleteAccess = result.delete_access),
        (permissionStatus = result.status),
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

// 3 create
const createPermissionsRepository = async (
  roleId,
  readAccess,
  writeAccess,
  updateAccess,
  deleteAccess,
  permissionStatus
) => {
  try {
    let query =
      "INSERT into `permissions` (`role_id`,read_access,write_access,update_access,delete_access,status,created_date,updated_date) VALUES(?,?,?,?,?,?,?,?) ";
    let sql = con.format(query, [
      roleId,
      readAccess,
      writeAccess,
      updateAccess,
      deleteAccess,
      permissionStatus,
      newDate,
      newDate,
    ]);
    let results = await runQuery(sql);
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
// 4 update
const updatePermissionsRepository = async (
  id,
  roleId,
  readAccess,
  writeAccess,
  updateAccess,
  deleteAccess,
  permissionStatus
) => {
  try {
    let query =
      " UPDATE `permissions` set `role_id`=?,`read_access`=?,`write_access`=?,`update_access`=?,`delete_access`=?,`status`=?,`updated_date`=? where permission_id  =?";
    let sql = con.format(query, [
      roleId,
      readAccess,
      writeAccess,
      updateAccess,
      deleteAccess,
      permissionStatus,
      newDate,
      id,
    ]);
    let results = await runQuery(sql);
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
const deletePermissionsRepository = async (id, res) => {
  try {
    let query = "DELETE from `permissions` where permission_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
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
  getPermissionsDetailByIdRepository,
  getAllPermissionsDetailsRepository,
  createPermissionsRepository,
  updatePermissionsRepository,
  deletePermissionsRepository,
};
