let { UserFacilityMapModel } = require("../models/userFacilityMapModel");
let { runQuery } = require("../config/database");

getReisdentsOfNurseIdRepository = async (nurseId, mealType) => {
  try {
    let userArray = [];
    let query =
      "select u.*, ufm.*,imgd.* from users as u inner join user_facility_map as ufm on ufm.user_id = u.user_id left join image_details as imgd on imgd.resident_id = u.user_id where u.user_id != ? and ufm.facility_id = (SELECT facility_id from user_facility_map where user_id =?) and u.user_type = 6 and imgd.meal_type != ? and DATE(imgd.created_date) = CURDATE()-1";
    let sqlResult = await runQuery(query, [nurseId, nurseId, mealType]);
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
      value = "testing out of model";
      userArray.push(model);
    }

    return { count, userArray };
  } catch (error) {
    return false;
  }
};
module.exports = {
  getReisdentsOfNurseIdRepository,
};
