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

//********************************* */

//dependency methods imports
const { checkNumber } = require("../../helper/checkNumber");
const { verify } = require("../../helper/verifyjwtToken");
const {
  getUserTypeDetailByIdRepository,
} = require("../../repository/userTypeRepository");

const {
  createUserRepository,
  updateUserRepository,
  deleteUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
  userCheckRepository,
  updateuserCheckRepository,
  updateUserLoginDetailsRepository,
  getUserDetailsDisplayRepository,
  createResidentrepository,
  getuserType,
} = require("../../repository/userRepository");

//********************************* */

// 1  to get the details of one single User by Id
const getUserByIdController = async (req, res) => {
  try {
    let user = await verify(req);
    if (!user) {
      res.status(403).json({
        success: true,
        message: "user verification failed ",
      });
    } else {
      // get the logged in usertype userType
      let loggedUserId = user.userId; //
      const id = req.params.id; //user id of get details

      // fetch the user id details by ID(provided frm req.params.id) using getUserByIdRepository
      const recordExist = await getUserByIdRepository(id, res);
      // if no details found  return false
      if (recordExist == null || recordExist == false) {
        res.status(404).json({
          success: false,
          message: "residents records not found ",
        });
      } else {
        //  case 1 : if user trying to acces his own details
        if (loggedUserId == id) {
          res.status(200).json({
            success: true,
            message: "  user  details retrived succesfully ",
            data: recordExist,
          });
        } else {
          let loggedInUserType = user.userType;
          //check the hierarchy
          let hierarchy = await getUserTypeDetailByIdRepository(
            loggedInUserType
          );

          // get the usertype of the user details to be updated
          getRequesUserType = recordExist.userType;
          let getRequestUserTypeHierarchy =
            await getUserTypeDetailByIdRepository(getRequesUserType);

          //now compare and check whether the user has access to do the requested updation acces or not!
          const levelUp = hierarchy.userHeirarchy;
          const levelDown = getRequestUserTypeHierarchy.userHeirarchy;
          console.log(
            `user level (up) is ${levelUp} and update user level ( down) is ${levelDown} `
          ); //delete

          if (levelUp < levelDown) {
            //*true
            res.status(200).json({
              success: true,
              message: "  user  details retrived succesfully ",
              data: recordExist,
            });
          } else {
            //! false
            res.status(401).json({
              success: false,
              message: "you are not permitted to get details",
            });
          }
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

// 2 to get all Users of users table
const getAllUsersController = async (req, res) => {
  try {
    const user = await verify(req);
    if (!user) {
      res.status(403).json({
        success: false,
        message: "un authorized",
      });
    } else {
      const { userType, userStatus } = req.query;
      const details = await getAllUsersRepository(userType, userStatus);
      if (details && details != false) {
        res.status(200).json({
          success: true,
          message: "details retreived sucesfully",
          data: details,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "details retreival failed",
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

// 6 update users login details controller by id
let updateUserLoginDetailsController = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { lastLogin, loggedIpAddress } = req.body;

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
      res.status(400).json({
        success: false,
        message: "Wrong input:id must be a number ",
      });
    }
  } catch (error) {
    res.send("something went wrong update failed");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

/** //^create user controller (2-admin 3-facility Manager 4-Nurse 5-dietcian 6-resident 7-guest )
 *
 * @param {*} req
 * @param {*} res
 * @author saikumar  date 24-09-2022
 */
const createUsersController = async (req, res) => {
  try {
    let user = await verify(req);
    if (!user) {
      res.status(401).send({ message: "unauthorised user" });
    } else {
      let loggedInUserId = user.userId;
      let loggedInUserType = user.userType;

      //get the logged in user hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);

      // get the usertype of create request from req.body.userType
      let createRequestUserTypeHierarchy =
        await getUserTypeDetailByIdRepository(req.body.userType);

      //now compare and check whether the user has access to do the requested creation acces or not!
      const levelUp = hierarchy.userHeirarchy;
      const levelDown = createRequestUserTypeHierarchy.userHeirarchy;
      console.log(
        `user level (up) is ${levelUp} and create user level ( down) is ${levelDown} `
      ); //delete
      if (levelUp < levelDown) {
        //*true

        // get the username from the request and check username available or not
        const username = req.body.username;
        let usernameCheck = await userCheckRepository(username);
        // return value 0(true no results found username available) or 1 (false - username unavailable )

        if (usernameCheck == 0) {
          // username available
          // get the input details from req.body
          const { fullName, password, userType } = req.body;
          const createdBy = req.userIdValue;
          const updatedBy = req.userIdValue;

          // call the repository function to create user
          let userCreate = await createUserRepository(
            fullName,
            username,
            password,
            userType,
            createdBy,
            updatedBy
          );

          // check if user is created succesfully
          if (userCreate && userCreate != false) {
            res.status(201).json({
              success: true,
              message: `user created succesfully with userId ${userCreate.insertId} and enrolmentId ${userCreate.enrolmentId}`,
              userId: userCreate.insertId,
              enrolmentId: userCreate.enrolmentId,
              fullname: fullName,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "user creation failed",
            });
          }
        } else {
          res.status(403).json({
            success: false,
            message: "username not available ",
          });
        }
      } else {
        //! false

        res.status(401).json({
          success: false,
          message: "you are not permitted to create this user",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in creating user controller",
    });
  }
};

/** //? 2 update users controller
 *
 * @param {*} req
 * @param {*} res
 */
const updateUsersController = async (req, res) => {
  try {
    let user = await verify(req);
    if (!user) {
      res.status(403).json({
        success: true,
        message: "user verification failed ",
      });
    } else {
      // check whther user is trying to edit his own details
      const id = req.params.id;
      const loggedUserId = user.userId;
      if (loggedUserId == id) {
      }

      // get the logged in usertype userType
      let loggedInUserType = user.userType;
      //check the hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);

      // fetch the user id details by ID(provided frm req.params.id) using getUserByIdRepository

      const recordExist = await getUserByIdRepository(id, res);
      if (recordExist == null) {
        res.status(404).json({
          success: false,
          message: "user records not found ",
        });
      } else {
        // get the usertype of the user details to be updated
        updateRequesUserType = recordExist.userType;
        let updateRequestUserTypeHierarchy =
          await getUserTypeDetailByIdRepository(updateRequesUserType);

        //now compare and check whether the user has access to do the requested updation acces or not!
        const levelUp = hierarchy.userHeirarchy;
        const levelDown = updateRequestUserTypeHierarchy.userHeirarchy;
        console.log(
          `user level (up) is ${levelUp} and update user level ( down) is ${levelDown} `
        ); //delete

        if (levelUp < levelDown || loggedUserId == id) {
          //*true
          // before updating the details check whether the requested username is available to insert or not
          const { fullName, username, userStatus } = req.body;
          let usernameCheck = await updateuserCheckRepository(username, id);
          if (usernameCheck == 0) {
            // if username is available to update then
            let details = await updateUserRepository(
              id,
              fullName,
              username,
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
                message: "updated User  details succesfully ",
              });
            }
            //*
          } else {
            res.status(403).json({
              success: false,
              message: "username not available to update ",
            });
          }
        } else {
          //! false
          res.status(401).json({
            success: false,
            message: "you are not permitted to update this user",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in creating user controller",
    });
  }
};

//! 3 delete user
/**
 *
 * @param {*} req
 * @param {*} res
 */
const deleteUsersController = async (req, res) => {
  try {
    let user = await verify(req);
    if (!user) {
      res.status(403).json({
        success: true,
        message: "user verification failed ",
      });
    } else {
      // get the logged in usertype userType

      let loggedInUserType = user.userType;

      //check the hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);

      // fetch the user id details by ID(provided frm req.params.id) using getUserByIdRepository
      const id = req.params.id;

      const recordExist = await getUserByIdRepository(id, res);
      if (!recordExist || recordExist == false) {
        res.status(404).json({
          success: false,
          message: "user records not found ",
        });
      } else {
        // get the usertype of the user details to be deleted
        deleteRequesUserType = recordExist.userType;

        let deleteRequestUserTypeHierarchy =
          await getUserTypeDetailByIdRepository(deleteRequesUserType);

        //now compare and check whether the user has access to do the requested updation acces or not!
        const levelUp = hierarchy.userHeirarchy;
        const levelDown = deleteRequestUserTypeHierarchy.userHeirarchy;

        if (levelUp < levelDown) {
          //*true

          let details = await deleteUserRepository(id);

          if (details == false) {
            res.status(404).json({
              success: false,
              message: "delete failed",
            });
          } else if (details == true) {
            res.status(200).json({
              success: true,
              message: "deleted User  details succesfully ",
            });
          }
          //*
        } else {
          //! false
          res.status(401).json({
            success: false,
            message: "you are not permitted to update this user",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in deleting user controller",
    });
  }
};

//* get all  user details
//*  get user details By Id

module.exports = {
  getUserByIdController,
  getAllUsersController,
  updateUserLoginDetailsController,
  createUsersController,
  updateUsersController,
  deleteUsersController,
};
