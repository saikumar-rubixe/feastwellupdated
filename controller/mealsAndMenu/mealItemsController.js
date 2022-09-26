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
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getMealItemsDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
          data: {
            mealItem: 0,
            mealItemName: 0,
            Status: 0,
            userId: 0,
            createdDate: 0,
            updatedDate: 0,
          },
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
      message: "CBE! something went wrong ",
    });
  }
};
// 2 get all details
const getAllMealItemsDetailsController = async (req, res) => {
  try {
    let details = await getAllMealItemsDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
        data: { count: 0, array: [] },
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
// 3 create meal items
const createMealItemsController = async (req, res) => {
  try {
    const { mealItemName, status } = req.body;
    const userId = req.userIdValue;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    //  const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createMealItemsRepository(
      mealItemName,
      status,
      userId
    );
    if (create) {
      res.status(201).json({
        success: true,
        message: "data created succesfully with id  : " + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(404).json({
        success: false,
        message: "data creation failed",
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
// 4 update meal items
const updateMealItemsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getMealItemsDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { mealItemName, status } = req.body;
        const userId = req.userIdvalue;
        const updatedetails = await updateMealItemsRepository(
          id,
          mealItemName,
          status,
          userId
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
          });
        } else {
          res.status(404).json({
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
// 5 delete meal items
const deleteMealitemsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed: " + id,
      });
    } else {
      const recordCheck = await getMealItemsDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteMealItemsRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(404).json({
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
  getMealItemsDetailByIdController,
  getAllMealItemsDetailsController,
  createMealItemsController,
  updateMealItemsController,
  deleteMealitemsController,
};
