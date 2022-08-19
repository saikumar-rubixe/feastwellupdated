const {
  getAllUserFacilityDetailsRepository,
  getUserFacilityDetailsByIdRepository,
  createUserFacilityRepository,
  updateUserFacilityRepository,
  deleteUserFacilityRepository,
  getUserFacilityDetailsByTableIdRepository,
  getUserFacilityDetailsByUserIdRepository,
} = require("../../repository/userFacilityMapRepository");

//1 get all details
const getAllUserFacilityDetailsController = async (req, res) => {
  try {
    let details = await getAllUserFacilityDetailsRepository();
    if (!details || details == false) {
      res.status(200).json({
        success: false,
        message: "data retrieval failed",
        data: {
          count: 0,
          array: [],
        },
      });
    }
    if (details == null) {
      res.status(200).json({
        success: false,
        message: "data retrieval failed",
        data: {
          count: 0,
          array: [],
        },
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "data retrieve succesfully",
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

// 6 get details By facility  id
const getUserFacilityDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getUserFacilityDetailsByIdRepository(id, res);
      if (!details || details == null) {
        res.status(200).json({
          success: true,
          message: "No record found with id " + id,
          data: {
            count: 0,
            array: [],
          },
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 1 create  facility and user id mapping details
const createUserFacilityController = async (req, res) => {
  try {
    const { userId, facilityId, status } = req.body;
    const createdBy = req.userIdValue;
    let create = await createUserFacilityRepository(
      userId,
      facilityId,
      status,
      createdBy
    );
    console.log(`crate is ${create}`);
    if (create && create != false) {
      res.status(200).json({
        success: true,
        message:
          "mapping userid and facility center succes with id : " + create,
        insertId: create,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "mapping failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 4 update the details {facilityId} of userId by user Id
const updateUserFacilityByUserIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getUserFacilityDetailsByUserIdRepository(
        id,
        res
      );
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { facilityId, status } = req.body;
        const updatedBy = req.userIdValue;
        const updatedetails = await updateUserFacilityRepository(
          id,
          facilityId,
          status,
          updatedBy
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "update Failed ",
          });
        }
      }
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

// delete
const deleteUserFacilityController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getUserFacilityDetailsByIdController(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteUserFacilityRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "delete Failed ",
          });
        }
      }
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

// 2 GET  DETAILS BY TABLE ID CONTROLLER
const getUserFacilityDetailByUserIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getUserFacilityDetailsByUserIdRepository(id, res);
      if (!details || details == null) {
        res.status(404).json({
          success: true,
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};
// 3 UPDATE TABLE DETAILS BY TABLE ID CONTROLLER
// 4 DELETE DETAILS BY TABLE ID CONTROLLER

module.exports = {
  getUserFacilityDetailByIdController,
  getAllUserFacilityDetailsController,
  createUserFacilityController,
  updateUserFacilityByUserIdController,
  deleteUserFacilityController,
  getUserFacilityDetailByUserIdController,
};
