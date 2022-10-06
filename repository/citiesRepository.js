let { runQuery } = require("../config/database");
//con = con();
//runQuery = runQuery();
let { CitiesModel } = require("../models/citiesmodel");

// 1 get all cities
const getAllCitiesDetailsRepository = async (req, res, countryId) => {
  try {
    let array = [];
    let query = "select * from `cities` where 1=1 ";
    if (countryId) {
      query += " and country_id = " + countryId;
    }

    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new CitiesModel();
        let result = results[i];
        model.fill(
          (id = result.city_id),
          (cityname = result.name),
          (stateCode = result.state_code),
          (countryCode = result.country_id)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 2 GET CITIES BY STATE ID
const getCitiesByStateIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      " select `city_id`,`name`,`state_code`,`country_id` , state_id from  `cities` where state_id =?";

    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new CitiesModel();
        let result = results[i];
        model.fill(
          (id = result.city_id),
          (cityname = result.name),
          (stateCode = result.state_code),
          (countryCode = result.country_id),
          (stateId = result.state_id)
        );
        array.push(model);
      }
    } else {
      return false;
    }
    return { count, array };
  } catch (error) {
    return false;
  }
};

// 3 create cities
const createCitiesRepository = async (name, stateId, countryId) => {
  try {
    let query =
      "INSERT into `cities` (`name`,`state_id`, country_id) VALUES(?,?,?) ";

    let results = await runQuery(query, [name, stateId, countryId]);
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

// 4 update cities
const updateCityRepository = async (id, name, stateCode, countryCode) => {
  try {
    let query =
      " UPDATE `cities` set `name`=?,`state_code`=?,`country_code`=? where city_id =?";

    let results = await runQuery(query, [name, stateCode, countryCode, id]);
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
// 5 delete cities
const deleteCityRepository = async (id, res) => {
  try {
    let query = "DELETE from  `cities` where `city_id`=?";

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

// 6 get cities by city id
const getCitiesByCityIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      " select `id`,`name`,`state_code`,`country_id` , state_id from  `cities` where city_id =?";
    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new CitiesModel();
        let result = results[i];
        model.fill(
          (id = result.city_id),
          (cityname = result.name),
          (stateCode = result.state_code),
          (countryCode = result.country_id),
          (stateId = result.state_id)
        );
        array.push(model);
      }
    } else {
      return false;
    }
    return { count, array };
  } catch (error) {
    return false;
  }
};

// 7 get city by country id
const getCitiesByCountryIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      " select `city_id`,`name`,`state_code`,`country_id` , state_id from  `cities` where country_id =?";

    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new CitiesModel();
        let result = results[i];
        model.fill(
          (id = result.city_id),
          (cityname = result.name),
          (stateCode = result.state_code),
          (countryCode = result.country_id),
          (stateId = result.state_id)
        );
        array.push(model);
      }
    } else {
      return false;
    }
    return { count, array };
  } catch (error) {
    return false;
  }
};

//8 delete cities by state id
const deleteCitiesByStateIdRepository = async (id, res) => {
  try {
    let query = "DELETE from  `cities` where `state_id `=?";

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

//9 delete cities by country id
const deleteCitiesByCountryId = async (id, res) => {
  try {
    let query = "DELETE from  `cities` where `country_id  `=?";

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

// module export
module.exports = {
  createCitiesRepository,
  getAllCitiesDetailsRepository,
  getCitiesByStateIdRepository,
  updateCityRepository,
  deleteCityRepository,
  getCitiesByCityIdRepository,

  getCitiesByCountryIdRepository,
  deleteCitiesByStateIdRepository,
  deleteCitiesByCountryId,
};
