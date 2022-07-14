/** configure connection with database
 *
 */
 const env = require('dotenv')
env.config()
 
var mysql = require("mysql");
const util = require("util");
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
const runQuery = util.promisify(con.query).bind(con);

module.exports = {
  runQuery: runQuery,
  con,
};
