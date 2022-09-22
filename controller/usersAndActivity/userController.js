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
const { checkNumber } = require("../../helper/checkNumber");
const {
  getUserByIdRepository,
  getAllUsersRepository,
  createResidentrepository,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository,
  updateUserLoginDetailsRepository,
  getuserType,
} = require("../../repository/userRepository");
const {
  userCheckRepository,
  userUpdateCheckRepository,
} = require("../../helper/getDetailsby");

// 1  to get the details of one single User by Id
const getUserByIdController = async (req, res) => {
  // console.log("Header: " + req.header("Authorization"));
  try {
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
          message: "Details Fetched Successfuly",
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 2 to get all Users of users table
const getAllUsersController = async (req, res) => {
  // console.log("Header: " + req.header("Authorization"));
  try {
    const { userType, userStatus } = req.query;
    const details = await getAllUsersRepository(userType, userStatus);
    if (details) {
      res.status(200).json({
        success: true,
        message: "Details Fetched Successfuly",
        data: details,
      });
    } else if (details == false) {
      res.status(404).json({
        success: false,
        message: "catch bock error ",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cannot retrieved",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 3 create user and generate insertId
/**1 create user controller
 *
 * @param {*} req
 * @param {*} res
 * @return {*} inserted ID
 */
const createUserController = async (req, res) => {
  try {
    const userId = req.userIdValue; //get the user id of logged in user
    const userType = await getuserType(userId); // get the userType of the user ID
    const createUserTypeRequest = req.body.userType; // type of user to be added
    // TODO check for creating resident
    if (createUserTypeRequest == 6) {
      console.log(`int creating  resident  controller starting`);
      console.log(req.body);
      if (userType == 1 || userType == 2 || userType == 3 || userType == 4) {
        let fullName = req.body.fullName;
        const createUser = await createResidentrepository(
          fullName,
          createUserTypeRequest,
          req,
          res
        );
        //* return from repository with created Id
        if (!createUser || createUser == false) {
          res.status(404).json({
            success: false,
            message: "something went wrong , registration failed ",
          });
        } else {
          res.status(201).json({
            success: true,
            message: "Registration  succesfully with id: " + createUser,
            insertId: createUser,
            fullName: fullName,
          });
        }
      }
    }
    //TODO check for creating nurse and dietician
    else if (createUserTypeRequest == 5 || createUserTypeRequest == 4) {
      console.log(`in creating the nurse controller`);
      if (userType == 3 || userType == 2 || userType == 1) {
        const { fullName, username, password } = req.body;
        let recordCheck = await userCheckRepository(username, res);
        console.log(`checking the record exist results ${recordCheck}`);
        if (recordCheck == 1) {
          if (recordCheck == 1) {
            res.status(404).json({
              success: false,
              message: "username not available ",
            });
          }
        } else if (recordCheck == 0) {
          let createUser = await createUserRepository(
            fullName,
            username,
            password,
            createUserTypeRequest,
            req,
            res
          );
          //*
          if (!createUser || createUser == false) {
            res.status(404).json({
              success: false,
              message: "something went wrong , registration failed ",
            });
          } else {
            res.status(201).json({
              success: true,
              message: "Registration  succesfully with id: " + createUser,
              insertId: createUser,
              fullName: fullName,
            });
          }
        }
      }
    }

    //TODO check for creating facility Manager
    else if (createUserTypeRequest == 3) {
      if (userType == 2 || userType == 1) {
        const { fullName, username, password } = req.body;
        let createuser = await createUserRepository(
          fullName,
          username,
          password,
          createUserTypeRequest,
          req,
          res
        );
        //** */
        if (!createUser || createUser == false) {
          res.status(404).json({
            success: false,
            message: "something went wrong , registration failed ",
          });
        } else {
          res.status(201).json({
            success: true,
            message: "Registration  succesfully with id: " + createUser,
            insertId: createUser,
            fullName: fullName,
          });
        }
      }
    }
    //TODO for creating ADMIN
    else if (createUserTypeRequest == 2) {
      if (userType == 1) {
        const { fullName, username, password } = req.body;
        let createUser = await createUserRepository(
          fullName,
          username,
          password,
          createUserTypeRequest,
          req,
          res
        );
        //** */
        if (!createUser || createUser == false) {
          res.status(404).json({
            success: false,
            message: "something went wrong , registration failed ",
          });
        } else {
          res.status(201).json({
            success: true,
            message: "Registration  succesfully with id: " + createUser,
            insertId: createUser,
            fullName: fullName,
          });
        }
      }
    }
    //TODO invalid creation request
    else {
      res.status(404).json({
        success: false,
        message: "invalid user creation request",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// 4 update User by id
let updateUserController = async (req, res, next) => {
  try {
    let id = req.params.id;
    // console.log(`id passed is ${id}`);//delete
    const { fullName, phoneNumber, userName, userStatus } = req.body;
    console.log(`this is the jfbwueif`);
    console.log(userStatus);
    console.log(req.body);
    if (checkNumber(id)) {
      const recordExist = await getUserByIdRepository(id, res);
      if (recordExist == null) {
        res.status(404).json({
          success: false,
          message: "Record not found Updation failed ",
        });
      }
      if (recordExist && recordExist != null) {
        let recordCheck = await userUpdateCheckRepository(userName, id, res);
        if (recordCheck == 1) {
          if (recordCheck == 1) {
            res.status(404).json({
              success: false,
              message: "username not available ",
            });
          }
        } else if (recordCheck == 0) {
          let details = await updateUserRepository(
            id,
            fullName,
            phoneNumber,
            userName,
            userStatus
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
    } else {
      console.log("id is not a number");
      res.status(400).json({
        success: false,
        message: "Wrong input:id must be a number ",
      });
    }
  } catch (error) {
    console.log(error);
    res.send("something went wrong update failed");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 5 delete User by id
let deleteUserController = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 6 update users login details controller by id
let updateUserLoginDetailsController = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { lastLogin, loggedIpAddress } = req.body;
    console.log(req.body);
    if (checkNumber(id)) {
      const recordExist = await getUserByIdRepository(id, res);
      if (recordExist == null) {
        res.status(404).json({
          success: false,
          message: "Record not found Updation failed ",
        });
      }
      if (recordExist && recordExist != null) {
        let recordCheck = await userUpdateCheckRepository(userName, id, res);
        if (recordCheck == 1) {
          if (recordCheck == 1) {
            res.status(404).json({
              success: false,
              message: "username not available ",
            });
          }
        } else if (recordCheck == 0) {
          let details = await updateUserLoginDetailsRepository(
            id,
            lastLogin,
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
    } else {
      console.log("id is not a number");
      res.status(400).json({
        success: false,
        message: "Wrong input:id must be a number ",
      });
    }
  } catch (error) {
    console.log(error);
    res.send("something went wrong update failed");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserLoginDetailsController,
};
