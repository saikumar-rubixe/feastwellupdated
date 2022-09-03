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
  // console.log(`id passed is ${id}`);
  try {
    if (isNaN(id)) {
      console.log("pass id as a number only ");
      res.status(400).json({
        success: false,
        message: "invalid  id passed /undefined",
      });
    } else {
      let details = await getKitchenDetailsByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "!Error no data found",
          data: {},
        });
      } else if (details) {
        res.status(200).json({
          success: true,
          message: "data fetched successfully",
          data: details,
        });
      }
    }
  } catch (error) {
    console.log("Controller: catch block error ");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
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
        Message: "details fetched succesfully",
        data: details,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      Message: "CBE! Something went wrong",
    });
  }
};
//3 create controller
let insertKitchenDetailsController = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log(`created by date is ${createdBy}`);
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
        message: "facility center creation failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "facility center created Succesfully with id " + create,
        insertId: create,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

// 4 update controller
let updateKitchenDetailsController = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  console.log(req.body);
  try {
    if (isNaN(id)) {
      console.log("pass id as a number only ");
      res.status(400).json({
        success: false,
        message: "invalid  id passed /undefined for update ",
      });
    } else {
      let recordcheck = await getKitchenDetailsByIdRepository(id, res);

      if (!recordcheck || recordcheck == false) {
        res.status(404).json({
          success: false,
          message: "!Error no data found with id " + id,
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
            message: "!Error no data found",
            data: details,
          });
        } else if (details || details == true) {
          res.status(200).json({
            success: true,
            message: "updated successfully",
          });
        }
      }
    }
  } catch (error) {
    console.log("Controller: catch block error ");
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
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
    console.log("Controller: catch block error ");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
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
