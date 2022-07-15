/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * center_Head  for facility_center head 
 * 
 * The methods Calls were as follows
 * 1.insertCenterHeadRepository -->Create  the center_Head 
 * 2.updateCenterHeadRepository -->Upate the Center Head
 * 3.deleteCenterHeadRepository --> delete the ceter Head
 * 4. getByIdCenterHeadRepository -->fetch the center heads by id
 * 5.getAllCenterHeadRepository  -->fetch all the center heads
 */

const { runQuery, con } = require("../config/database");
con = con();
runQuery = runQuery();
const { CenterHeadmodel } = require("../models/centreHeadModel");
const date = require("date-and-time");
let newDate = new Date();

// 1 insertCenterHeadRepository
const insertCenterHeadRepository = async (
  centerHeadName,
  personId,
  centeremail,
  centerContactNumber,
  centerCountryId,
  centerStateId,
  centerCityId,
  centerHeadStatus,
  createdBy
) => {
  try {
    let query =
      " insert into `center_head` (`center_head_name`, `center_person_id`,`center_email`,  `center_contact_number`, `center_country_id`, `center_state_id`,  `center_city_id`, `status`, `created_date`, `created_by`, `updated_date`,  `updated_by`)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    let sql = con.format(query, [
      centerHeadName,
      personId,
      centeremail,
      centerContactNumber,
      centerCountryId,
      centerStateId,
      centerCityId,
      centerHeadStatus,
      newDate,
      createdBy,
      newDate,
      createdBy,
    ]);
    let results = await runQuery(sql);
    let value = results.insertId;

    if (!value) {
      return false;
    } else if (value) {
      return value;
    }
  } catch (error) {
    console.log("repository: catch block error");
    console.log(error);
    return false;
  }
};
// 2 updateCenterHeadRepository
const updateCenterHeadRepository = async (
  id,
  centerHeadName,
  personId,
  centeremail,
  centerContactNumber,
  centerCountryId,
  centerStateId,
  centerCityId,
  centerHeadStatus,
  updatedBy
) => {
  try {
    let query =
      " UPDATE  `center_head` SET `center_head_name`=?,`center_person_id`=?,`center_email`=?,`center_contact_number`=?,`center_country_id`=?,`center_state_id`=?,`center_city_id`=?,`status`=?, `updated_date`=?,`updated_by` =? WHERE center_head_id=?";
    let sql = con.format(query, [
      centerHeadName,
      personId,
      centeremail,
      centerContactNumber,
      centerCountryId,
      centerStateId,
      centerCityId,
      centerHeadStatus,
      newDate,
      updatedBy,
      id,
    ]);
    let results = await runQuery(sql);
    let value = results.affectedRows;
    if (value == 1) {
      return true;
    } else if (value > 1) {
      return 2;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Repository : catch block Error");
    console.log(error);
    return false;
  }
};

//3 delete
const deleteCenterHeadRepository = async (id, res) => {
  try {
    let query = "delete from `center_head` where  center_head_id =? ";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    let value = results.affectedRows;
    if (value == 1) return true;
    else return false;
  } catch (error) {
    console.log(error);
    console.log("Repository : Something Went Wrong CB");
    return false;
  }
};

// 4  get by id  getByIdCenterHeadRepository
const getByIdCenterHeadRepository = async (id, res) => {
  try {
    let query =
      "select center_head.*, countries.name as CountryName,states.name as StateName, cities.name as CityName from  `center_head` INNER JOIN `countries`  ON center_head.center_country_id=countries.id INNER JOIN `states` ON center_head.center_state_id=states.id INNER JOIN `cities` ON center_head.center_city_id= cities.id            where center_head_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);

    if (results.length != 0) {
      let model = new CenterHeadmodel();
      let array = results[0];
      model.fill(
        (centerHeadId = array.center_head_id),
        (centerHeadName = array.center_head_name),
        (personId = array.center_person_id),
        (centeremail = array.center_email),
        (centerContactNumber = array.center_contact_number),
        (centerCountryId = array.center_country_id),
        (centerStateId = array.center_state_id),
        (centerCityId = array.center_city_id),
        (centerHeadStatus = array.status),
        (createdDate = array.created_date),
        (createdBy = array.created_by),
        (updatedDate = array.updated_date),
        (updatedBy = array.updated_by),
        (CountryName = array.CountryName),
        (StateName = array.StateName),
        (CityName = array.CityName)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log("repository: catch block error");
    console.log(error);
    return false;
  }
};
// 5 getAllCenterHeadRepository
const getAllCenterHeadRepository = async (req, res) => {
  try {
    let arrayCenter = [];
    let query =
      " select center_head.* ,  countries.name as CountryName,states.name as StateName, cities.name as CityName from  `center_head` INNER JOIN `countries`  ON center_head.center_country_id=countries.id INNER JOIN `states` ON center_head.center_state_id=states.id INNER JOIN `cities` ON center_head.center_city_id= cities.id      where 1=1 ";
    let sql = con.format(query);
    let results = await runQuery(sql);

    let count = results.length;
    if (results.length != 0) {
      for (i = 0; i < results.length; i++) {
        let model = new CenterHeadmodel();
        let array = results[i];
        model.fill(
          (centerHeadId = array.center_head_id),
          (centerHeadName = array.center_head_name),
          (personId = array.center_person_id),
          (centeremail = array.center_email),
          (centerContactNumber = array.center_contact_number),
          (centerCountryId = array.center_country_id),
          (centerStateId = array.center_state_id),
          (centerCityId = array.center_city_id),
          (centerHeadStatus = array.status),
          (createdDate = array.created_date),
          (createdBy = array.created_by),
          (updatedDate = array.updated_date),
          (updatedBy = array.updated_by),
          (CountryName = array.CountryName),
          (StateName = array.StateName),
          (CityName = array.CityName)
        );
        arrayCenter.push(model);
      }
      return { count, arrayCenter };
    } else return false;
  } catch (error) {
    console.log(error);
    console.log("Repository:catch block error");
    return false;
  }
};

module.exports = {
  insertCenterHeadRepository,
  updateCenterHeadRepository,
  deleteCenterHeadRepository,
  getByIdCenterHeadRepository,
  getAllCenterHeadRepository,
};
