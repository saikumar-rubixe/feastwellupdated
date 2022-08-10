// const { runQuery } = require("../config/database");
// const newDate = new Date();

// // saving the image upload details
// const createImageDetailsRepository = async (userId, url) => {
//   console.log("into repo image"); //delete
//   const sql =
//     "insert into  image_details (resident_id,image_url,created_date) values (?,?,?)";
//   const details = runQuery(sql, [userId, url, newDate]);
//   console.log("consoling details of inserted id "); //delete
//   console.log(details.insertId); //delete
//   return details.insertid;
// };
// module.exports = { createImageDetailsRepository };
