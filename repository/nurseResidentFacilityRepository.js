let { UserFacilityMapModel } = require("../models/userFacilityMapModel");

let { UserModel } = require("../models/userModel");
let { runQuery } = require("../config/database");

const getReisdentsOfNurseIdRepository = async (nurseId, mealType) => {
  try {
    let count = 0;
    let userArray = [];
    let query =
      "select u.*, ufm.*,f.facility_name from users as u  inner join user_facility_map as ufm on ufm.user_id = u.user_id      inner join facility as f on f.facility_id = ufm.facility_id  where u.user_id !=?  and ufm.facility_id = (SELECT facility_id from user_facility_map where user_id =?)  and u.user_type = 6 order by u.full_name ";

    let sqlResult = await runQuery(query, [nurseId, nurseId]);
    let countvalue = sqlResult.length;

    for (let i = 0; i < sqlResult.length; i++) {
      let result = sqlResult[i];
      let userId = result.user_id;

      let query2 =
        "select * from image_details where resident_id = ? and  created_date < DATE_ADD(CURDATE(), INTERVAL 1 DAY) and meal_type =? ";

      let results2 = await runQuery(query2, [userId, mealType]);
      let countvalue2 = results2.length;

      //* if data not there push details
      if (countvalue2 == 0) {
        // console.log(`residents ids are ${result.resident_id}`);//delete
        count += 1;
        let model = new UserModel();
        model.fill(
          (userId = result.user_id),
          (fullName = result.full_name),
          (phoneNumber = result.phone_number),
          (userName = result.username),
          (usertype = result.user_type),
          (userStatus = result.status),
          (lastLogin = result.last_login),
          (loggedIpAddress = result.logged_ip_address),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date),
          (enrolmentId = result.enrolment_id),
          (createdBy = result.created_by),
          (updatedBy = result.updated_by),
          (facilityId = result.facility_id),
          (facilityName = result.facility_name)
        );
        userArray.push(model);
      }
    }
    // console.log(userArray);
    // userArray.push(model);
    //console.log(count);
    return { count, userArray };
  } catch (error) {
    return false;
  }
};
module.exports = {
  getReisdentsOfNurseIdRepository,
};

// model.fill(
//   (userId = result.user_id),
//   (fullName = result.full_name),
//   (phoneNumber = result.phone_number),
//   (userName = result.username),
//   (usertype = result.user_type),
//   (userStatus = result.status),
//   (lastLogin = result.last_login),
//   (loggedIpAddress = result.logged_ip_address),
//   (createdDate = result.created_date),
//   (updatedDate = result.updated_date),
//   (enrolmentId = result.enrolment_id),
//   (createdBy = result.created_by),
//   (updatedBy = result.updated_by),
//   (facilityId = result.facility_id),
//   (facilityName = result.facility_name)
// );
