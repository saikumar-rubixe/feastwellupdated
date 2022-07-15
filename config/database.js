const env = require("dotenv");
env.config();
var mysql = require("mysql");
const util = require("util");

const getcon = () => {
  try {
    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });
    return con;
  } catch (error) {
    return null;
  }
};
const databseConnection = () => {
  try {
    con = getcon();

    const runQuery = util.promisify(con.query).bind(con);
    return runQuery;
  } catch (error) {
    console.log(`error while connecting databse ${error}`);
  }
};

module.exports = {
  runQuery: databseConnection,
  con: getcon,
};
