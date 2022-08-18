const {
  getRolesDetailByIdRepository,
  getAllRolesDetailsRepository,
  createRoleRepository,
  updateRolesRepository,
  deleteRolesRepository,
} = require("../../repository/rolesRepository");

// 1 get by id
const getRolesDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getRolesDetailByIdRepository(id, res);
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//2 get all details
const getAllRolesDetailsController = async (req, res) => {
  try {
    let details = await getAllRolesDetailsRepository(req, res);
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

// 3 create
const createRolesController = async (req, res) => {
  try {
    const { roleName, userTypeId, roleStatus } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createRoleRepository(roleName, userTypeId, roleStatus);
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    //}
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};
//4 update
const updateRolesController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getRolesDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const {
          roleName,

          userTypeId,
          roleStatus,
        } = req.body;
        const updatedetails = await updateRolesRepository(
          id,
          roleName,

          userTypeId,
          roleStatus
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// delete
const deleteRolesController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getRolesDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteRolesRepository(id, res);
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  getRolesDetailByIdController,
  getAllRolesDetailsController,
  createRolesController,
  updateRolesController,
  deleteRolesController,
};