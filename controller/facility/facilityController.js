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
  console.log(`id passed is ${id}`);
  try {
    if (isNaN(id)) {
      console.log("pass id as a number only ");
      res.status(404).json({
        success: false,
        message: "invalid  id passed /undefined",
      });
    } else {
      let details = await getFacilityCenterDetailsByIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
          message: "!Error no data found",
          data: details,
        });
      } else if (details) {
        res.status(200).json({
          success: true,
          message: "data fetched successfully",
          data: details,
        });
      }
    }
  } catch (error) {
    console.log("Controller: catch block error ");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

// 2 get all details
let getAllFacilityCenterDetailsController = async (req, res) => {
  let details = await getAllFacilityCenterDetailsRepository();
  if (!details || details == null) {
    res.status(400).json({
      success: false,
      Message: "no data found or failed to fetch",
    });
  } else {
    res.status(200).json({
      success: true,
      Message: "details fetched succesfully",
      data: details,
    });
  }
};
//3 create controller
let insertFacilityCenterDetailsController = async (req, res) => {
  try {
    console.log(req.body);
    const {
      facilityName,
      headId,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      createdBy,
      address,
      zipcode,
    } = req.body;

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
      res.status(403).json({
        success: false,
        message: "facility center creation failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "facility center created Succesfully with id " + create,
        insertId: create,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

// 4 update controller
let updateFacilityCenterDetailsController = async (req, res) => {
  let id = req.params.id;
  try {
    if (isNaN(id)) {
      console.log("pass id as a number only ");
      res.status(404).json({
        success: false,
        message: "invalid  id passed /undefined for update ",
      });
    } else {
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(400).json({
          success: false,
          message: "!Error no data found with id " + id,
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
          updatedBy,
          address,
          zipcode,
        } = req.body;

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
            message: "!Error no data found",
            data: details,
          });
        } else if (details || details == true) {
          res.status(200).json({
            success: true,
            message: "updated successfully",
          });
        }
      }
    }
  } catch (error) {
    console.log("Controller: catch block error ");
    console.log(error);
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};
// 5 delete  controller
let deleteFacilityCenterDetailsController = async (req, res) => {
  let id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(404).json({
        success: false,
        message: "invalid  id passed /undefined",
      });
    } else {
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(400).json({
          success: false,
          message: "!Error no data found",
        });
      } else if (recordcheck) {
        let details = await deleteFacilityCenterDetailsRepository(id, res);
        if (!details || details == false) {
          res.status(400).json({
            success: false,
            message: "!Error delete failed",
          });
        } else if (details == true) {
          res.status(200).json({
            success: true,
            message: "delete successful",
          });
        }
      }
    }
  } catch (error) {
    console.log("Controller: catch block error ");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
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
