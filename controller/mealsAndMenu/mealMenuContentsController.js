const {
  getAllMealMenuDetailsRepository,
  getMealMenuContentsDetailByIdRepository,
  createMealMenuContentsRepository,
  updateMealMenuContentsRepository,
  deleteMealMenuContentsRepository,
} = require("../../repository/mealMenuContentsRepository");

// 1 get all details
const getAllMealMenuContentsDetailsController = async (req, res) => {
  try {
    let details = await getAllMealMenuDetailsRepository();
    if (!details || details == false) {
      res.status(200).json({
        success: false,
        message: "Data Retrieval Failed",
        data: { count: 0, array: [] },
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

//2  get by id
const getMealMenuContentsDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getMealMenuContentsDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
          data: [],
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

//  3 create
const createMealMenuContentsController = async (req, res) => {
  try {
    const { mealMenuId, mealItemId, menuContentStatus } = req.body;
    const userId = req.userIdValue;

    const create = await createMealMenuContentsRepository(
      mealMenuId,
      mealItemId,
      userId,
      menuContentStatus
    );
    if (create) {
      res.status(201).json({
        success: true,
        message: "Data Created Succesfully",
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(404).json({
        success: false,
        message: "Data Retrieval Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// 4 update
const updateMealMenuContentsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMealMenuContentsDetailByIdRepository(
        id,
        res
      );
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const { mealMenuId, mealItemId, menuContentStatus } = req.body;
        const userId = req.userIdvalue;
        const updatedetails = await updateMealMenuContentsRepository(
          id,
          mealMenuId,
          mealItemId,
          userId,
          menuContentStatus
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated Details Successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Update Failed ",
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

// 5 delete
const deleteMealMenuContentsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMealMenuContentsDetailByIdRepository(
        id,
        res
      );

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const deletedetails = await deleteMealMenuContentsRepository(id, res);
        if (deletedetails == true) {
          res.status(200).json({
            success: true,
            message: "Delete Succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Delete Failed ",
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
  getAllMealMenuContentsDetailsController,
  getMealMenuContentsDetailByIdController,
  createMealMenuContentsController,
  updateMealMenuContentsController,
  deleteMealMenuContentsController,
};
