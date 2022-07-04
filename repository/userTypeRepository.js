const { UserTypeModel } = require("../models/userTypeModel");

const { runQuery, con } = require("../config/database");

const getUserTypeDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from  `users_type` where users_type_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
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

module.exports = { getUserTypeDetailByIdRepository };
