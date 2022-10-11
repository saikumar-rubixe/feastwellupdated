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
        message: "Invalid  ID",
      });
    } else {
      let details = await getFacilityCenterDetailsByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "Record Not Found",
          data: {},
        });
      } else if (details) {
        res.status(200).json({
          success: true,
          message: "Retrieved Facility Successfully",
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

// 2 get all details
let getAllFacilityCenterDetailsController = async (req, res) => {
  try {
    const status = req.query.status;

    let details = await getAllFacilityCenterDetailsRepository(status);
    if (!details || details == null) {
      res.status(200).json({
        success: false,
        Message: "Record Not Found",
        data: details,
      });
    } else {
      res.status(200).json({
        success: true,
        Message: "Retrieved Facilities Succesfully",
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
        message: "Facility Creation Failed",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Facility Created Succesfully",
        insertId: create,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No Facility Found",
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
            message: "No Facility Found",
            data: details,
          });
        } else if (details || details == true) {
          res.status(200).json({
            success: true,
            message: "Updated Successfully",
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
// 5 delete  controller
let deleteFacilityCenterDetailsController = async (req, res) => {
  let id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No Facility Found",
        });
      } else if (recordcheck) {
        let details = await deleteFacilityCenterDetailsRepository(id, res);
        if (!details || details == false) {
          res.status(404).json({
            success: false,
            message: "Delete Failed",
          });
        } else if (details == true) {
          res.status(200).json({
            success: true,
            message: "Deleted Successfully",
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

module.exports = {
  getFacilityCenterDetailsByIdController,
  getAllFacilityCenterDetailsController,
  insertFacilityCenterDetailsController,
  updateFacilityCenterDetailsController,
  deleteFacilityCenterDetailsController,
};
