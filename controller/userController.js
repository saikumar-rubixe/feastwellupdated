/**Controller is to connect between routers and the Repository's
 * where it takes (params,body,filter conditins etc )api route from routes and passes to Repository after necessary screening
 *  the response received from Repo is Shown  as final response with data and Status Codes
 * 
 ** users is to create new residents , admin,super admins etc based on uSerType 

 * in this Controller the method calls were as follows
 * 1. getUserByIdController --> get the user details by ID
 * 2. getAllUsersController    --> get all the users
 * 3.  createUserController --> Create/insert a new user
 * 4.  updateUserController --> update the user details By id
 * 5. deleteUserController  --> Delete the user details By Id
 * --> a middleware function named {checkNumber } is used to check the value is a NUmber or not
 * --> Related method calls from Repository's are imported
 *
 */

//dependemcy imports
const { checkNumber } = require("../helper/checkNumber");
const {
  getUserByIdRepository,
  getAllUsersRepository,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository,
} = require("../repository/userRepository");
const {
  userCheckRepository,
  emailCheckRepository,
  emailUpdateCheckRepository,
  userUpdateCheckRepository,
} = require("../helper/getDetailsby");

// 1  to get the details of one single User by Id
const getUserByIdController = async (req, res) => {
  const id = req.params.id;
  if (checkNumber(id)) {
    const recordExist = await getUserByIdRepository(id, res);
    if (!recordExist) {
      res.status(404).json({
        success: false,
        message: "Record Not Found with id : " + id,
      });
    } else if (recordExist) {
      res.status(201).json({
        success: true,
        message: "Details Fetched Succesfuly",
        data: recordExist,
      });
    }
  } else {
    console.log("id is not a number");
    res.status(400).json({
      success: false,
      message: "Wrong input:id must be a number ",
    });
  }
};

// 2 to get all Users of users table
const getAllUsersController = async (req, res) => {
  const { userType, userStatus, email } = req.query;
  const details = await getAllUsersRepository(userType, userStatus, email);
  if (details) {
    res.status(200).json({
      success: true,
      message: "Details Fetched Succesfuly",
      data: details,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Cannot retrieved",
    });
  }
};

// 3 create user and generate insertid
let createUserController = async (req, res, next) => {
  let {
    fullName,
    email,
    phoneNumber,
    userName,
    password,
    userType,
    userStatus,
    loggedIpAddress,
  } = req.body;

  let recordCheck = await userCheckRepository(userName, res);
  let emailCheck = await emailCheckRepository(email, res);

  if (recordCheck == 1 || emailCheck == 1) {
    if (recordCheck == 1) {
      res.status(404).json({
        success: false,
        message: "username not available ",
      });
    } else if (emailCheck == 1) {
      res.status(404).json({
        success: false,
        message: "email already exists! please login ",
      });
    }
  } else if (recordCheck == 0 && emailCheck == 0) {
    var createUser = await createUserRepository(
      fullName,
      email,
      phoneNumber,
      userName,
      password,
      userType,
      userStatus,
      loggedIpAddress
    );
    if (!createUser) {
      res.status(404).json({
        success: false,
        message: "something went wrong , registration failed ",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Registration  succesfully with id: " + createUser,
      });
    }
  } else {
    res.send("out of the box error");
  }
};

// 4 update User by id
let updateUserController = async (req, res, next) => {
  let id = req.params.id;
  console.log(`id passed is ${id}`);
  const {
    fullName,
    email,
    phoneNumber,
    userName,
    // password,
    userType,
    status,
    loggedIpAddress,
  } = req.body;
  if (checkNumber(id)) {
    try {
      const recordExist = await getUserByIdRepository(id, res);
      if (recordExist == null) {
        res.status(404).json({
          success: false,
          message: "Record not found Updation failed ",
        });
      }
      if (recordExist && recordExist != null) {
        let recordCheck = await userUpdateCheckRepository(userName, id, res);
        let emailCheck = await emailUpdateCheckRepository(email, id, res);

        if (recordCheck == 1 || emailCheck == 1) {
          if (recordCheck == 1) {
            res.status(404).json({
              success: false,
              message: "username not available ",
            });
          } else if (emailCheck == 1) {
            res.status(404).json({
              success: false,
              message: "email already exists! please login ",
            });
          }
        } else if (recordCheck == 0) {
          let details = await updateUserRepository(
            id,
            fullName,
            email,
            phoneNumber,
            userName,
            // password,
            userType,
            status,
            loggedIpAddress
          );
          if (details == 1) {
            res.status(404).json({
              success: false,
              message: "update failed",
            });
          } else if (details == 0) {
            res.status(201).json({
              success: true,
              message: "updated User succesfully ",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.send("something went wrong update failed");
    }
  } else {
    console.log("id is not a number");

    res.status(400).json({
      success: false,
      message: "Wrong input:id must be a number ",
    });
  }
};

// 5 delete User by id
let deleteUserController = async (req, res) => {
  const id = req.params.id;

  if (checkNumber(id)) {
    try {
      const recordExist = await getUserByIdRepository(id, res);
      if (recordExist) {
        var details = await deleteUserRepository(id);
        if (details == 1) {
          res.status(201).json({
            success: true,
            message: "Deleted User  succesfully ",
          });
        } else if (!details || details == 0) {
          res.status(404).json({
            success: false,
            message: "Deleted User  failed ",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "user not found to delete ",
        });
      }
    } catch (err) {
      console.log(`catch block error controller${err}`);
    }
  }
  //if id is not valid
  else {
    console.log("id is not a number");
    res.status(400).json({
      success: false,
      message: "Wrong input:id must be a number ",
    });
  }
};
module.exports = {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
};
