const mysql = require("mysql");
let { UserModel } = require("../models/userModel");
let { runQuery } = require("./config/database");

const { getPstDate } = require("./helper/getCanadaTime");
const date = require("date-and-time");
const bcrypt = require("bcrypt");
let newDate = new Date();
console.log(newDate);
console.log(`IST : ${date.format(newDate, "YYYY/MM/DD HH:mm:ss")}`); //delete
let canadaDate = getPstDate();
console.log(`PST : ${canadaDate}`); //delete

//* generate enrolment id imports
const { valueExistCheck } = require("./helper/enrollmentIdCheck");
const { enrollementIdTag } = require("./helper/enrollmentIDGenerator");

// create resident repository
/**
 *
 * @param {*} fullName
 * @param {*} createUserTypeRequest
 * @returns  insert Id
 */
const createResidentrepository = async (
  fullName,
  createUserTypeRequest,
  req,
  res
) => {
  try {
    console.log(`consoling the user id value ${req.userIdValue}`);
    const getTag = await enrollementIdTag(createUserTypeRequest); //get the tag as per userType
    let uniqueId = await valueExistCheck(getTag); //randomId generate
    let date = getPstDate();
    let password = "carecrop123";

    console.log(`checking the unique id ${uniqueId} date is ${date}`); //delete

    let sql =
      "INSERT INTO `users`(`full_name`,`username`,`password`,`user_type`,`status`,`created_date`,`updated_date`,`enrolment_id`,created_by,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?) ";
    let results = await runQuery(sql, [
      fullName,
      uniqueId,
      password,
      createUserTypeRequest,
      1,
      date,
      date,
      uniqueId,
      req.userIdValue,
      req.userIdValue,
    ]);
    console.log(results);
    console.log(`im at after the run query`);
    if (results) {
      console.log(`results afftected are ${results.affectedRows}`);
      return results.insertId;
    } else return false;
  } catch (error) {
    console.log(
      `something went wrong  in creating resident repository  :  ${error}`
    );
    return error;
  }
};

// create user repository
/**
 *
 * @param {*} fullName
 * @param {*} username
 * @param {*} password
 * @param {*} createUserTypeRequest
 * @returns  insert Id
 */
const createUserRepository = async (
  fullName,
  username,
  password,
  createUserTypeRequest,
  req,
  res
) => {
  try {
    console.log(`consoling the user id value ${req.userIdValue}`);
    // hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hash complete
    const getTag = await enrollementIdTag(createUserTypeRequest); //get the tag as per userType
    let uniqueId = await valueExistCheck(getTag); //randomId generate
    let date = getPstDate();
    console.log(`unique id and pst date `);
    let sql =
      "INSERT INTO `users`( `full_name`,`username`,`password`,`user_type`,`status`,`created_date`,`updated_date`,`enrolment_id`,created_by,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?) ";

    let results = await runQuery(sql, [
      fullName,
      username,
      hashedPassword,
      createUserTypeRequest,
      1,
      date,
      date,
      uniqueId,
      req.userIdValue,
      req.userIdValue,
    ]);

    if (results) {
      console.log(results);
      return results.insertId;
    } else return false;
  } catch (error) {
    console.log(error);
    console.log(
      `something went wrong  in creating user repository  :  ${error}`
    );
    return false;
  }
};

const getuserType = async (userId) => {
  try {
    let sql = "select user_type from users where user_id =" + userId;
    let results = await runQuery(sql);
    results[0].user_type;
    console.log(results[0].user_type);
    return results[0].user_type;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createResidentrepository,
  createUserRepository,
  getuserType,
};
