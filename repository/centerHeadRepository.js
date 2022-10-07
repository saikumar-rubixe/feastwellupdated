// let { runQuery } = require("../config/database");
// require("../models/residentsCalorieValuesModel");

// //**  get all details
// const getResidentsDetailsWithFoodPrediction = async (
//   facilityId,
//   dateFilter
// ) => {
//   try {
//     let belowOptimalArray = [];
//     let optimalArray = [];
//     let aboveOptimalArray = [];
//     let sql =
//       "select u.user_id ,u.enrolment_id,u.full_name, rd.gender, rd.age,rd.current_weight,rd.current_height, f.facility_id,f.facility_name, imgd.meal_type,imgd.created_date as meal_created_at, impr.json_response as nutrition_values from users as u LEFT JOIN residents_details as rd ON u.user_id = rd.user_id LEFT JOIN user_facility_map as ufm ON u.user_id = ufm.user_id LEFT JOIN facility as f ON ufm.facility_id = f.facility_id LEFT JOIN image_details as imgd ON u.user_id = imgd.resident_id LEFT JOIN image_prediction_response as impr ON imgd.image_details_id = impr.image_details_table_id where u.user_type= 6 and f.facility_id=? and imgd.created_date=?";

//     let results = await runQuery(sql, [facilityId, dateFilter]);
//     let length = results.length;
//     if (length != 0) {
//       for (i = 0; i < length; i++) {
//         let result = results[i];
//         const tdeeValues = await getResidentTDEEValue(
//           result.gender,
//           result.current_weight,
//           result.current_height,
//           result.age
//         );
//         const getResidentsTotalCalories = await getTotalcalories(
//           result.user_id,
//           date
//         );
//         // compare the tdee value and getResidentsTotalCalories
//         // calculate the percentage
//         let value = (getResidentsTotalCalories / tdeeValues) * 100;

//         if (value < 95) {
//           //add details to belowoptimal
//           details = {
//             userId: result.user_id,
//             enrolmentId: result.enrolment_id,
//             fullName: result.full_name,
//             facilityId: result.facility_id,
//             facilityName: result.facility_name,
//           };
//           belowOptimalArray.push(details);
//         } else if (value > 105) {
//           // add details to above optimal
//           details = {
//             userId: result.user_id,
//             enrolmentId: result.enrolment_id,
//             fullName: result.full_name,
//             facilityId: result.facility_id,
//             facilityName: result.facility_name,
//           };
//           aboveOptimalArray.push(details);
//         } else {
//           // add details to optimal
//           details = {
//             userId: result.user_id,
//             enrolmentId: result.enrolment_id,
//             fullName: result.full_name,
//             facilityId: result.facility_id,
//             facilityName: result.facility_name,
//           };
//           optimalArray.push(details);
//         }
//       }
//     }
//     console.log(belowOptimalArray, optimalArray, aboveOptimalArray);
//     return {
//       belowOptimalArray,
//       optimalArray,
//       aboveOptimalArray,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// //*get the REE value of a Resident
// const getResidentTDEEValue = async (gender, weight, height, age) => {
//   try {
//     let REE = 0;
//     let TDEE = 1.2; //process.env.TDEE
//     if (gender == 1) {
//       // male
//       REE = 10 * weight + 6.25 * height - 5 * age + 5;
//     } else {
//       // gender ==2
//       REE = 10 * weight + 6.25 * height - 5 * age - 161;
//     }

//     let totalTDEE = REE * TDEE;
//     let details = {
//       TDEE: totalTDEE,
//       fats: totalTDEE * 0.25,
//       proteins: totalTDEE * 0.2,
//       carbs: totalTDEE * 0.55,
//     };

//     console.log(
//       `the total TDEE value is ${totalTDEE} and optimal Ratio of protein value ${details.proteins} fats value ${details.fats} and carbs value ${details.carbs} `
//     );

//     return details;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// //* get total calories
// const getTotalcalories = async (residentId, date) => {
//   try {
//     let totalCalories = 0;
//     let sql =
//       " select impr.json_response from image_prediction_response as impr left join image_details as imgd on  imgd.image_details_id = impr.image_details_table_id  where imgd.resident_id ='" +
//       residentId +
//       "'  and imgd.created_date >= '" +
//       date +
//       "'     and imgd.created_date <= '" +
//       date +
//       " 23:59:59' ";
//     let results = await runQuery(sql);
//     for (i = 0; i < results.length; i++) {
//       let result = results[i];
//       let totalItemsCalories = 0;
//       let jsonResponse = result.json_response;

//       for (j = 0; j < jsonResponse.length; j++) {
//         totalItemsCalories += json_response[i].Nutrition.calories;
//       }
//       console.log(`total items calories of the meal is ${totalItemCalories}`);
//       //foreach loop need to be implement  which returns totalItemsCalories

//       totalCalories += totalItemsCalories;
//       // calculate the no of days and divide the total calories by no of days
//     }
//     // @return average total calories
//   } catch (error) {
//     console.log(error);
//   }
// };

// /*
//  let model = new ResidentsDetailsWithFoodPrediction();
//   model.fill(
//           (userId = result.user_id),
//           (enrolmentId = result.enrolment_id),
//           (fullName = result.full_name),
//           (gender = result.gender),
//           (age = result.age),
//           (currentWeight = result.current_weight),
//           (currentHeight = result.current_height),
//           (facilityId = result.facility_id),
//           (facilityName = result.facility_name),
//           (mealType = result.meal_type),
//           (mealCreatedAt = result.meal_created_at),
//           (nutritionValues = result.nutrition_values)
//         );
//  */
