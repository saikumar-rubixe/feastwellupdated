const {
  getUserTypeDetailByIdRepository,
  getAllUserTypeDetailsRepository,
  createUserTypeRepository,
  updateUserTypeRepository,
  deleteUserTypeRepository,
} = require("../../repository/userTypeRepository");
// get user type details by id
const getUserTypeDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getUserTypeDetailByIdRepository(id, res);

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
  } catch (error) {}
};

const getAllUserTypeDetailsController = async (req, res) => {
  try {
    let details = await getAllUserTypeDetailsRepository();
    if (!details || details == false) {
      res.status(500).json({
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

const createUserTypeController = async (req, res) => {
  try {
    const { userTypeName, userHeirarchy } = req.body;
    const createdBy = req.userIdValue;

    const create = await createUserTypeRepository(
      userTypeName,
      userHeirarchy,
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
      res.status(409).json({
        success: false,
        message: "Data Retrieval Failed",
      });
    }
    // }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const updateUserTypeController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(401).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getUserTypeDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const { userTypeName, userHeirarchy } = req.body;
        const updatedBy = req.userIdValue;
        const updatedetails = await updateUserTypeRepository(
          userTypeName,
          userHeirarchy,
          id,
          updatedBy
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated Details Successfully",
          });
        } else {
          res.status(409).json({
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

const deleteUserTypeController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getUserTypeDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteUserTypeRepository(id, res);
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
  getUserTypeDetailByIdController,
  getAllUserTypeDetailsController,
  createUserTypeController,
  updateUserTypeController,
  deleteUserTypeController,
};
