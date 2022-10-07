let { runQuery, con } = require("../config/database");
//con = con();
//runQuery = runQuery();
let { KitchenModel } = require("../models/kitchenModel");
const { getPstDate } = require("../helper/getCanadaTime");
let newDate = getPstDate();

//1 get details By ID
let getKitchenDetailsByIdRepository = async (id, res) => {
  try {
    let query =
      "select kitchen.*,countries.name as CountryName,states.name as StateName, cities.name as CityName  from `kitchen` INNER JOIN `countries`  ON kitchen.country_id=countries.country_id INNER JOIN `states` ON kitchen.state_id=states.state_id INNER JOIN `cities` ON kitchen.city_id= cities.city_id  where kitchen_id =?  ";
    let results = await runQuery(query, [id]);

    if (results.length != 0) {
      let result = results[0];
      let model = new KitchenModel();
      model.fill(
        (kitchenId = result.kitchen_id),
        (kitchenName = result.name),
        (number = result.contact_number),
        (countryId = result.country_id),
        (stateId = result.state_id),
        (cityId = result.city_id),
        (kitchenStatus = result.status),
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
let getKitchenDetailsRepository = async (req, res) => {
  try {
    let kitchenArray = [];
    let query =
      "select kitchen.*,countries.name as CountryName,states.name as StateName, cities.name as CityName  from `kitchen` INNER JOIN `countries`  ON kitchen.country_id=countries.country_id INNER JOIN `states` ON kitchen.state_id=states.state_id INNER JOIN `cities` ON kitchen.city_id= cities.city_id ";
    let results = await runQuery(query);

    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let result = results[i];
        let model = new KitchenModel();
        model.fill(
          (kitchenId = result.kitchen_id),
          (kitchenName = result.name),
          (number = result.contact_number),
          (countryId = result.country_id),
          (stateId = result.state_id),
          (cityId = result.city_id),
          (kitchenStatus = result.status),
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
        kitchenArray.push(model);
      }
      return { count, kitchenArray };
    } else {
      return { count, kitchenArray };
    }
  } catch (error) {
    return false;
  }
};

// 3 create
let insertKitchenDetailsRepository = async (
  kitchenName,
  number,
  countryId,
  stateId,
  cityId,
  kitchenStatus,
  createdBy,

  address,
  zipcode
) => {
  try {
    let query =
      "INSERT INTO `kitchen`  (`name`,`contact_number`,`country_id`,`state_id`,`city_id`,`status`,`created_date`,`created_by`,`updated_date`,`updated_by`,`address`,`zipcode`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

    let results = await runQuery(query, [
      kitchenName,
      number,
      countryId,
      stateId,
      cityId,
      kitchenStatus,
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
let updateKitchenDetailsRepository = async (
  id,
  kitchenName,
  number,
  countryId,
  stateId,
  cityId,
  kitchenStatus,
  updatedBy,
  address,
  zipcode,
  res
) => {
  try {
    let query =
      "UPDATE `kitchen` SET name =?,contact_number=?,country_id=?,state_id=?,city_id=?,status=?,updated_date=?,updated_by=? ,address=?,zipcode=? WHERE kitchen_id =? ";

    let results = await runQuery(query, [
      kitchenName,
      number,
      countryId,
      stateId,
      cityId,
      kitchenStatus,
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
let deleteKitchenDetailsRepository = async (id, res) => {
  try {
    let query = "DELETE from kitchen WHERE kitchen_id =? ";
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
  getKitchenDetailsByIdRepository,
  getKitchenDetailsRepository,
  insertKitchenDetailsRepository,
  updateKitchenDetailsRepository,
  deleteKitchenDetailsRepository,
};
