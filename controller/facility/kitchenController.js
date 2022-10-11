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
        message: "Invalid ID",
      });
    } else {
      let details = await getKitchenDetailsByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "Kitchen Not Found",
          data: {},
        });
      } else if (details) {
        res.status(200).json({
          success: true,
          message: "Kitchen Retrieved Successfully",
          data: details,
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

// 2 get all details
let getAllKitchenDetailsController = async (req, res) => {
  try {
    let details = await getKitchenDetailsRepository();
    if (!details || details == null) {
      res.status(200).json({
        success: false,
        Message: "Kitchen Not Found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        Message: "Kitchen Retrieved Succesfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      Message: "Something Went Wrong",
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
        message: "Kitchen Creation Failed",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Kitchen Created Succesfully",
        insertId: create,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong ",
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
        message: "Invalid ID",
      });
    } else {
      let recordcheck = await getKitchenDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
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
            message: "No Record Found",
            data: details,
          });
        } else if (details || details == true) {
          res.status(200).json({
            success: true,
            message: "Updated Successfully",
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
          message: "!Error no data Found",
        });
      } else if (recordcheck) {
        let details = await deleteKitchenDetailsRepository(id, res);
        if (!details || details == false) {
          res.status(404).json({
            success: false,
            message: "!Error delete Failed",
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
      message: "Something Went Wrong",
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
