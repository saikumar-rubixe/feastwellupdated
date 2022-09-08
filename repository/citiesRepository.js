let { runQuery, con } = require("../config/database");
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
    //let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
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
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 2 GET CITIES BY STATE ID
const getCitiesByIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      " select `id`,`name`,`state_code`,`country_id` , state_id from  `cities` where state_id =?";
    // if (countryId) {
    //   query += " and country_id = " + countryId;
    // }

    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new CitiesModel();
        let result = results[i];
        model.fill(
          (id = result.id),
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
    console.log(error);
    return false;
  }
};

// 3 create cities
const createCitiesRepository = async (name, stateId, countryId) => {
  try {
    let query =
      "INSERT into `cities` (`name`,`state_id`, country_id) VALUES(?,?,?) ";
    // let sql = con.format(query, [values]);
    let results = await runQuery(query, [name, stateId, countryId]);
    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 4 update cities
const updateCityRepository = async (id, name, stateCode, countryCode) => {
  try {
    let query =
      " UPDATE `cities` set `name`=?,`state_code`=?,`country_code`=? where id =?";
    // let sql = con.format(query, [name, stateCode, countryCode, id]);
    let results = await runQuery(query, [name, stateCode, countryCode, id]);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};
// 5 delete cities
const deleteCityRepository = async (id, res) => {
  try {
    let query = "DELETE from  `cities` where `id`=?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 6 get cities by city id
const getCitiesByCityIdRepository = async (id, res) => {
  try {
    let array = [];
    let query =
      " select `id`,`name`,`state_code`,`country_id` , state_id from  `cities` where id =?";
    let results = await runQuery(query, [id]);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new CitiesModel();
        let result = results[i];
        model.fill(
          (id = result.id),
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
    console.log(error);
    return false;
  }
};
// module export
module.exports = {
  getAllCitiesDetailsRepository,
  getCitiesByIdRepository,
  createCitiesRepository,
  updateCityRepository,
  deleteCityRepository,
  getCitiesByCityIdRepository,
};
