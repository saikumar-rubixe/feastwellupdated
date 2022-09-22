const {
  createResidentrepository,
  createUserRepository,
  getuserType,
} = require("./delete2Repository");

const {
  userCheckRepository,
  userUpdateCheckRepository,
} = require("./helper/getDetailsby");

/**1 create user controller
 *
 * @param {*} req
 * @param {*} res
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

module.exports = { createUserController };
