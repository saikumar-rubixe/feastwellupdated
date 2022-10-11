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
  insertResidentCarePlanDetailsRepository,
  getAllResidentCarePlanDetailsRepository,
  getResidentCarePlanDetailByIdRepository,
  updateResidentCarePlanDetailRepository,
  deleteResidentCarePlanDetailByIdrepository,
} = require("../../repository/residentCarePlanRepository");

// 1 create resident
const insertResidentCarePlanDetailsController = async (req, res) => {
  try {
    const createdBy = req.userIdValue;

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

    const create = await insertResidentCarePlanDetailsRepository(
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
    );
    if (create) {
      res.status(201).json({
        success: true,
        message: "Data Created Succesfully",
        data: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "Insertion Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// 2 get all resident additonal details  controller
const getallResidentCarePlanDetailsController = async (req, res) => {
  try {
    let details = await getAllResidentCarePlanDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "Data Retrieval Failed",
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data Retrieved Successfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// 3 get detail By Id
const getResidentCarePlanDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getResidentCarePlanDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (details) {
        res.status(200).json({
          success: true,
          message: "Data Retrieved Successfully",
          data: details,
        });
      }
    }
  } catch (error) {}
};

// update resident additional details controller
const updateResidentCarePlanDetailsController = async (req, res) => {
  const id = req.params.userId;
  const updatedBy = req.userIdValue;

  try {
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

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getResidentCarePlanDetailByIdRepository(
        id,
        res
      );
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await updateResidentCarePlanDetailRepository(
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
        );
        console.log(`update details are ${updatedetails}`); //delete
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated Details Succesfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Update Failed",
            data: updatedetails,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong" + error,
    });
  }
};

// 5 delete resident  care plan details controller
const deleteResidentCarePlanDetailsController = async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      let recordcheck = await getResidentCarePlanDetailByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No data Found",
        });
      } else if (recordcheck) {
        let details = await deleteResidentCarePlanDetailByIdrepository(id, res);
        if (!details || details == false) {
          res.status(404).json({
            success: false,
            message: "Delete Failed",
          });
        } else if (details == true) {
          res.status(200).json({
            success: true,
            message: "Deleted successful",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//
module.exports = {
  insertResidentCarePlanDetailsController,
  getallResidentCarePlanDetailsController,
  getResidentCarePlanDetailByIdController,
  updateResidentCarePlanDetailsController,
  deleteResidentCarePlanDetailsController,
};
