const { runQuery, con } = require("../config/database");
const { UserActivityLogModel } = require("../models/userActivityLogModel");

const getUserLogDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from `user_activity_log ` where activity_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new UserActivityLogModel();
      model.fill(
        (activityId = result.activity_id),
        (activityDescription = result.activity_description),
        (activityLoggedDate = result.activity_logged_date),
        (userId = result.user_id)
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
module.exports = { getUserLogDetailByIdRepository };
