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
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getUserTypeDetailByIdRepository(id, res);

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
  } catch (error) {}
};

const getAllUserTypeDetailsController = async (req, res) => {
  try {
    let details = await getAllUserTypeDetailsRepository();
    if (!details || details == false) {
      res.status(500).json({
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
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
        message: "data created succesfully with id" + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(409).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    // }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

const updateUserTypeController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(401).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getUserTypeDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
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
            message: "updated details succesfully",
          });
        } else {
          res.status(409).json({
            success: false,
            message: "update Failed ",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

const deleteUserTypeController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getUserTypeDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteUserTypeRepository(id, res);
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
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
