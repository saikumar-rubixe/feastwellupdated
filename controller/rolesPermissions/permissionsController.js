const {
  getPermissionsDetailByIdRepository,
  getAllPermissionsDetailsRepository,
  createPermissionsRepository,
  updatePermissionsRepository,
  deletePermissionsRepository,
} = require("../../repository/permissionsRepository");

//1 get all details
const getAllPermissionsDetailsController = async (req, res) => {
  try {
    let details = await getAllPermissionsDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "Data Retrieval Failed",
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data Retrieved Successfully",
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

// 2 get by id
const getPermissionsDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getPermissionsDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
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

// 3 create permission
const createPermissionsController = async (req, res) => {
  try {
    const {
      roleId,
      menuCategoryId,
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
      menuCategoryId,
      readAccess,
      writeAccess,
      updateAccess,
      deleteAccess,
      permissionStatus
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "Data Created Succesfully",
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "Data Retrieval Failed",
      });
    }
    //  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// 4 update permission
const updatePermissionsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getPermissionsDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const {
          roleId,
          menuCategoryId,
          readAccess,
          writeAccess,
          updateAccess,
          deleteAccess,
          permissionStatus,
        } = req.body;
        const updatedetails = await updatePermissionsRepository(
          id,
          roleId,
          menuCategoryId,
          readAccess,
          writeAccess,
          updateAccess,
          deleteAccess,
          permissionStatus
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated Details Successfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Update Failed",
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
// 5 delete permission
const deletePermissionsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getPermissionsDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deletePermissionsRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted Succesfully",
          });
        } else {
          res.status(400).json({
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

// export moules

module.exports = {
  getAllPermissionsDetailsController,
  getPermissionsDetailByIdController,
  createPermissionsController,
  updatePermissionsController,
  deletePermissionsController,
};
