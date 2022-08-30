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
 *  2. createUserLogRepository   -- record user log activity details
 * 3. get activity user log details of one user id
 */
let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
let { UserActivityLogModel } = require("../models/userActivityLogModel");
const { getPstDate } = require("../helper/getCanadaTime");

// 1 get detail by id
const getUserLogDetailByIdRepository = async (userId, res) => {
  try {
    let query = "select * from `user_activity_log` where activity_id =?";
    //let sql = con.format(query, [userId]);
    let results = await runQuery(query, [userId]);
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

// 2 create user Activity log
const createUserLogRepository = async (activityDescription, userId) => {
  try {
    let query =
      "INSERT into `user_activity_log` (`activity_description`,`activity_logged_date`,`userid`) VALUES(?,?,?) ";

    let results = await runQuery(query, [
      activityDescription,
      getPstDate(),
      userId,
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

// 3 get user activity log by user id
const getUserLogAllDetailsByUserIdRepository = async (id, res) => {
  try {
    let array = [];
    let query = "select * from `user_activity_log` where userid =?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    let count = results.length;
    if (results.length != 0) {
      for (i = 0; i < count; i++) {
        let model = new UserActivityLogModel();
        let result = results[i];
        model.fill(
          (activityId = result.activity_id),
          (activityDescription = result.activity_description),
          (activityLoggedDate = result.activity_logged_date),
          (userId = result.user_id)
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

module.exports = {
  getUserLogDetailByIdRepository,
  createUserLogRepository,
  getUserLogAllDetailsByUserIdRepository,
};
