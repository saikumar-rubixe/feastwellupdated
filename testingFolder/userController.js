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
      console.log(`verified user and details are ${user}`); //delete
      console.log(user.userId); //delete
      console.log(`consolling the req user id value`); //delete
      console.log(req.userIdValue); //delete
      console.log(user); //delete
      let loggedInUserId = user.userId;
      let loggedInUserType = user.userType;
      console.log(`loggin usertype is ${loggedInUserType}`);
      //get the logged in user hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);
      console.log(`checking the heirarchy`);
      console.log(hierarchy);
      console.log(` got the user hierarchy ${hierarchy.userHeirarchy} `); //delete

      // get the usertype of create request from req.body.userType
      let createRequestUserTypeHierarchy =
        await getUserTypeDetailByIdRepository(req.body.userType);

      //now compare and check whether the user has access to do the requested creation acces or not!
      const levelUp = hierarchy.userHeirarchy;
      const levelDown = createRequestUserTypeHierarchy.userHeirarchy;
      console.log(
        `user level (up) is ${levelUp} and create user level ( down) is ${levelDown} `
      );
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
            res.status(200).json({
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
    console.log(`something went wrong in creating user controller `);
    console.log(error);
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
      // get the logged in usertype userType
      console.log(`****************`);

      // get the logged in usertype userType
      let loggedInUserType = user.userType;
      //check the hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);
      console.log(`heirarchy is `);
      console.log(hierarchy);

      // fetch the user id details by ID(provided frm req.params.id) using getUserByIdRepository
      const id = req.params.id;
      const recordExist = await getUserByIdRepository(id, res);
      if (recordExist == null) {
        res.status(404).json({
          success: false,
          message: "user records not found ",
        });
      }

      // get the usertype of the user details to be updated
      updateRequesUserType = recordExist.userType;
      let updateRequestUserTypeHierarchy =
        await getUserTypeDetailByIdRepository(updateRequesUserType);

      //now compare and check whether the user has access to do the requested updation acces or not!
      const levelUp = hierarchy.userHeirarchy;
      const levelDown = updateRequestUserTypeHierarchy.userHeirarchy;
      console.log(
        `user level (up) is ${levelUp} and update user level ( down) is ${levelDown} `
      );

      if (levelUp < levelDown) {
        //*true
        // before updating the details check whether the requested username is available to insert or not
        const { fullName, username, userStatus } = req.body;
        let usernameCheck = await updateuserCheckRepository(username, id);
        if (usernameCheck == 0) {
          // if username is available to update then
          //*

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
  } catch (error) {
    console.log(`something went wrong in creating user controller `);
    console.log(error);
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
      console.log(`logged in use type is ${loggedInUserType}`); //delete
      //check the hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);
      console.log(` got the user hierarchy ${hierarchy.userHeirarchy} `); //delete

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

        console.log(deleteRequestUserTypeHierarchy);
        //now compare and check whether the user has access to do the requested updation acces or not!
        const levelUp = hierarchy.userHeirarchy;
        const levelDown = deleteRequestUserTypeHierarchy.userHeirarchy;
        console.log(
          `user level (up) is ${levelUp} and delete user level ( down) is ${levelDown} `
        );

        if (levelUp < levelDown) {
          //*true

          let details = await deleteUserRepository(id);
          console.log(`checking the details`);
          console.log(details);
          if (details == false) {
            res.status(404).json({
              success: false,
              message: "delete failed",
            });
          } else if (details == true) {
            res.status(201).json({
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
    console.log(`something went wrong in deleting user controller `);
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong in deleting user controller",
    });
  }
};

//* get all  user details
//*  get user details By Id

module.exports = {
  createUsersController,
  updateUsersController,
  deleteUsersController,
};
