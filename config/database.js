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

/** 
const getcon = (res) => {
  try {
    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });

    return con;
  } catch (error) {
    con.connect(function (err) {
      // The server is either down
      console.log("im in the error block and about to close the connection");
      con.end();
      if (err) {
        // or restarting (takes a while sometimes).
        console.log("error when connecting to db:", err);

        setTimeout(getcon, 2000); // We introduce a delay before attempting to reconnect,
      } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you’re also serving http, display a 503 error.
    con.on("error", function (err) {
      console.log("db error", err);
      con.end();
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        // Connection to the MySQL server is usually
        getcon(); // lost due to either server restart, or a
      } else {
        // connnection idle timeout (the wait_timeout
        throw err; // server variable configures this)
      }
    });

    res.send("database connection error");
  }
};

const databseConnection = (res) => {
  try {
    con = getcon();
    const runQuery = util.promisify(con.query).bind(con);
    return runQuery;
  } catch (error) {
    console.log(`error while connecting databse ${error}`);
    res.send("database connection error");
  }
};
*/
