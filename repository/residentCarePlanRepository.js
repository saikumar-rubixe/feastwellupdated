let { runQuery } = require("../config/database");
let { ResidentCrePlanModel } = require("../models/residentCarePlanModel");
const { getPstDate } = require("../helper/getCanadaTime");
const { enrollementIdTag } = require("../helper/enrollmentIDGenerator");

/**1  insert the reidents additional details into resident details
 *
 * @param {*} userId
 * @param {*} name
 * @param {*} gender
 * @param {*} dob
 * @param {*} age
 * @param {*} address
 * @param {*} familyContact
 * @param {*} enrollmentDate
 * @param {*} intialWeight
 * @param {*} currentWeight
 * @param {*} physician
 * @param {*} diagnosis
 * @param {*} foodAllergy
 * @param {*} medications
 * @param {*} nutritionalSupplements
 * @param {*} laxatives
 * @param {*} naturalLaxatives
 * @param {*} significantlabData
 * @param {*} monthlyGroceryBudget
 * @param {*} currentHeight
 * @param {*} usualWeight
 * @param {*} waistCircumference
 * @param {*} weightHistory
 * @param {*} appetiteFoodIntake
 * @param {*} chewing
 * @param {*} swallowing
 * @param {*} fluidIntake
 * @param {*} dentition
 * @param {*} sight
 * @param {*} communication
 * @param {*} comprehension
 * @param {*} bowelFunction
 * @param {*} mobility
 * @param {*} dexterity
 * @param {*} feeding
 * @param {*} specialNeeds
 * @param {*} foodPreferences
 * @param {*} nutritionalRiskFactors
 * @param {*} bmi
 * @param {*} averageWt
 * @param {*} idealBodyWeightRange
 * @param {*} calorieNeeds
 * @param {*} fluidNeeds
 * @param {*} proteinNeeds
 * @param {*} proteinNeedsValue
 * @param {*} carePlans
 * @param {*} recommendations
 * @returns  inserted Id
 */
const insertResidentCarePlanDetailsRepository = async (
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
  createdBy
) => {
  try {
    let query =
      "INSERT into `residents_details` (`user_id`,      `name`,      `gender`,      `dob`,      `age`,      `address`,      `family_contact`,      `enrollment_date`,      `intial_weight`,      `current_weight`,      `physician`,      `diagnosis`,      `food_allergy`,      `medications`,      `nutritional_supplements`,      `laxatives`,      `natural_laxatives`,      `significant_lab_data`,      `monthly_grocery_budget`,      `current_height`,      `usual_weight`,           `waist_circumference`,      `weight_history`,                            `appetite_food_intake`,      `chewing`,      `swallowing`,      `fluid_intake`,      `dentition`,      `sight`,      `communication`,      `comprehension`,      `bowel_function`,      `mobility`,      `dexterity`,      `feeding`,      `special_needs`,      `food_preferences`,      `nutritional_risk_factors` ,`bmi`,`average_wt`,`ideal_body_weight_range`,  `calorie_needs`,`fluid_needs`, `protein_needs`,`protein_needs_value`,`care_plans`,`recommendations`,`created_date`,`updated_date`,`created_by`,`updated_by`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";

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
      nutritionalRiskFactors.toString(),
      bmi,
      averageWt,
      idealBodyWeightRange,
      calorieNeeds,
      fluidNeeds,
      proteinNeeds,
      proteinNeedsValue,
      carePlans,
      recommendations,
      getPstDate(),
      getPstDate(),
      createdBy,
      createdBy,
    ]);

    let value = results.insertId;

    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 2 get all resident additional details
const getAllResidentCarePlanDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "select * from `residents_details`";

    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new ResidentCrePlanModel();
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
          (recommendations = result.recommendations),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date),
          (createdBy = result.created_by),
          (updatedBy = result.updated_by)
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

// 3 get detail By Id
const getResidentCarePlanDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `residents_details`  where user_id=?";
    let results = await runQuery(query, [id]);

    if (results.length != 0) {
      let result = results[0];
      let model = new ResidentCrePlanModel();

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
        (recommendations = result.recommendations),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date),
        (createdBy = result.created_by),
        (updatedBy = result.updated_by)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 4  update resident addiitonal details  by user Id
const updateResidentCarePlanDetailRepository = async (
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
  recommendations,
  updatedBy
) => {
  try {
    let query =
      " UPDATE `residents_details` set `name`=?,`gender`=?,`dob`=?,`age`=?,`address`=?,`family_contact`=?,`enrollment_date`=?,`intial_weight`=?,`current_weight`=?,`physician`=?,`diagnosis`=?,`food_allergy`=?,`medications`=?,`nutritional_supplements`=?,`laxatives`=?,`natural_laxatives`=?,`significant_lab_data`=?,`monthly_grocery_budget`=?,`current_height`=?,`usual_weight`=?,`waist_circumference`=?,`weight_history`=?,`appetite_food_intake`=?,`chewing`=?,`swallowing`=?,`fluid_intake`=?,`dentition`=?,`sight`=?,`communication`=?,`comprehension`=?,`bowel_function`=?,`mobility`=?,`dexterity`=?,`feeding`=?,`special_needs`=?,`food_preferences`=?,`nutritional_risk_factors`=?,`bmi`=?,`average_wt`=?,`ideal_body_weight_range`=?,`calorie_needs`=?,`fluid_needs`=?,`protein_needs`=?,`protein_needs_value`=?,`care_plans`=?,`recommendations`=?,`updated_date`=?,`updated_by`=? where user_id =?";

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
      nutritionalRiskFactors.toString(),
      bmi,
      averageWt,
      idealBodyWeightRange,
      calorieNeeds,
      fluidNeeds,
      proteinNeeds,
      proteinNeedsValue,
      carePlans,
      recommendations,
      getPstDate(),
      updatedBy,
      id,
    ]);
    let value = results.affectedRows;

    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// 5 delete residents details
const deleteResidentCarePlanDetailByIdrepository = async (id) => {
  try {
    let query = "delete from residents_details where  user_id =?";
    let results = await runQuery(query, [id]);

    if (results.affectedRows == 1 || results.affectedRows > 0) return true;
    else return false;
  } catch (error) {
    return false;
  }
};
module.exports = {
  insertResidentCarePlanDetailsRepository,
  getAllResidentCarePlanDetailsRepository,
  getResidentCarePlanDetailByIdRepository,
  updateResidentCarePlanDetailRepository,
  deleteResidentCarePlanDetailByIdrepository,
};
