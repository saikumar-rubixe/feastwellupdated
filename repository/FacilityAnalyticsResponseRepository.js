const { parseJSON } = require("date-fns");
let { runQuery } = require("../config/database");
require("../models/residentsCalorieValuesModel");

//**  get all details
const facilityAnalyticsResponseRepsitory = async (facilityId, dateFilter) => {
  try {
    console.log(`in to the repository to get tdee values`);
    //*create aray
    let list = [];

    //^ create an empty array list
    let belowOptimalArray = [];
    let optimalArray = [];
    let aboveOptimalArray = [];

    //* run query with facility id as details
    let sql =
      "select u.* , rd.gender, rd.age,rd.current_weight,rd.current_height, f.facility_id,f.facility_name from users as u INNER JOIN residents_details as rd ON u.user_id = rd.user_id INNER JOIN user_facility_map as ufm ON u.user_id = ufm.user_id INNER JOIN facility as f ON ufm.facility_id = f.facility_id INNER JOIN image_details as imgd ON u.user_id = imgd.resident_id INNER JOIN image_prediction_response as impr ON imgd.image_details_id = impr.image_details_table_id where u.user_type= 6  and imgd.created_date >= '" +
      dateFilter +
      " 00:00:00' " +
      "and imgd.created_date <= '" +
      dateFilter +
      " 23:59:59'";

    if (facilityId) {
      console.log(` the facility id is ${facilityId}`);
      sql += "  and f.facility_id=" + facilityId;
    }
    sql += "  group by u.user_id";
    console.log(sql);
    let results = await runQuery(sql);
    //console.log(sql);
    console.log(`the query is `);
    //console.log("test resident " + sql);
    let length = results.length;
    // console.log(`the lenght of results is ${length}`);

    //*check the length is not zero
    if (length != 0) {
      for (i = 0; i < length; i++) {
        let indResult = results[i];
        console.log("individual result");
        console.log(indResult);
        let data = {
          userStatus: indResult.status,
          userId: indResult.user_id,
          fullName: indResult.full_name,
          username: indResult.username,
          userType: indResult.user_type,
          updatedDate: indResult.updated_date,
          createdDate: indResult.created_date,
          facilityId: indResult.facility_id,
          facilityName: indResult.facility_name,
        };
        //! inside 1st for loop
        let result = results[i];

        //^ calling the function to get TDEE value
        console.log(`calling the function to get TDEE value`);
        const tdeeValues = await getResidentTDEEValue(
          result.gender,
          result.current_weight,
          result.current_height,
          result.age
        );

        console.log(tdeeValues);
        //^ calling th function to get total calories
        const getResidentsTotalCalories = await getTotalcalories(
          result.user_id,
          dateFilter
        );
        //* compare the tdee value and getResidentsTotalCalories
        //* calculate the percentage
        let value = (getResidentsTotalCalories / tdeeValues.TDEE) * 100;
        console.log(
          `the tdee values ${tdeeValues} and the residents values is ${getResidentsTotalCalories} percentage value is ${value}`
        );

        //!TODO below optimal
        if (value < 95) {
          //add details to belowoptimal

          belowOptimalArray.push(data);
        } else if (value > 105) {
          // add details to above optimal

          aboveOptimalArray.push(data);
        } else if (value > 95 && value < 105) {
          // add details to optimal
          optimalArray.push(data);
        }
      }
    }
    //* 1 below optimal obj
    let belowOptimalHead = {
      statusId: 1,
      statusName: "Below Optimal List",
      hexColor: "#4a00b5",
      data: belowOptimalArray,
    };

    //* 2 optimal array
    let OptimalHead = {
      statusId: 1,
      statusName: "Optimal List",
      hexColor: "#127112",
      data: optimalArray,
    };

    //* 3 above optima array
    let aboveOptimalHead = {
      statusId: 1,
      statusName: "Above Optimal List",
      hexColor: "#dd2020",
      data: aboveOptimalArray,
    };

    finalArray = [];
    finalArray.push(belowOptimalHead);
    finalArray.push(OptimalHead);
    finalArray.push(aboveOptimalHead);

    return finalArray;
  } catch (error) {
    //! error case
    console.log(error);
    return false;
  }
};

//*get the REE value of a Resident
const getResidentTDEEValue = async (gender, weight, height, age) => {
  console.log(`in the tdee value function`);
  try {
    let REE = 0;
    let TDEE = 1.2; //process.env.TDEE
    if (gender == 1) {
      // male
      REE = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      // gender ==2
      REE = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let totalTDEE = REE * TDEE;
    let details = {
      TDEE: totalTDEE,
      fats: totalTDEE * 0.25,
      proteins: totalTDEE * 0.2,
      carbs: totalTDEE * 0.55,
    };

    console.log(
      `the total TDEE value is ${totalTDEE} and optimal Ratio of protein value ${details.proteins} fats value ${details.fats} and carbs value ${details.carbs} `
    );

    return details;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* get total calories
const getTotalcalories = async (residentId, dateFilter) => {
  console.log(`Date filter ${dateFilter}`);
  try {
    let totalCalories = 0;
    let sql =
      " select impr.json_response from image_prediction_response as impr inner join image_details as imgd on  imgd.image_details_id = impr.image_details_table_id  where imgd.resident_id ='" +
      residentId +
      "'" +
      " and imgd.created_date >= '" +
      dateFilter +
      "'     and imgd.created_date <= '" +
      dateFilter +
      " 23:59:59' ";

    console.log(`sql query with join: ${sql}`);
    let results = await runQuery(sql);
    console.log("testtt " + results.length);
    // console.log(results.length);
    // console.log(results);
    for (var i = 0; i < results.length; i++) {
      let resultArray = results[i].json_response;
      let resultArrayJson = JSON.parse(resultArray);
      for (var j = 0; j < resultArrayJson.length; j++) {
        var meal = resultArrayJson[j];
        totalCalories += meal.Nutrition.calories;
      }
    }
    // @return average total calories
    console.log(`returning the total calories ${totalCalories}`);
    return totalCalories;
  } catch (error) {
    console.log(error);
  }
};

/*
 let model = new ResidentsDetailsWithFoodPrediction();
  model.fill(
          (userId = result.user_id),
          (enrolmentId = result.enrolment_id),
          (fullName = result.full_name),
          (gender = result.gender),
          (age = result.age),
          (currentWeight = result.current_weight),
          (currentHeight = result.current_height),
          (facilityId = result.facility_id),
          (facilityName = result.facility_name),
          (mealType = result.meal_type),
          (mealCreatedAt = result.meal_created_at),
          (nutritionValues = result.nutrition_values)
        );
 */

module.exports = {
  facilityAnalyticsResponseRepsitory,
};
