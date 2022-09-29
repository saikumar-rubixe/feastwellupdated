//* to generate random id for enrolment id and check whether the id exist or not and if not retutn the uniqueid

let { runQuery } = require("../config/database");
const valueExistCheck = async (tag) => {
  try {
    let id = 0;
    while (true) {
      let randomId = tag + (await generateRandomNumber());

      const query = "select enrolment_id from users where enrolment_id=?";
      const results = await runQuery(query, [randomId]);
      if (results.length == 0) {
        id = randomId;
        break;
      }
    }

    return id;
  } catch (error) {}
};

const generateRandomNumber = async () => {
  let value = Math.floor(1000 + Math.random() * 9000);

  return value;
};

module.exports = {
  valueExistCheck,
};
