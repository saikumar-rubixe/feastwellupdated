/**
 1 create user (name,username,password, facility,status,detailsStatus,userType,enrolementId)
 2 login with username and password ( check pwd and status details == 1 )
 3 check detailsStatus  { 
  if detailsStatus == 0  call 4 
  if detailsStatus == 1 call 5 
    }
 4 update the userdetails (additional details) and change detailsStatus ==1 
 5 set role id based on userType
 6 check the menu id access and allow accordingly
 7 view access is enabled by default 
 8 any RWD  access reuested check permisiions table -> access_id and act accordingly
 
 */
const {
  insertResidentDetailsRepository,
  getAllResidentDetailsRepository,
} = require("../../repository/residentRepository");

const insertResidentDetailsController = async (req, res) => {
  try {
    const {
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
      carePlans,
      recommendations,
    } = req.body;
    const create = await insertResidentDetailsRepository(
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
      carePlans,
      recommendations
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        data: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

const getallResidentDetailsController = async (req, res) => {
  try {
    let details = await getAllResidentDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "data retrieved succesfully",
        data: details,
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};
module.exports = {
  insertResidentDetailsController,
  getallResidentDetailsController,
};
