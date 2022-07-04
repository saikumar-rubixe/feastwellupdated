/** configure connection with database
 *
 */
var mysql = require("mysql");
const util = require("util");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "feast_well",
});
const runQuery = util.promisify(con.query).bind(con);

module.exports = {
  runQuery: runQuery,
  con,
};
