let { runQuery } = require("../config/database");
let { ResidentModel } = require("../models/residentModel");
let SqlString = require("sqlstring");
// 1 create resident addittional details
const insertResidentDetailsRepository = async (
  userId,
  name,
  gender,
  dob,
  age,
  address,
  familyContact,
  enrollmentDate,
  intialWeight,
  currentWeight,
  physician,
  diagnosis,
  foodAllergy,
  medications,
  nutritionalSupplements,
  laxatives,
  naturalLaxatives,
  significantlabData,
  monthlyGroceryBudget,
  currentHeight,
  usualWeight,
  waistCircumference,
  weightHistory,
  appetiteFoodIntake,
  chewing,
  swallowing,
  fluidIntake,
  dentition,
  sight,
  communication,
  comprehension,
  bowelFunction,
  mobility,
  dexterity,
  feeding,
  specialNeeds,
  foodPreferences,
  nutritionalRiskFactors,
  bmi,
  averageWt,
  idealBodyWeightRange,
  calorieNeeds,
  fluidNeeds,
  proteinNeeds,
  proteinNeedsValue,
  carePlans,
  recommendations
) => {
  try {
    let query =
      "INSERT into `residents_details` (`user_id`,      `name`,      `gender`,      `dob`,      `age`,      `address`,      `family_contact`,      `enrollment_date`,      `intial_weight`,      `current_weight`,      `physician`,      `diagnosis`,      `food_allergy`,      `medications`,      `nutritional_supplements`,      `laxatives`,      `natural_laxatives`,      `significant_lab_data`,      `monthly_grocery_budget`,      `current_height`,      `usual_weight`,           `waist_circumference`,      `weight_history`,                            `appetite_food_intake`,      `chewing`,      `swallowing`,      `fluid_intake`,      `dentition`,      `sight`,      `communication`,      `comprehension`,      `bowel_function`,      `mobility`,      `dexterity`,      `feeding`,      `special_needs`,      `food_preferences`,      `nutritional_risk_factors` ,`bmi`,`average_wt`,`ideal_body_weight_range`,  `calorie_needs`,`fluid_needs`, `protein_needs`,`protein_needs_value`,`care_plans`,`recommendations`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";

    let results = await runQuery(query, [
      userId,
      name,
      gender,
      dob,
      age,
      address,
      familyContact,
      enrollmentDate,
      intialWeight,
      currentWeight,
      physician,
      diagnosis,
      foodAllergy,
      medications,
      nutritionalSupplements,
      laxatives,
      naturalLaxatives,
      significantlabData,
      monthlyGroceryBudget,
      currentHeight,
      usualWeight,
      waistCircumference,
      weightHistory,
      appetiteFoodIntake,
      chewing,
      swallowing,
      fluidIntake,
      dentition,
      sight,
      communication,
      comprehension,
      bowelFunction,
      mobility,
      dexterity,
      feeding,
      specialNeeds,
      foodPreferences,
      nutritionalRiskFactors,
      bmi,
      averageWt,
      idealBodyWeightRange,
      calorieNeeds,
      fluidNeeds,
      proteinNeeds,
      proteinNeedsValue,
      carePlans,
      recommendations,
    ]);

    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 2 get all resident additional details
const getAllResidentDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "select * from `residents_details`";
    // let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new ResidentModel();
        let result = results[i];
        model.fill(
          (id = result.id),
          (userId = result.user_id),
          (name = result.name),
          (gender = result.gender),
          (dob = result.dob),
          (age = result.age),
          (address = result.address),
          (familyContact = result.family_contact),
          (enrollmentDate = result.enrollment_date),
          (intialWeight = result.intial_weight),
          (currentWeight = result.current_height),
          (physician = result.physician),
          (diagnosis = result.diagnosis),
          (foodAllergy = result.food_allergy),
          (medications = result.medications),
          (nutritionalSupplements = result.nutritional_supplements),
          (laxatives = result.laxatives),
          (naturalLaxatives = result.natural_laxatives),
          (significantlabData = result.significant_lab_data),
          (monthlyGroceryBudget = result.monthly_grocery_budget),
          (currentHeight = result.current_height),
          (usualWeight = result.usual_weight),
          (waistCircumference = result.waist_circumference),
          (weightHistory = result.weight_history),
          (appetiteFoodIntake = result.appetite_food_intake),
          (chewing = result.chewing),
          (swallowing = result.swallowing),
          (fluidIntake = result.fluid_intake),
          (dentition = result.dentition),
          (sight = result.sight),
          (communication = result.communication),
          (comprehension = result.comprehension),
          (bowelFunction = result.bowel_function),
          (mobility = result.mobility),
          (dexterity = result.dexterity),
          (feeding = result.feeding),
          (specialNeeds = result.special_needs),
          (foodPreferences = result.food_preferences),
          (nutritionalRiskFactors = result.nutritional_risk_factors),
          (bmi = result.bmi),
          (averageWt = result.average_wt),
          (idealBodyWeightRange = result.ideal_body_weight_range),
          (calorieNeeds = result.calorie_needs),
          (fluidNeeds = result.fluid_needs),
          (proteinNeeds = result.protein_needs),
          (proteinNeedsValue = result.protein_needs_value),
          (carePlans = result.care_plans),
          (recommendations = result.recommendations)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 3 get detail By Id
const getResidentDetailByIdRepository = async (id, res) => {
  console.log(`in to the get detail by id folder`);
  try {
    let query = "select * from `residents_details`  where user_id=?";
    let results = await runQuery(query, [id]);
    console.log(`*****************************`);
    console.log(query.sql);
    console.log(`*****************************`);
    if (results.length != 0) {
      let result = results[0];
      let model = new ResidentModel();
      model.fill(
        (id = result.id),
        (userId = result.user_id),
        (name = result.name),
        (gender = result.gender),
        (dob = result.dob),
        (age = result.age),
        (address = result.address),
        (familyContact = result.family_contact),
        (enrollmentDate = result.enrollment_date),
        (intialWeight = result.intial_weight),
        (currentWeight = result.current_height),
        (physician = result.physician),
        (diagnosis = result.diagnosis),
        (foodAllergy = result.food_allergy),
        (medications = result.medications),
        (nutritionalSupplements = result.nutritional_supplements),
        (laxatives = result.laxatives),
        (naturalLaxatives = result.natural_laxatives),
        (significantlabData = result.significant_lab_data),
        (monthlyGroceryBudget = result.monthly_grocery_budget),
        (currentHeight = result.current_height),
        (usualWeight = result.usual_weight),
        (waistCircumference = result.waist_circumference),
        (weightHistory = result.weight_history),
        (appetiteFoodIntake = result.appetite_food_intake),
        (chewing = result.chewing),
        (swallowing = result.swallowing),
        (fluidIntake = result.fluid_intake),
        (dentition = result.dentition),
        (sight = result.sight),
        (communication = result.communication),
        (comprehension = result.comprehension),
        (bowelFunction = result.bowel_function),
        (mobility = result.mobility),
        (dexterity = result.dexterity),
        (feeding = result.feeding),
        (specialNeeds = result.special_needs),
        (foodPreferences = result.food_preferences),
        (nutritionalRiskFactors = result.nutritional_risk_factors),
        (bmi = result.bmi),
        (averageWt = result.average_wt),
        (idealBodyWeightRange = result.ideal_body_weight_range),
        (calorieNeeds = result.calorie_needs),
        (fluidNeeds = result.fluid_needs),
        (proteinNeeds = result.protein_needs),
        (proteinNeedsValue = result.protein_needs_value),
        (carePlans = result.care_plans),
        (recommendations = result.recommendations)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 4  update resident addiitonal details  by user Id
const updateResidentDetailRepository = async (
  id,
  name,
  gender,
  dob,
  age,
  address,
  familyContact,
  enrollmentDate,
  intialWeight,
  currentWeight,
  physician,
  diagnosis,
  foodAllergy,
  medications,
  nutritionalSupplements,
  laxatives,
  naturalLaxatives,
  significantlabData,
  monthlyGroceryBudget,
  currentHeight,
  usualWeight,
  waistCircumference,
  weightHistory,
  appetiteFoodIntake,
  chewing,
  swallowing,
  fluidIntake,
  dentition,
  sight,
  communication,
  comprehension,
  bowelFunction,
  mobility,
  dexterity,
  feeding,
  specialNeeds,
  foodPreferences,
  nutritionalRiskFactors,
  bmi,
  averageWt,
  idealBodyWeightRange,
  calorieNeeds,
  fluidNeeds,
  proteinNeeds,
  proteinNeedsValue,
  carePlans,
  recommendations
) => {
  try {
    let query =
      " UPDATE `residents_details` set `name`=?,`gender`=?,`dob`=?,`age`=?,`address`=?,`family_contact`=?,`enrollment_date`=?,`intial_weight`=?,`current_weight`=?,`physician`=?,`diagnosis`=?,`food_allergy`=?,`medications`=?,`nutritional_supplements`=?,`laxatives`=?,`natural_laxatives`=?,`significant_lab_data`=?,`monthly_grocery_budget`=?,`current_height`=?,`usual_weight`=?,`waist_circumference`=?,`weight_history`=?,`appetite_food_intake`=?,`chewing`=?,`swallowing`=?,`fluid_intake`=?,`dentition`=?,`sight`=?,`communication`=?,`comprehension`=?,`bowel_function`=?,`mobility`=?,`dexterity`=?,`feeding`=?,`special_needs`=?,`food_preferences`=?,`nutritional_risk_factors`=?,`bmi`=?,`average_wt`=?,`ideal_body_weight_range`=?,`calorie_needs`=?,`fluid_needs`=?,`protein_needs`=?,`protein_needs_value`=?,`care_plans`=?,`recommendations`=? where user_id =?";

    let results = await runQuery(query, [
      name,
      gender,
      dob,
      age,
      address,
      familyContact,
      enrollmentDate,
      intialWeight,
      currentWeight,
      physician,
      diagnosis,
      foodAllergy,
      medications,
      nutritionalSupplements,
      laxatives,
      naturalLaxatives,
      significantlabData,
      monthlyGroceryBudget,
      currentHeight,
      usualWeight,
      waistCircumference,
      weightHistory,
      appetiteFoodIntake,
      chewing,
      swallowing,
      fluidIntake,
      dentition,
      sight,
      communication,
      comprehension,
      bowelFunction,
      mobility,
      dexterity,
      feeding,
      specialNeeds,
      foodPreferences,
      nutritionalRiskFactors,
      bmi,
      averageWt,
      idealBodyWeightRange,
      calorieNeeds,
      fluidNeeds,
      proteinNeeds,
      proteinNeedsValue,
      carePlans,
      recommendations,
      id,
    ]);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};
module.exports = {
  insertResidentDetailsRepository,
  getAllResidentDetailsRepository,
  getResidentDetailByIdRepository,
  updateResidentDetailRepository,
};
