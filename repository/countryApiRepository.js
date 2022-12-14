/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * Country state and cities for registration forms address section
 * 
 * The methods Calls were as follows
 * 1.getCountryRepository -->fetch the COUNTRIES
 * 2.getStatesByIdRepository---> fetch the states as per country id
 * 3.getCitiesByIdRepository ---> fetch the cities as per state Id
 *
 */

let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
// country Model
let { CountriesModel } = require("../models/countriesModel");

// 1 GET COUNTRIES
const getAllCountryRepository = async (req, res) => {
  try {
    let array = [];
    let query =
      "select country_id ,name,phonecode,iso2,timezones from countries where 1=1 ";

    let results = await runQuery(query);

    let count = results.length;

    for (i = 0; i < count; i++) {
      let model = new CountriesModel();
      let result = results[i];
      model.fill(
        (id = result.country_id),
        (name = result.name),
        (phonecode = result.phonecode),
        (iso2 = result.iso2),
        (timezones = result.timezones)
      );
      array.push(model);
    }

    return { count, array };
  } catch (error) {
    return false;
  }
};
// 2 get all countries
const getCountryByIdRepository = async (id, res) => {
  try {
    let query =
      "SELECT name,phonecode,iso2,timezones from countries where country_id =?";

    let results = await runQuery(query, [id]);
    if (results.length != 0) {
      let result = results[0];
      let model = new CountriesModel();
      model.fill(
        (id = result.country_id),
        (name = result.name),
        (phonecode = result.phonecode),
        (iso2 = result.iso2),
        (timezones = result.timezones)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 3 create countries
const createCountryRepository = async (name, phoneCode, is02, timeZones) => {
  try {
    let query =
      "INSERT into `countries` (`name`,`phonecode`,`iso2`,`timezones`) VALUES(?,?,?,?) ";

    let results = await runQuery(query, [name, phoneCode, is02, timeZones]);

    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 4 update countries  Repository
const updateCountryRepository = async (
  name,
  phoneCode,
  is02,
  timeZones,
  id
) => {
  try {
    let query =
      " UPDATE `countries` set `name`=?,`phonecode`=?, `iso2`=?,`timezones`=?  where country_id =? ";

    let results = await runQuery(query, [name, phoneCode, is02, timeZones, id]);

    let value = results.affectedRows;

    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 5 delete country
const deleteCountryRepository = async (id, res) => {
  try {
    let query = "DELETE from  `countries` where `country_id`=?";

    let results = await runQuery(query, [id]);
    let value = results.affectedRows;

    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllCountryRepository,
  getCountryByIdRepository,
  createCountryRepository,
  updateCountryRepository,
  deleteCountryRepository,
};
