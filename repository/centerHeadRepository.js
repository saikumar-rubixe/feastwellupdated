let { runQuery } = require("../config/database");

const getResidentsBMIDetails = async () => {
  try {
    let sql =
      "select  u.enrolment_id as enrolment_id, u.user_id as resident id , rd.name , rd.age,rd.gender , rd.current_weight,rd.current_height ,f.facility_id ,f.facility_name   from users as u  ";
  } catch (error) {
    console.log(error);
  }
};
