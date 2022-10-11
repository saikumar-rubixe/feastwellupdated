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
        message: "Invalid ID",
      });
    } else {
      const details = await getMealMenuDetailByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
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

//**2 get all details */
const getAllMealMenuDetailsController = async (req, res) => {
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
        message: "Pass String",
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
          message: `Data created succesfully with id :${create.menuId}`,
          menuId: create.menuId,
          mealItemsIds: create.insertItems,
        });
      }
      if (!create || create == false) {
        res.status(404).json({
          success: false,
          message: "Creation  Failed",
          menuId: 0,
          mealItemsIds: 0,
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

//** 4 upadte */
const updateMealMenuController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMealMenuDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
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
            message: "Updated Details Successfully",
            data: updatedetails,
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
//**5 delete */
const deleteMealMenuController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMealMenuDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const details = await deleteMealMenuRepository(id, res);
        if (details) {
          res.status(200).json({
            success: true,
            message: "Deleted Succesfully",
            data: details,
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
  getMealMenuDetailByIdController,
  getAllMealMenuDetailsController,
  createMealMenuController,
  updateMealMenuController,
  deleteMealMenuController,
};
