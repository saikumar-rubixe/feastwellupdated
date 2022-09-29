let { runQuery } = require("../config/database");
console.log(Math.floor(1000 + Math.random() * 9000)); //delete
// 1 create tag based upon the userType
const enrollementIdTag = async (userType) => {
  try {
    if (userType == 1) {
      tag = "S"; // SUPER ADMIN
      return tag;
    }
    if (userType == 2) {
      tag = "A"; //ADMIN
      return tag;
    }
    if (userType == 3) {
      tag = "F"; // FACILITY
      return tag;
    }
    if (userType == 4) {
      tag = "N"; // NURSE
      return tag;
    }
    if (userType == 5) {
      tag = "D"; //DIETICIAN
      return tag;
    }
    if (userType == 6) {
      tag = "R"; // RESIDENT
      return tag;
    } else {
      tag = "G"; // GUEST
      return tag;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont",
    });
  }
};
// generate random number
const generateRandomNumber = async () => {
  let value = Math.floor(1000 + Math.random() * 9000);
  return value;
};

// check whether the random number exists or not
const checkEnrolmentIdRepository = async (randomId) => {
  try {
    let sql = " select max(user_id) from users ";
    let results = await runQuery(sql, [randomId]);
    let count = results.toString().length;

    if (count == 1) {
      return (value = "000");
    }
    if (count == 2) {
      return (value = "00");
    }
    if (count == 3) {
      return (value = "0");
    }
    if (count == 4) {
      return (value = "");
    }
    // else {
    //   return false;
    // }

    if (results.length == 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

module.exports = {
  generateRandomNumber,
  enrollementIdTag,
  checkEnrolmentIdRepository,
};
