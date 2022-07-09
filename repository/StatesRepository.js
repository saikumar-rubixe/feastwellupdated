let { runQuery, con } = require("../config/database");
const { States } = require("../models/statesModel");

//1 get the states by id
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

// 2 get all states
const getAllStatesDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "SELECT * from `states` where 1=1 ";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new States();
        let result = results[i];
        model.fill(
          (id = result.id),
          (Statename = result.name),
          (coutryCode = result.country_code)
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

// 3 create state
const createStatesRepository = async (Statename, coutryCode) => {
  try {
    let query = "INSERT into `states` (`name`,`country_code`) VALUES(?,?) ";
    let sql = con.format(query, [Statename, coutryCode]);
    let results = await runQuery(sql);
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

// 4 update states
const updateStatesRepository = async (id, Statename, coutryCode) => {
  try {
    let query =
      " UPDATE `TABLENAME` set `Statename`=?,`coutryCode`=? where id =?";
    let sql = con.format(query, [Statename, coutryCode, id]);
    let results = await runQuery(sql);
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

// 5 delete states
const deleteStatesRepository = async (id, res) => {
  try {
    let query = "DELETE from  `states` where `id`=?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
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

module.exports = {
  getStatesByIdRepository,
  getAllStatesDetailsRepository,
  createStatesRepository,
  updateStatesRepository,
  deleteStatesRepository,
};
