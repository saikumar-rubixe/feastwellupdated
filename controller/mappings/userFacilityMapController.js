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
        message: "Data Retrieval Failed",
        data: {
          count: 0,
          array: [],
        },
      });
    }
    if (details == null) {
      res.status(200).json({
        success: false,
        message: "Data Retrieval Failed",
        data: {
          count: 0,
          array: [],
        },
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data Retrieved Succesfully",
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

// 6 get details By facility  id
const getUserFacilityDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getUserFacilityDetailsByIdRepository(id, res);
      if (!details || details == null) {
        res.status(200).json({
          success: true,
          message: "No Record Found",
          data: {
            count: 0,
            array: [],
          },
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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

    if (create && create != false) {
      res.status(200).json({
        success: true,
        message:
          "Mapping userid and facility center succes with id : " + create,
        insertId: create,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Mapping Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getUserFacilityDetailsByUserIdRepository(
        id,
        res
      );
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
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
            message: "Updated details succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Update Failed ",
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

// delete
const deleteUserFacilityController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getUserFacilityDetailsByUserIdRepository(
        id,
        res
      );

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteUserFacilityRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Delete succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Delete Failed",
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

// 2 GET  DETAILS BY TABLE ID CONTROLLER
const getUserFacilityDetailByUserIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getUserFacilityDetailsByUserIdRepository(id, res);
      if (!details || details == null) {
        res.status(404).json({
          success: true,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
