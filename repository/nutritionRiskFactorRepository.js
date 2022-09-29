const {
  NutritionRiskFactorModel,
} = require("../models/nutritionRiskFactorModel");
let { runQuery, con } = require("../config/database");
const getAllNutritionalRiskFactorsDetails = async (req, res) => {
  let array = [];
  try {
    let query =
      "select `risk_factor_id`, `risk_factor_name` from `resident_nutrition_risk_factors` where status=1";
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new NutritionRiskFactorModel();
        let result = results[i];
        model.fill(
          (riskFactorId = result.risk_factor_id),
          (riskFactorName = result.risk_factor_name),
          (activestatus = result.status),
          (comments = result.comments),
          (createdDate = result.created_date),
          (udatedDate = result.udated_date),
          (createdBy = result.created_by)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return { count, array };
    }
  } catch (error) {
    return false;
  }
};

// 2 post nutritional risk factors
// const insertNutritinalRiskFactorsDetailsRepository = async(req, res)=> {
//   let sql = " insert into `resident_nutrition_risk_factors` "
// }
module.exports = { getAllNutritionalRiskFactorsDetails };
