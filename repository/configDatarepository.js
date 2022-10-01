let { runQuery } = require("../config/database");
let { configDataModel } = require("../models/configDataModel");

const configDataRepository = async () => {
  try {
    console.log(`inside the repository with values `);
    let sql =
      'select * from `config_data`  where `status` =1 and  type ="keys" and `item_name`="aws_access_key"  ';
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new configDataModel();
      model.fill(
        (configDataId = result.config_data_id),
        (type = result.type),
        (itemName = result.item_name),
        (itemValue = result.item_value),
        (itemValue2 = result.item_value2),
        (itemValue3 = result.item_value3)
      );

      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error); //delete
    console.log(`error in getting the config data`); //delete
    return false;
  }
};

module.exports = { configDataRepository };
