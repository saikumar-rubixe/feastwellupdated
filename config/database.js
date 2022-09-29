const env = require("dotenv");
env.config();
var mysql = require("mysql");
const { promisify } = require("util");

const databaseConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(databaseConfig);

const promiseQuery = promisify(pool.query).bind(pool);
const promisePoolEnd = promisify(pool.end).bind(pool);
//promisePoolEnd();

module.exports = {
  runQuery: promiseQuery, // to run the query
  con: databaseConfig, // connection
};
