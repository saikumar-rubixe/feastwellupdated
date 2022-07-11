const {
  getMealMenuDetailByIdRepository,
  getAllMealMenuDetailsRepository,
  createMealMenuRepository,
  updateMealMenuRepository,
  deleteMealMenuRepository,
} = require("../repository/mealmenuRepository");

const getMealMenuDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
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
  }
};

// 3  create
const createMealMenuController = async (req, res) => {
  try {
    //meal items(1,2,3)  <--- meal menu contents

    const { mealMenuName, menuDescription, mealType, mealStatus, userId } =
      req.body;
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
      userId
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        data: create,
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
    res.send(error);
  }
};

// 4 upadte
const updateMealMenuController = async (req, res) => {
  const id = req.params.id;
  try {
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
  }
};
// 5 delete
const deleteMealMenuController = async (req, res) => {
  const id = req.params.id;
  try {
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
        const {} = req.body;
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
  }
};

module.exports = {
  getMealMenuDetailByIdController,
  getAllMealMenuDetailsController,
  createMealMenuController,
  updateMealMenuController,
  deleteMealMenuController,
};
