/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {FacilityModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * facility_center 
 * 
 * The methods Calls were as follows
 * 1. getFacilityCenterDetailsByIdRepository-->fetch the center by ID
 * 2.getAllFacilityCenterDetailsRepository    --> fetch all centers
 * 3.insertFacilityCenterDetailsRepository  --> create new Center
 *4.updateFacilityCenterDetailsRepository  --> update ceneter with id
 * 5.deleteFacilityCenterDetailsRepository  --> delete center by ID
 *
 */

let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
let { FacilityModel } = require("../models/facilityCentreModel");
const date = require("date-and-time");
let newDate = new Date();
//1 get details By ID
let getFacilityCenterDetailsByIdRepository = async (id, res) => {
  try {
    let query =
      "select facility_center.*,countries.name as CountryName,states.name as StateName, cities.name as CityName  from `facility_center` INNER JOIN `countries`  ON facility_center.facility_country_id=countries.id INNER JOIN `states` ON facility_center.facility_state_id=states.id INNER JOIN `cities` ON facility_center.facility_city_id= cities.id  where facility_center_id =?  ";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new FacilityModel();
      model.fill(
        (facilityCenterId = result.facility_center_id),
        (facilityName = result.facility_name),
        (headId = result.facility_head_id),
        (email = result.facility_email),
        (number = result.facility_contact_number),
        (countryId = result.facility_country_id),
        (stateId = result.facility_state_id),
        (cityId = result.facility_city_id),
        (facilityStatus = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by),
        (countryName = result.CountryName),
        (stateName = result.StateName),
        (cityName = result.CityName)
      );

      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log("repo: catch block error");
    return false;
  }
};
//2 get all details
let getAllFacilityCenterDetailsRepository = async (req, res) => {
  try {
    let facilityArray = [];
    let query =
      "select facility_center.*,countries.name as CountryName,states.name as StateName, cities.name as CityName  from `facility_center` INNER JOIN `countries`  ON facility_center.facility_country_id=countries.id INNER JOIN `states` ON facility_center.facility_state_id=states.id INNER JOIN `cities` ON facility_center.facility_city_id= cities.id ";
    let results = await runQuery(query);
    let count = results.length;

    for (i = 0; i < count; i++) {
      let result = results[i];
      let model = new FacilityModel();
      model.fill(
        (facilityCenterId = result.facility_center_id),
        (facilityName = result.facility_name),
        (headId = result.facility_head_id),
        (email = result.facility_email),
        (number = result.facility_contact_number),
        (countryId = result.facility_country_id),
        (stateId = result.facility_state_id),
        (cityId = result.facility_city_id),
        (facilityStatus = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by),
        (countryName = result.CountryName),
        (stateName = result.StateName),
        (cityName = result.CityName)
      );
      facilityArray.push(model);
    }
    return { count, facilityArray };
  } catch (error) {
    console.log("repo: catch block error ");
    console.log(error);
    return false;
  }
};

// 3 create
let insertFacilityCenterDetailsRepository = async (
  facilityName,
  // headId,
  email,
  number,
  countryId,
  stateId,
  cityId,
  facilityStatus
  //createdBy
) => {
  try {
    let query =
      "INSERT INTO `facility_center`  (`facility_name`,`facility_email`,`facility_contact_number`,`facility_country_id`,`facility_state_id`,`facility_city_id`,`status`,`created_date`,`updated_date`) VALUES(?,?,?,?,?,?,?,?,?)";
    // let sql = con.format(query, [
    //   facilityName,
    //   // headId,
    //   email,
    //   number,
    //   countryId,
    //   stateId,
    //   cityId,
    //   facilityStatus,
    //   newDate,
    //   // createdBy,
    //   newDate,
    //   // createdBy,
    // ]);
    let results = await runQuery(query, [
      facilityName,
      // headId,
      email,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      newDate,
      // createdBy,
      newDate,
      // createdBy,
    ]);

    return results.insertId;
  } catch (error) {
    console.log("repo:catch block error");
    console.log(error);
    return null;
  }
};
// 4 update
let updateFacilityCenterDetailsRepository = async (
  id,
  facilityName,
  headId,
  email,
  number,
  countryId,
  stateId,
  cityId,
  facilityStatus,
  updatedBy,
  res
) => {
  try {
    console.log("into update repository");
    let query =
      "UPDATE `facility_center` SET facility_name =?,facility_head_id=?,facility_email=?,facility_contact_number=?,facility_country_id=?,facility_state_id=?,facility_city_id=?,status=?,updated_date=?,updated_by=?  WHERE facility_center_id =? ";
    // let sql = con.format(query, [
    //   facilityName,
    //   headId,
    //   email,
    //   number,
    //   countryId,
    //   stateId,
    //   cityId,
    //   facilityStatus,
    //   newDate,
    //   updatedBy,
    //   id,
    // ]);
    let results = await runQuery(query, [
      facilityName,
      headId,
      email,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      newDate,
      updatedBy,
      id,
    ]);

    if (results.affectedRows == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 5 delete
let deleteFacilityCenterDetailsRepository = async (id, res) => {
  try {
    let query = "DELETE from facility_center WHERE facility_center_id =? ";
    // let sql = con.format(query, [id]);
    let result = await runQuery(query, [id]);

    if (result.affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getFacilityCenterDetailsByIdRepository,
  getAllFacilityCenterDetailsRepository,
  insertFacilityCenterDetailsRepository,
  updateFacilityCenterDetailsRepository,
  deleteFacilityCenterDetailsRepository,
};
