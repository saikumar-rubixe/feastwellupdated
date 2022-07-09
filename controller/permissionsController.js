const {
  getPermissionsDetailByIdRepository,
  getAllPermissionsDetailsRepository,
  createPermissionsRepository,
  updatePermissionsRepository,
  deletePermissionsRepository,
} = require("../repository/permissionsRepository");

//1 get all details
const getAllPermissionsDetailsController = async (req, res) => {
  try {
    let details = await getAllPermissionsDetailsRepository();
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

// 2 get by id
const getPermissionsDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getPermissionsDetailByIdRepository(id, res);
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

// 3 create permission
const createPermissionsController = async (req, res) => {
  try {
    const {
      roleId,
      readAccess,
      writeAccess,
      updateAccess,
      deleteAccess,
      permissionStatus,
    } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createPermissionsRepository(
      roleId,
      readAccess,
      writeAccess,
      updateAccess,
      deleteAccess,
      permissionStatus
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id: " + create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    //  }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

// 4 update permission
const updatePermissionsController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getPermissionsDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const {
          roleId,
          readAccess,
          writeAccess,
          updateAccess,
          deleteAccess,
          permissionStatus,
        } = req.body;
        const updatedetails = await updatePermissionsRepository(
          id,
          roleId,
          readAccess,
          writeAccess,
          updateAccess,
          deleteAccess,
          permissionStatus
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
// 5 delete permission
const deletePermissionsController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getPermissionsDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await deletePermissionsRepository(id, res);
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

// export moules

module.exports = {
  getAllPermissionsDetailsController,
  getPermissionsDetailByIdController,
  createPermissionsController,
  updatePermissionsController,
  deletePermissionsController,
};
