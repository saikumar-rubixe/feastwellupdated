const { runQuery, con } = require("../config/database");
const { permissionsModel } = require("../models/permissionsModel");

const getPermissionsDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from permissions where permission_id =?";
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

module.exports = { getPermissionsDetailByIdRepository };
