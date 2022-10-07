/**facility controller is to add the new  facility adn update delete and get details 
 * params are  facilityCenterId,
    name,
    headId,
    email,
    number,
    countryId,
    stateId,
    cityId,
    facilityStatus,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy
    1. get details by id
*/

const {
  getFacilityCenterDetailsByIdRepository,
  getAllFacilityCenterDetailsRepository,
  insertFacilityCenterDetailsRepository,
  updateFacilityCenterDetailsRepository,
  deleteFacilityCenterDetailsRepository,
} = require("../../repository/facilityCenterRepository");

// 1 get details by id
let getFacilityCenterDetailsByIdController = async (req, res) => {
  let id = req.params.id;

  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid  id passed /undefined",
      });
    } else {
      let details = await getFacilityCenterDetailsByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No data found",
          data: {},
        });
      } else if (details) {
        res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          data: details,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Something went wrong cb cont ",
    });
  }
};

// 2 get all details
let getAllFacilityCenterDetailsController = async (req, res) => {
  try {
    const status = req.query.status;

    let details = await getAllFacilityCenterDetailsRepository(status);
    if (!details || details == null) {
      res.status(200).json({
        success: false,
        Message: "No data found",
        data: details,
      });
    } else {
      res.status(200).json({
        success: true,
        Message: "Details fetched succesfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
//3 create controller
let insertFacilityCenterDetailsController = async (req, res) => {
  try {
    const {
      facilityName,
      headId,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      address,
      zipcode,
    } = req.body;
    const createdBy = req.userIdvalue;
    const create = await insertFacilityCenterDetailsRepository(
      facilityName,
      headId,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      createdBy,
      address,
      zipcode
    );

    if (!create || create == null) {
      res.status(404).json({
        success: false,
        message: "Facility center creation failed",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Facility center created Succesfully with id " + create,
        insertId: create,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// 4 update controller
let updateFacilityCenterDetailsController = async (req, res) => {
  let id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid  id passed /undefined for update ",
      });
    } else {
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No data found with id " + id,
        });
      } else if (recordcheck) {
        const {
          facilityName,
          //headId,
          number,
          countryId,
          stateId,
          cityId,
          facilityStatus,

          address,
          zipcode,
        } = req.body;
        const updatedBy = req.userIdvalue;
        let headId = null;
        let details = await updateFacilityCenterDetailsRepository(
          id,
          facilityName,
          headId,
          number,
          countryId,
          stateId,
          cityId,
          facilityStatus,
          updatedBy,
          address,
          zipcode,
          res
        );

        if (!details || details == false) {
          res.status(400).json({
            success: false,
            message: "No data found",
            data: details,
          });
        } else if (details || details == true) {
          res.status(200).json({
            success: true,
            message: "Updated successfully",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// 5 delete  controller
let deleteFacilityCenterDetailsController = async (req, res) => {
  let id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid  id passed /undefined",
      });
    } else {
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No data found",
        });
      } else if (recordcheck) {
        let details = await deleteFacilityCenterDetailsRepository(id, res);
        if (!details || details == false) {
          res.status(404).json({
            success: false,
            message: "Delete failed",
          });
        } else if (details == true) {
          res.status(200).json({
            success: true,
            message: "Deleted successfully",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getFacilityCenterDetailsByIdController,
  getAllFacilityCenterDetailsController,
  insertFacilityCenterDetailsController,
  updateFacilityCenterDetailsController,
  deleteFacilityCenterDetailsController,
};
