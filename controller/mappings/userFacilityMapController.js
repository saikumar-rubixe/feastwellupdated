const {
  getAllUserFacilityDetailsRepository,
  getUserFacilityDetailsByIdRepository,
  createUserFacilityRepository,
  updateUserFacilityRepository,
  deleteUserFacilityRepository,
} = require("../../repository/userFacilityMapRepository");

//1 get all details
const getAllUserFacilityDetailsController = async (req, res) => {
  try {
    let details = await getAllUserFacilityDetailsRepository();
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 2 get details By id
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
          data: {},
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 3 create
const createUserFacilityController = async (req, res) => {
  try {
    const { userId, facilityCenterId, status, createdBy } = req.body;
    let create = await createUserFacilityRepository(
      userId,
      facilityCenterId,
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 4 update
const updateUserFacilityController = async (req, res) => {
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
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { userId, facilityCenterId, status, updatedBy } = req.body;
        const updatedetails = await updateUserFacilityRepository(
          id,
          userId,
          facilityCenterId,
          status,
          updatedBy
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
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(400).json({
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
        res.status(400).json({
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
          res.status(400).json({
            success: false,
            message: "delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  getUserFacilityDetailByIdController,
  getAllUserFacilityDetailsController,
  createUserFacilityController,
  updateUserFacilityController,
  deleteUserFacilityController,
};
