const { RolesModel } = require("../models/rolesModel");
const { runQuery, con } = require("../config/database");
const getRolesDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from `roles` where role_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new RolesModel();
      model.fill(
        (roleId = result.role_id),
        (roleName = result.role_name),
        (menuId = result.menu_id),
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

module.exports = { getRolesDetailByIdRepository };
