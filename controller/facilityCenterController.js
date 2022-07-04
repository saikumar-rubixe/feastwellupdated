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
} = require("../repository/facilityCenterRepository");

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
      if (!details || details == null) {
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
    const {
      facilityName,
      // headId,
      email,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus,
      // createdBy,
    } = req.body;
    const create = await insertFacilityCenterDetailsRepository(
      facilityName,
      // headId,
      email,
      number,
      countryId,
      stateId,
      cityId,
      facilityStatus
      //createdBy
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
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Controller:catch block error",
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
      // console.log(recordcheck);
      if (!recordcheck || recordcheck == false) {
        res.status(400).json({
          success: false,
          message: "!Error no data found with id " + id,
        });
      } else if (recordcheck) {
        const {
          facilityName,
          headId,
          email,
          number,
          countryId,
          stateId,
          cityId,
          facilityStatus,
          updatedBy,
        } = req.body;

        let details = await updateFacilityCenterDetailsRepository(
          id,
          facilityName,
          headId,
          email,
          number,
          countryId,
          stateId,
          cityId,
          facilityStatus,
          updatedBy,
          res
        );
        //  console.log(details);

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
    res.status(404).json({
      success: false,
      message: "Controller:catch block error",
    });
  }
};
// 5 delete  controller
let deleteFacilityCenterDetailsController = async (req, res) => {
  let id = req.params.id;
  try {
    console.log("in controller try block ");
    if (isNaN(id)) {
      console.log("pass only number as id  ");
      res.status(404).json({
        success: false,
        message: "invalid  id passed /undefined",
      });
    } else {
      console.log("in controller before recordCheck ");
      let recordcheck = await getFacilityCenterDetailsByIdRepository(id, res);
      console.log(recordcheck);
      console.log("AFTER RECORD CHECK ");
      if (!recordcheck || recordcheck == false) {
        console.log("IF CONDITION RECORD CHECK ");
        res.status(400).json({
          success: false,
          message: "!Error no data found",
        });
      } else if (recordcheck) {
        console.log("ELSE CONDIITION RECORD CHECK ");
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
  }
};

module.exports = {
  getFacilityCenterDetailsByIdController,
  getAllFacilityCenterDetailsController,
  insertFacilityCenterDetailsController,
  updateFacilityCenterDetailsController,
  deleteFacilityCenterDetailsController,
};
