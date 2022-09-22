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
  insertResindentBasicDetailsRepository,
  insertResidentDetailsRepository,
  getAllResidentDetailsRepository,
  getResidentDetailByIdRepository,
  updateResidentDetailRepository,
} = require("../../repository/residentRepository");

// 1 create resident
const insertResidentDetailsController = async (req, res) => {
  try {
    console.log(`consoling the request body `); //delete
    console.log(req.body);
    console.log(`*****************************`); //delete
    const { userId, createdBy, updatedBy } = req.userIdValue;
    const fullName = req.body.name;
    // create user details in users table with name and status only
    //return the enrolment id and user created Id
    let createUser = await insertResindentBasicDetailsRepository(
      fullName,
      createdBy,
      updatedBy
    );
    if (createUser == false) {
      res.status(400).json({
        success: false,
        message: "record insertion failed halted further ",
      });
    }
    let userTableInsertedId = createUser.insertId; //insert id of users table
    const {
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
      bmi,
      averageWt,
      idealBodyWeightRange,
      calorieNeeds,
      fluidNeeds,
      proteinNeeds,
      proteinNeedsValue,
      carePlans,
      recommendations,
    } = req.body;
    const nutritionalRiskFactors = JSON.stringify(
      req.body.nutritionalRiskFactors
    );

    console.log(`paases the string value`);
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
      proteinNeedsValue,
      carePlans,
      recommendations
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id : " + create,
        data: create,
        userId: userTableInsertedId,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "insertion  failed",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 2 get all resident additonal details  controller
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 3 get detail By Id
const getResidentDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getResidentDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
          message: "No record found with id " + id,
        });
      }
      if (details) {
        res.status(200).json({
          success: true,
          message: "data retrieved succesfully",
          data: details,
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something went wrong!");
  }
};

// update resident additional details controller
const updateResidentDetailsController = async (req, res) => {
  const id = req.params.userId;
  console.log(`checking the user id passed`);
  console.log(id);
  const {
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
  } = req.body;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getResidentDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await updateResidentDetailRepository(
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
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "update Failed ",
            data: updatedetails,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

//
module.exports = {
  insertResidentDetailsController,
  getallResidentDetailsController,
  getResidentDetailByIdController,
  updateResidentDetailsController,
};
