/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {FacilityModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * facility
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
let { FacilityModel } = require("../models/facilityModel");
const date = require("date-and-time");

const { getPstDate } = require("../helper/getCanadaTime");
let newDate = getPstDate();
//1 get details By ID
let getFacilityCenterDetailsByIdRepository = async (id, res) => {
  try {
    let query =
      "select facility.*,countries.name as CountryName,states.name as StateName, cities.name as CityName  from `facility` INNER JOIN `countries`  ON facility.facility_country_id=countries.id INNER JOIN `states` ON facility.facility_state_id=states.id INNER JOIN `cities` ON facility.facility_city_id= cities.id  where facility_id =?  ";
    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new FacilityModel();
      model.fill(
        (facilityCenterId = result.facility_id),
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
        (address = result.address),
        (zipcode = result.zipcode),
        (countryName = result.CountryName),
        (stateName = result.StateName),
        (cityName = result.CityName)
      );

      return model;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
//2 get all details
let getAllFacilityCenterDetailsRepository = async (req, res) => {
  try {
    let facilityArray = [];
    let query =
      "select facility.*,countries.name as CountryName,states.name as StateName, cities.name as CityName  from `facility` INNER JOIN `countries`  ON facility.facility_country_id=countries.id INNER JOIN `states` ON facility.facility_state_id=states.id INNER JOIN `cities` ON facility.facility_city_id= cities.id ";
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let result = results[i];
        let model = new FacilityModel();
        model.fill(
          (facilityCenterId = result.facility_id),
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
          (address = result.address),
          (zipcode = result.zipcode),
          (countryName = result.CountryName),
          (stateName = result.StateName),
          (cityName = result.CityName)
        );
        facilityArray.push(model);
      }
      return { count, facilityArray };
    } else {
      return { count, facilityArray };
    }
  } catch (error) {
    return false;
  }
};

// 3 create
let insertFacilityCenterDetailsRepository = async (
  facilityName,
  headId,
  number,
  countryId,
  stateId,
  cityId,
  facilityStatus,
  createdBy,
  address,
  zipcode
) => {
  try {
    let query =
      "INSERT INTO `facility`  (`facility_name`,`facility_head_id`,`facility_contact_number`,`facility_country_id`,`facility_state_id`,`facility_city_id`,`status`,`created_date`,`created_by`,`updated_date`,`updated_by`,`address`,`zipcode`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

    let results = await runQuery(query, [
      facilityName,
      headId,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      newDate,
      createdBy,
      newDate,
      createdBy,
      address,
      zipcode,
    ]);

    return results.insertId;
  } catch (error) {
    return null;
  }
};
// 4 update
let updateFacilityCenterDetailsRepository = async (
  id,
  facilityName,
  headId,
  number,
  countryId,
  stateId,
  cityId,
  facilityStatus,
  updatedBy,
  address,
  zipcode,
  res
) => {
  try {
    let query =
      "UPDATE `facility` SET facility_name =?,facility_head_id=?,facility_contact_number=?,facility_country_id=?,facility_state_id=?,facility_city_id=?,status=?,updated_date=?,updated_by=? ,address=?,zipcode=? WHERE facility_id =? ";

    let results = await runQuery(query, [
      facilityName,
      headId,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      newDate,
      updatedBy,
      address,
      zipcode,
      id,
    ]);

    if (results.affectedRows == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 5 delete
let deleteFacilityCenterDetailsRepository = async (id, res) => {
  try {
    let query = "DELETE from facility WHERE facility_id =? ";
    let result = await runQuery(query, [id]);

    if (result.affectedRows == 1) return true;
    else {
      return false;
    }
  } catch (error) {
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
