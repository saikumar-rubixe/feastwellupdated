const {
  createResidentRepository,
  updateResidentRepository,
  deleteResidentRepository,
  getresidentDetailByIdRepository,
  getAllResidentsRepository,
  getAllResidentsOfFacilityRepository,
} = require("../../repository/residentRepository");
const { verify } = require("../../helper/verifyjwtToken");
const {
  getUserTypeDetailByIdRepository,
} = require("../../repository/userTypeRepository");

//*1 create Resident  userType = 6
const createResidentController = async (req, res) => {
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

      let loggedInUserType = user.userType;
      console.log(`loggin usertype is ${loggedInUserType}`);
      //get the logged in user hierarchy
      let hierarchy = await getUserTypeDetailByIdRepository(loggedInUserType);
      console.log(`checking the heirarchy`);
      console.log(hierarchy);
      console.log(` got the user hierarchy ${hierarchy.userHeirarchy} `); //delete

      // get the usertype of create request from req.body.userType
      const userType = req.body.userType;
      let createRequestUserTypeHierarchy =
        await getUserTypeDetailByIdRepository(userType);

      //now compare and check whether the user has access to do the requested creation acces or not!
      const levelUp = hierarchy.userHeirarchy;
      const levelDown = createRequestUserTypeHierarchy.userHeirarchy;
      console.log(
        `user level (up) is ${levelUp} and create user level ( down) is ${levelDown} `
      );
      if (levelUp < levelDown) {
        //*true

        const fullName = req.body.fullName;
        const createdBy = req.userIdValue;
        const updatedBy = req.userIdValue;

        // call the repository function to create user
        let userCreate = await createResidentRepository(
          fullName,
          userType,
          createdBy,
          updatedBy
        );

        // check if user is created succesfully
        if (userCreate && userCreate != false) {
          res.status(201).json({
            success: true,
            message: `Resident created succesfully with userId ${userCreate.insertId} and enrolmentId ${userCreate.enrolmentId}`,
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

//* 2 update Resident userType = 6
const updateResidentController = async (req, res) => {
  try {
    console.log(`consolling the req.body`);
    console.log(req.body);
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
      const recordExist = await getresidentDetailByIdRepository(id, res);
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
        const { fullName, userStatus } = req.body;
        const updatedBy = user.userId;
        let details = await updateResidentRepository(
          id,
          fullName,
          userStatus,
          updatedBy
        );
        if (details == false) {
          res.status(404).json({
            success: false,
            message: "update failed",
          });
        } else if (details == true) {
          res.status(200).json({
            success: true,
            message: "updated Resident  details succesfully ",
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in delete residents controller",
      err: error,
    });
  }
};

//* 3 delete Resident  userType = 6
const deleteResidentController = async (req, res) => {
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

      const recordExist = await getresidentDetailByIdRepository(id, res);
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

          let details = await deleteResidentRepository(id);
          console.log(`checking the details`);
          console.log(details);
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
      message: "something went wrong in delete residents controller",
      err: error,
    });
  }
};
//* 4 get Resident By Id
const getResidentByIdController = async (req, res) => {
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
      console.log(`heirarchy is `);
      console.log(hierarchy);

      // fetch the user id details by ID(provided frm req.params.id) using getUserByIdRepository
      const id = req.params.id;
      const recordExist = await getresidentDetailByIdRepository(id, res);
      if (recordExist == null || recordExist == false) {
        res.status(404).json({
          success: false,
          message: "residents records not found ",
        });
      } else {
        // get the usertype of the user details to be updated
        getRequesUserType = recordExist.userType;
        let getRequestUserTypeHierarchy = await getUserTypeDetailByIdRepository(
          getRequesUserType
        );

        //now compare and check whether the user has access to do the requested updation acces or not!
        const levelUp = hierarchy.userHeirarchy;
        const levelDown = getRequestUserTypeHierarchy.userHeirarchy;
        console.log(
          `user level (up) is ${levelUp} and update user level ( down) is ${levelDown} `
        );

        if (levelUp < levelDown) {
          //*true

          // if (recordExist == null) {
          //   res.status(404).json({
          //     success: false,
          //     message: "update failed",
          //   });
          // } else if (recordExist) {
          res.status(201).json({
            success: true,
            message: "  resident  details retrived succesfully ",
            data: recordExist,
          });
          //  }
          //*
        } else {
          //! false
          res.status(401).json({
            success: false,
            message: "you are not permitted to get details",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong in get details by id controller",
      err: error,
    });
  }
};

// *  5 get All Residents
const getAllResidentsController = async (req, res) => {
  try {
    const user = await verify(req);
    if (!user) {
      res.status(403).json({
        success: false,
        message: "un authorized",
      });
    } else {
      const details = await getAllResidentsRepository(userType);
      console.log(details);
      if (details) {
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
      message: "something went wrong in get all residents controller",
      err: error,
    });
  }
};

//* 6 get All residents  with  Facility
const getAllResidentsOfFacilityController = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in  get all residents facility controller",
      err: error,
    });
  }
};

module.exports = {
  createResidentController,
  updateResidentController,
  deleteResidentController,
  getResidentByIdController,
  getAllResidentsController,
  getAllResidentsOfFacilityController,
};
