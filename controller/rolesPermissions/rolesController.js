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
        message: "Invalid ID",
      });
    } else {
      const details = await getRolesDetailByIdRepository(id, res);
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

//2 get all details
const getAllRolesDetailsController = async (req, res) => {
  try {
    let details = await getAllRolesDetailsRepository(req, res);
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

// 3 create
const createRolesController = async (req, res) => {
  try {
    const { roleName, userTypeId, roleStatus } = req.body;
    const createdBy = req.userIdValue;
    const create = await createRoleRepository(
      roleName,
      userTypeId,
      roleStatus,
      createdBy
    );
    if (create) {
      res.status(201).json({
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
    //}
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getRolesDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const {
          roleName,

          userTypeId,
          roleStatus,
        } = req.body;
        const updatedBy = req.userIdValue;
        const updatedetails = await updateRolesRepository(
          id,
          roleName,

          userTypeId,
          roleStatus,
          updatedBy
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

// delete
const deleteRolesController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getRolesDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteRolesRepository(id, res);
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

module.exports = {
  getRolesDetailByIdController,
  getAllRolesDetailsController,
  createRolesController,
  updateRolesController,
  deleteRolesController,
};
