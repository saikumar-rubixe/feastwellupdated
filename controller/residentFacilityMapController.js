const {
  getAllResidentFacilityDetailsRepository,
  getResidentFacilityDetailsByIdController,
  createResidentFacilityRepository,
  updateResidentFacilityRepository,
  deleteResidentFacilityRepository,
} = require("../repository/residentFacilityMapRepository");

//1 get all details
const getAllResidentFacilityDetailsController = async (req, res) => {
  try {
    let details = await getAllResidentFacilityDetailsRepository();
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

// 2 get details By id
const getResidentFacilityDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getResidentFacilityDetailsByIdController(id, res);
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

// 3 create
const createResidentFacilityController = async (req, res) => {
  try {
    const { userId, facilityCenterId, status, createdBy } = req.body;
    let crate = await createResidentFacilityRepository(
      userId,
      facilityCenterId,
      status,
      createdBy
    );
    console.log(`crate is ${crate}`);
    if (crate && crate != false) {
      res.status(200).json({
        success: true,
        message: "mapping userid and facility center succes with id : " + crate,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "mapping failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// 4 update
const updateResidentFacilityController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getResidentFacilityDetailsByIdController(
        id,
        res
      );
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { userId, facilityCenterId, status, updatedBy } = req.body;
        const updatedetails = await updateResidentFacilityRepository(
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
  }
};

// delete
const deleteResidentFacilityController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getResidentFacilityDetailsByIdController(
        id,
        res
      );

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await deleteResidentFacilityRepository(id, res);
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
  }
};

module.exports = {
  getResidentFacilityDetailByIdController,
  getAllResidentFacilityDetailsController,
  createResidentFacilityController,
  updateResidentFacilityController,
  deleteResidentFacilityController,
};