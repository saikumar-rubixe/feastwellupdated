const {
  getMealMenuDetailByIdRepository,
  getAllMealMenuDetailsRepository,
  createMealMenuRepository,
  updateMealMenuRepository,
  deleteMealMenuRepository,
} = require("../../repository/mealmenuRepository");

//** 1 get by id */
const getMealMenuDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getMealMenuDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
          data: [],
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//**2 get all details */
const getAllMealMenuDetailsController = async (req, res) => {
  try {
    let details = await getAllMealMenuDetailsRepository();
    if (!details || details == false) {
      res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

//** 3  create */
const createMealMenuController = async (req, res) => {
  try {
    const userId = req.userIdValue;
    const {
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      mealItems, // here json array of mealitems id
    } = req.body;

    if (!isString(mealItems)) {
      res.status(400).json({
        success: false,
        message: "pass String",
        data: mealItems,
      });
    } else {
      const create = await createMealMenuRepository(
        mealMenuName,
        menuDescription,
        mealType,
        mealStatus,
        userId,
        mealItems
      );
      if (create) {
        res.status(201).json({
          success: true,
          message: `data created succesfully with id :${create.menuId}`,
          menuId: create.menuId,
          mealItemsIds: create.insertItems,
        });
      }
      if (!create || create == false) {
        res.status(404).json({
          success: false,
          message: "creation  failed",
          menuId: 0,
          mealItemsIds: 0,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//** 4 upadte */
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
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const userId = req.userIdValue;
        const {
          mealMenuName,
          menuDescription,
          mealType,
          mealStatus,

          mealItems,
        } = req.body;

        const updatedetails = await updateMealMenuRepository(
          id,
          mealMenuName,
          menuDescription,
          mealType,
          mealStatus,
          userId,
          mealItems
        );
        if (updatedetails) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
            data: updatedetails,
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};
//**5 delete */
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
        res.status(404).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const details = await deleteMealMenuRepository(id, res);
        if (details) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
            data: details,
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
    res.status(500).json({
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
