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

    const create = await createStatesRepository(statename, countryId);
    if (create) {
      res.status(201).json({
        success: true,
        message: "State Created Succesfully",
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(404).json({
        success: false,
        message: "No State Found",
      });
    }
    // }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "State Retrieval Failed",
        data: [],
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "State Retrieved Successfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getStatesByStateIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const { statename, countryId } = req.body;
        const updatedetails = await updateStatesByStateIdRepository(
          id,
          statename,
          countryId
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Updated details succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Update Failed ",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//*  4 get states by state Id
const getStatesByStateIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(401).send("Enter Valid ID");
    } else {
      const details = await getStatesByStateIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Retrieved States Successfully",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "States Retrieval Failed",
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getStatesByStateIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteStatesByStateIdRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted Succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//* 6 get states by Country id
const getStatesByCountryIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(401).send("Enter Valid ID");
    } else {
      const details = await getStatesByCountryIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Retrieved States Successfully",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No States Found",
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getStatesByCountryIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
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
            message: "Updated State Succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Update Failed ",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getStatesByCountryIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteStatesByCountryIdRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
