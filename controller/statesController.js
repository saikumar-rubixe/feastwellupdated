const {
  getStatesByIdRepository,
  getAllStatesDetailsRepository,
  createStatesRepository,
  updateStatesRepository,
  deleteStatesRepository,
} = require("../repository/countryApiRepository");

// 1 get all States
const getAllStatesDetailsController = async (req, res) => {
  try {
    let details = await getAllStatesDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
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
  }
};
// 2 get states by id
const getStatesByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      console.log("id passed is not a number");
      res.send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getStatesByIdRepository(id, res);
      //  console.log(details.array[0]);
      if (details) {
        res.status(200).json({
          success: true,
          message: "fetched details of STATES",
          data: details,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "States fetch failed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller: catch block Error");
  }
};

// 3 create state
const createStatesController = async (req, res) => {
  try {
    const { Statename, coutryCode } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createStatesRepository(Statename, coutryCode);
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        data: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    // }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};
// 4 update state
const updateStatesController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getStatesByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { Statename, coutryCode } = req.body;
        const updatedetails = await updateStatesRepository(
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
          res.status(400).json({
            success: false,
            message: "update Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

// 5 delete state
const deleteStatesController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getStatesByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await deleteStatesRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

module.exports = {
  getAllStatesDetailsController,
  getStatesByIdController,
  createStatesController,
  updateStatesController,
  deleteStatesController,
};
