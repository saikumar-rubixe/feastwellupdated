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

const { array } = require("joi");
let { runQuery, con } = require("../config/database");
// country state city Model
let { CountriesModel } = require("../models/countriesModel");
const { States } = require("../models/statesModel");
const { CitiesModel } = require("../models/citiesmodel");

// 1 GET COUNTRIES
const getCountryRepository = async (req, res) => {
  let array = [];
  try {
    let query =
      "select id ,name,phonecode,iso2,timezones from countries where 1=1 ";
    let sql = con.format(query);

    let results = await runQuery(sql);

    let count = results.length;

    for (i = 0; i < count; i++) {
      let model = new CountriesModel();
      let result = results[i];
      model.fill(
        (id = result.id),
        (name = result.name),
        (phonecode = result.phonecode),
        (iso2 = result.iso2),
        (timezones = result.timezones)
      );
      array.push(model);
    }

    return { count, array };
  } catch (error) {
    console.log(error);
    console.log("catch block error something went wrong");
  }
};
//2  get the states by id
const getStatesByIdRepository = async (id, res) => {
  let array = [];
  let query =
    " select `id`,`name`,`country_code` from  `states` where country_id =?";
  let sql = con.format(query, [id]);
  let results = await runQuery(sql);
  let count = results.length;

  for (i = 0; i < count; i++) {
    let statesmodel = new States();
    let result = results[i];
    statesmodel.fill(
      (id = result.id),
      (Statename = result.name),
      (coutryCode = result.country_code)
    );
    array.push(statesmodel);
  }
  return { count, array };
};

// 3 GET CITIES BY STATE ID
const getCitiesByIdRepository = async (id, res) => {
  let array = [];
  let query =
    " select `id`,`name`,`state_code`,`country_id` from  `cities` where state_id =?";
  let sql = con.format(query, [id]);
  let results = await runQuery(sql);
  let count = results.length;

  for (i = 0; i < count; i++) {
    let model = new CitiesModel();
    let result = results[i];
    model.fill(
      (id = result.id),
      (cityname = result.name),
      (stateCode = result.state_code),
      (countryCode = result.country_id)
    );
    array.push(model);
  }
  return { count, array };
};
module.exports = {
  getCountryRepository,
  getStatesByIdRepository,
  getCitiesByIdRepository,
};
