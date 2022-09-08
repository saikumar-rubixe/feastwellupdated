let { runQuery } = require("../config/database");
const valueExistCheck = async (tag) => {
  do {
    let id = 0;
    const randomId = tag + (await generateRandomNumber());
    console.log(`inside th model and the number is ${randomId}`);
    console.log(`step before checking the results`);
    const query = "select enrolment_id from users where enrolment_id=?";
    const results = await runQuery(query, [randomId]);
    console.log(results[0].enrolment_id);
    if (!results || results == null) {
      id = randomId;
    } else {
      id = 0;
    }
  } while (id == 0);
  console.log(`last stage of model consolling the Id`);
  console.log(id);
  return id;
};

const generateRandomNumber = async () => {
  let value = Math.floor(1000 + Math.random() * 9000);
  return value;
};

module.exports = {
  valueExistCheck,
};
