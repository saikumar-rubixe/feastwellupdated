const express = require("express");
const userRoute = express.Router();

const {
  userBodyValidation,
  userUpdateBodyValidation,
} = require("../../validation/usersAndActivity/userBodyValidation");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserLoginDetailsController,
} = require("../../controller/usersAndActivity/userController");

//^ Create User Details
userRoute.post("/", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await userBodyValidation(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await createUserController(req, res);
    }
  }
});

//* get all users details
userRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllUsersController(req, res);
  }
});

//* get user details by Id(userId)
userRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getUserByIdController(req, res);
  }
});

//? Update the user details BY ID(userId)
userRoute.put("/:id", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await userUpdateBodyValidation(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await updateUserController(req, res);
    }
  }
});

//? update the  USER login time details  immediately after Login
userRoute.put("/loginDetails/:id", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await updateUserLoginDetailsController(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await updateUserLoginDetailsController(req, res);
    }
  }
});

//! Delete User Details
userRoute.delete("/:id", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await Validation(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await deleteUserController(req, res);
    }
  }
});

module.exports = { userRoute };
