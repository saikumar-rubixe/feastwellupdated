var path = require("path");
const { Console } = require("console");
// get fs module for creating write streams
const fs = require("fs");

// make a new logger
const myLogger = new Console({
  stdout: fs.createWriteStream("normalStdout.txt"),
  stderr: fs.createWriteStream("errStdErr.txt"),
});
module.exports = { myLogger };
// saving to normalStdout.txt file
myLogger.log("Hello 😃. This will be saved in normalStdout.txt file");

// saving to errStdErr.txt file
myLogger.error("Its an error ❌. error file");
