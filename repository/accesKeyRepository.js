let { runQuery } = require("../config/database");
let { AccessKeyModel } = require();

const getAccessKeyRepository = async () => {
  try {
    array = [];
    let sql = "select * from `key_details` ";
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new AccessKeyModel();
      model.fill(
        (accessKey = result.access_Key),
        (secretKey = result.secret_key),
        (bucketName = result.bucket_name)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error); //delete
    console.log(`error in getting the keys`); //delete
    return false;
  }
};

module.exports = { getAccessKeyRepository };
