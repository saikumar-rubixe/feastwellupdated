const {
  getNutritionCategoryDetailByIdRepository,
  getAllNutritionCategoryDetailsRepository,
  createNutritionCategoryRepository,
  updateNutritionCategoryRepository,
  deleteNutritionCategoryRepository,
} = require("../repository/nutritionCategoryRepository");

//1 get by id
const getNutritionCategoryDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getNutritionCategoryDetailByIdRepository(id, res);
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//2 get all
const getAllNutritionCategoryDetailsController = async (req, res) => {
  try {
    let details = await getAllNutritionCategoryDetailsRepository();
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 3 create
const createNutritionCategoryController = async (req, res) => {
  try {
    const {
      mealItemId,
      carbohydrates,
      proteins,
      fats,
      vitamins,
      minerals,
      fiber,
      water,
      calories,
      userId,
    } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createNutritionCategoryRepository(
      mealItemId,
      carbohydrates,
      proteins,
      fats,
      vitamins,
      minerals,
      fiber,
      water,
      calories,
      userId
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id:  " + create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    // }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};
// 4 update
const updateNutritionCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getNutritionCategoryDetailByIdRepository(
        id,
        res
      );
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const {
          mealItemId,
          carbohydrates,
          proteins,
          fats,
          vitamins,
          minerals,
          fiber,
          water,
          calories,
          userId,
        } = req.body;
        const updatedetails = await updateNutritionCategoryRepository(
          id,
          mealItemId,
          carbohydrates,
          proteins,
          fats,
          vitamins,
          minerals,
          fiber,
          water,
          calories,
          userId
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};
// 5 delete
const deleteNutritionCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`id is ${id}`);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getNutritionCategoryDetailByIdRepository(
        id,
        res
      );

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await deleteNutritionCategoryRepository(id, res);
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
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// expxorts
module.exports = {
  getNutritionCategoryDetailByIdController,
  getAllNutritionCategoryDetailsController,
  createNutritionCategoryController,
  updateNutritionCategoryController,
  deleteNutritionCategoryController,
};
