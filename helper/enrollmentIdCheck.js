//* to generate random id for enrolment id and check whether the id exist or not and if not retutn the uniqueid

let { runQuery } = require("../config/database");
const valueExistCheck = async (tag) => {
  try {
    let id = 0;
    while (true) {
      let randomId = tag + (await generateRandomNumber());
      console.log(`generated id is ${randomId}`);
      const query = "select enrolment_id from users where enrolment_id=?";
      const results = await runQuery(query, [randomId]);
      if (results.length == 0) {
        console.log(`no results found`);
        id = randomId;
        break;
      }
    }

    return id;
  } catch (error) {
    console.log("something went wrong int value check");
    console.log(error);
  }
};

const generateRandomNumber = async () => {
  let value = Math.floor(1000 + Math.random() * 9000);
  console.log(value);
  return value;
};

module.exports = {
  valueExistCheck,
};

// let randomId = tag + (await generateRandomNumber());
// console.log(`generated id is ${randomId}`);
// const query = "select enrolment_id from users where enrolment_id=?";

// const results = await runQuery(query, [randomId]);
// if (results.length == 0) {
//   console.log(`no results found`);
//   id = randomId;
// }
// else {
//   console.log(`record exist`);
//   randomId = randomId + 1;
//   id = 0;
// }
