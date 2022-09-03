const {
  createStatesRepository,
  getAllStatesDetailsRepository,
  getStatesByStateIdRepository,
  updateStatesByStateIdRepository,
  deleteStatesByStateIdRepository,

  getStatesByCountryIdRepository,
  updateStatesByCountryIdRepository,
  deleteStatesByCountryIdRepository,
} = require("../../repository/StatesRepository");

//^ 1 create state
const createStatesController = async (req, res) => {
  try {
    const { statename, countryId } = req.body;
    console.log(req.body);
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createStatesRepository(statename, countryId);
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(404).json({
        success: false,
        message: "no content found",
      });
    }
    // }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//* 2 get all States
const getAllStatesDetailsController = async (req, res) => {
  try {
    let details = await getAllStatesDetailsRepository();
    if (!details || details == false) {
      res.status(200).json({
        success: false,
        message: "data retrieval failed",
        data: [],
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "data retrieved succesfully",
        data: details,
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//? 3 update state
const updateStatesByStateIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getStatesByStateIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { Statename, coutryCode } = req.body;
        const updatedetails = await updateStatesByStateIdRepository(
          id,
          Statename,
          coutryCode
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "update Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//*  4 get states by state Id
const getStatesByStateIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      // console.log("id passed is not a number");
      res.status(401).send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getStatesByStateIdRepository(id, res);
      //  console.log(details.array[0]);
      if (details) {
        res.status(200).json({
          success: true,
          message: "fetched details of STATES",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "States fetch failed",
          data: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller: catch block Error");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//! 5 delete state
const deleteStatesByStateIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getStatesByStateIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteStatesByStateIdRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//* 6 get states by Country id
const getStatesByCountryIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      // console.log("id passed is not a number");
      res.status(401).send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getStatesByCountryIdRepository(id, res);
      //  console.log(details.array[0]);
      if (details) {
        res.status(200).json({
          success: true,
          message: "fetched details of STATES",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No States Found With Id " + id,
          data: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller: catch block Error");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//? 7 update states by coutry Id   updateStatesByCountryIdRepository
const updateStatesByCountryIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getStatesByCountryIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { Statename, coutryCode, countryId } = req.body;
        const updatedetails = await updateStatesByCountryIdRepository(
          id,
          Statename,
          coutryCode,
          countryId
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "update Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

//! 8 delete states by Country ID
const deleteStatesByCountryIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getStatesByCountryIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteStatesByCountryIdRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  createStatesController,
  getAllStatesDetailsController,
  updateStatesByStateIdController,
  getStatesByStateIdController,
  deleteStatesByStateIdController,
  getStatesByCountryIdController,
  updateStatesByCountryIdController,
  deleteStatesByCountryIdController,
};
