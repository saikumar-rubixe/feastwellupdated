const {
  getMealMenuDetailByIdRepository,
  getAllMealMenuDetailsRepository,
  createMealMenuRepository,
  updateMealMenuRepository,
  deleteMealMenuRepository,
} = require("../repository/mealmenuRepository");

// 1 get by id
const getMealMenuDetailByIdController = async (req, res) => {
  try {
    if (isNaN(id)) {
      const id = req.params.id;
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getMealMenuDetailByIdRepository(id, res);
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

// 2 get all details
const getAllMealMenuDetailsController = async (req, res) => {
  try {
    let details = await getAllMealMenuDetailsRepository();
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

// 3  create
const createMealMenuController = async (req, res) => {
  try {
    //meal items(1,2,3)  <--- meal menu contents

    const {
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      mealItems, // here json array of mealitems id
    } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await funtncCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createMealMenuRepository(
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      mealItems
    );
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
        message: "creation  failed",
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

// 4 upadte
const updateMealMenuController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getMealMenuDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { mealMenuName, menuDescription, mealType, mealStatus, userId } =
          req.body;
        const updatedetails = await updateMealMenuRepository(
          id,
          mealMenuName,
          menuDescription,
          mealType,
          mealStatus,
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
const deleteMealMenuController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getMealMenuDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteMealMenuRepository(id, res);
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

module.exports = {
  getMealMenuDetailByIdController,
  getAllMealMenuDetailsController,
  createMealMenuController,
  updateMealMenuController,
  deleteMealMenuController,
};
