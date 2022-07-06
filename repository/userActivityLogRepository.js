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
const { runQuery, con } = require("../config/database");
const { UserActivityLogModel } = require("../models/userActivityLogModel");
// 1 get detail by id
const getUserLogDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `user_activity_log` where activity_id  =?";
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
