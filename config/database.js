/** configure connection with database
 *
 */
var mysql = require("mysql");
const util = require("util");
var con = mysql.createConnection({
  host: "razorpayaws.cy8vmnjrajdv.ap-southeast-1.rds.amazonaws.com",
  user: "feastwell-user",
  password: "sdfj23k@8237UYUHjere7X",
  database: "feastwell",
});
const runQuery = util.promisify(con.query).bind(con);

module.exports = {
  runQuery: runQuery,
  con,
};
