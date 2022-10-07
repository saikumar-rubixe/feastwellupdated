const {
  getKitchenDetailsByIdRepository,
  getKitchenDetailsRepository,
  insertKitchenDetailsRepository,
  updateKitchenDetailsRepository,
  deleteKitchenDetailsRepository,
} = require("../../repository/kitchenRepository");

// 1 get details by id
let getKitchenDetailsByIdController = async (req, res) => {
  let id = req.params.id;

  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid  id passed /undefined",
      });
    } else {
      let details = await getKitchenDetailsByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No data found",
          data: {},
        });
      } else if (details) {
        res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          data: details,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// 2 get all details
let getAllKitchenDetailsController = async (req, res) => {
  try {
    let details = await getKitchenDetailsRepository();
    if (!details || details == null) {
      res.status(200).json({
        success: false,
        Message: "No data found or failed to fetch",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        Message: "Details fetched succesfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Something went wrong",
    });
  }
};
//3 create controller
let insertKitchenDetailsController = async (req, res) => {
  try {
    const {
      kitchenName,
      number,
      countryId,
      stateId,
      cityId,
      kitchenStatus,
      address,
      zipcode,
    } = req.body;
    const createdBy = req.userIdValue;

    const create = await insertKitchenDetailsRepository(
      kitchenName,
      number,
      countryId,
      stateId,
      cityId,
      kitchenStatus,
      createdBy,
      address,
      zipcode
    );

    if (!create || create == null) {
      res.status(404).json({
        success: false,
        message: "Kitchen creation failed",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Kitchen created succesfully with ID " + create,
        insertId: create,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

// 4 update controller
let updateKitchenDetailsController = async (req, res) => {
  let id = req.params.id;

  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid  id passed /undefined for update ",
      });
    } else {
      let recordcheck = await getKitchenDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No data found with id " + id,
        });
      } else if (recordcheck) {
        const {
          kitchenName,
          number,
          countryId,
          stateId,
          cityId,
          kitchenStatus,
          address,
          zipcode,
        } = req.body;
        const updatedBy = req.userIdValue;

        let details = await updateKitchenDetailsRepository(
          id,
          kitchenName,
          number,
          countryId,
          stateId,
          cityId,
          kitchenStatus,
          updatedBy,
          address,
          zipcode,
          res
        );

        if (!details || details == false) {
          res.status(400).json({
            success: false,
            message: "No data found",
            data: details,
          });
        } else if (details || details == true) {
          res.status(200).json({
            success: true,
            message: "Updated successfully",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// 5 delete  controller
let deleteKitchenDetailsController = async (req, res) => {
  let id = req.params.id;

  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid  id passed /undefined",
      });
    } else {
      let recordcheck = await getKitchenDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "!Error no data found",
        });
      } else if (recordcheck) {
        let details = await deleteKitchenDetailsRepository(id, res);
        if (!details || details == false) {
          res.status(404).json({
            success: false,
            message: "!Error delete failed",
          });
        } else if (details == true) {
          res.status(200).json({
            success: true,
            message: "delete successful",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getKitchenDetailsByIdController,
  getAllKitchenDetailsController,
  insertKitchenDetailsController,
  updateKitchenDetailsController,
  deleteKitchenDetailsController,
};
