let { UserFacilityMapModel } = require("../models/userFacilityMapModel");
let { runQuery } = require("../config/database");

getReisdentsOfNurseIdRepository = async (nurseId) => {
  try {
    let userArray = [];
    let query =
      " select user_facility_map.*, users.full_name,users.username,users.user_type from user_facility_map  inner join users  on  user_facility_map.user_id = users.user_id  and user_facility_map.facility_id =(SELECT facility_id from user_facility_map where user_id =?) and users.user_id !=?";
    let sqlResult = await runQuery(query, [nurseId, nurseId]);
    let count = sqlResult.length;
    for (let i = 0; i < sqlResult.length; i++) {
      let model = new UserFacilityMapModel();
      let result = sqlResult[i];
      model.fill(
        (id = result.id),
        (userId = result.user_id),
        (facilityId = result.facility_id),
        (status = result.status),
        (createdDate = result.created_date),
        (createdBy = result.created_by),
        (updatedDate = result.updated_date),
        (updatedBy = result.updated_by),
        (fullName = result.full_name),
        (userName = result.username),
        (userType = result.user_type)
      );
      userArray.push(model);
    }

    return { count, userArray };
  } catch (error) {
    console.log(`error in catch block is ${error}`);
    return false;
  }
};
module.exports = {
  getReisdentsOfNurseIdRepository,
};
