const {
  getMealItemsDetailByIdRepository,
  getAllMealItemsDetailsRepository,
  createMealItemsRepository,
  updateMealItemsRepository,
  deleteMealItemsRepository,
} = require("../../repository/mealItemsRepository");
//1 get by id
const getMealItemsDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getMealItemsDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No Record Found",
          data: {
            mealItem: 0,
            mealItemName: 0,
            Status: 0,
            createdBy: 0,
            createdDate: 0,
            updatedDate: 0,
            updatedBy: 0,
          },
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
      message: "Something Went Wrong ",
    });
  }
};
// 2 get all details
const getAllMealItemsDetailsController = async (req, res) => {
  try {
    const status = req.query.status;

    let details = await getAllMealItemsDetailsRepository(status);
    if (!details || details == false) {
      res.status(400).json({
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
// 3 create meal items
const createMealItemsController = async (req, res) => {
  try {
    const { mealItemName, status } = req.body;
    const createdBy = req.userIdValue;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    //  const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createMealItemsRepository(
      mealItemName,
      status,
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
      res.status(404).json({
        success: false,
        message: "Data Creation Failed",
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
// 4 update meal items
const updateMealItemsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMealItemsDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const { mealItemName, status } = req.body;

        const updatedBy = req.userIdvalue;
        const updatedetails = await updateMealItemsRepository(
          id,
          mealItemName,
          status,
          updatedBy
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated Details Succesfully",
          });
        } else {
          res.status(404).json({
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
// 5 delete meal items
const deleteMealitemsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMealItemsDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteMealItemsRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted Succesfully",
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
  getMealItemsDetailByIdController,
  getAllMealItemsDetailsController,
  createMealItemsController,
  updateMealItemsController,
  deleteMealitemsController,
};
