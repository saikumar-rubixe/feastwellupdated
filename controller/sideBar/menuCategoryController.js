const {
  getMenuCategoryDetailByIdRepository,
  getAllMenuCategoryDetailsRepository,
  createMenuCategoryRepository,
  updateMenuCategoryRepository,
  deleteMenuCategoryRepository,
} = require("../../repository/menuCategoryRepository");

//1 get by id
const getMenuCategoryDetailByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getMenuCategoryDetailByIdRepository(id, res);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
// 2 get all details
const getAllMenuCategoryDetailsController = async (req, res) => {
  try {
    let details = await getAllMenuCategoryDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
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

// 3 create
const createMenuCategoryController = async (req, res) => {
  try {
    const { categoryName, menuStatus } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createMenuCategoryRepository(categoryName, menuStatus);
    if (create) {
      res.status(200).json({
        success: true,
        message: "Data Created Succesfully",
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "Data Retrieval Failed",
      });
    }
    //  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// 4 update
const updateMenuCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMenuCategoryDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const { categoryName, menuStatus } = req.body;
        const updatedetails = await updateMenuCategoryRepository(
          id,
          categoryName,
          menuStatus
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated Details Successfully",
          });
        } else {
          res.status(400).json({
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

// delete
const deleteMenuCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getMenuCategoryDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteMenuCategoryRepository(id, res);
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

const getMenuAndSubMenuController = async () => {};

module.exports = {
  getMenuCategoryDetailByIdController,
  getAllMenuCategoryDetailsController,
  createMenuCategoryController,
  updateMenuCategoryController,
  deleteMenuCategoryController,
};
