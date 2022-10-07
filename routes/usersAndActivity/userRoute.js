const express = require("express");
const userRoute = express.Router();
//*importing routes  from tsting
// const {
//   createUsersController,
//   updateUsersController,
//   deleteUsersController,
// } = require("../../testingFolder/userController");
//* imported testing routes from testing
const {
  userBodyValidation,
  userUpdateBodyValidation,
} = require("../../validation/usersAndActivity/userBodyValidation");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  getUserByIdController,
  getAllUsersController,
  updateUserLoginDetailsController,
  createUsersController,
  updateUsersController,
  deleteUsersController,
} = require("../../controller/usersAndActivity/userController");

//^ Create User Details
userRoute.post("/", async (req, res) => {
  const err = await userBodyValidation(req);
  if (err) {
    return res.status(400).json({
      error: err.message,
      message: "request body validation error",
    });
  } else {
    await createUsersController(req, res);
  }
});

//* get all users details
userRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
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
      message: "Unauthorized access",
    });
  } else {
    await getUserByIdController(req, res);
  }
});

//? Update the user details BY ID(userId)
userRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    const err = await userUpdateBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await updateUsersController(req, res);
    }
  }
});

//? update the  USER login time details  immediately after Login
userRoute.put("/loginDetails/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    const err = await userUpdateBodyValidation(req);
    if (err) {
      return res.status(400).json({
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
  //   const err = await Validation(req);
  //   if (err) {
  //     return res.status(500).json({
  //       error: err.message,
  //       message: "request body validation error",
  //     });
  //   } else {
  await deleteUsersController(req, res);
  //   }
  // }
});

module.exports = { userRoute };
