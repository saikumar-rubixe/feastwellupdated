const {
  getAllCitiesDetailsRepository,
  getCitiesByIdRepository,
  createCitiesRepository,
  updateCityRepository,
  deleteCityRepository,
} = require("../../repository/citiesRepository");

// 1 get all city details
const getAllDetailsController = async (req, res) => {
  try {
    let details = await getAllCitiesDetailsRepository();
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
      message: " something went wrong cb cont",
    });
  }
};

// 2 get city by id
const getCitiesByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      console.log("id passed is not a number");
      res.send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getCitiesByIdRepository(id, res);
      //  console.log(details.array[0]);
      if (details) {
        res.status(200).json({
          success: true,
          message: "fetched details of cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "cities fetch failed",
          data: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller: catch block Error");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

//  3 create city
const createCityController = async (req, res) => {
  try {
    const { name, stateId, countryId } = req.body;
    console.log(req.body);
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createCitiesRepository(name, stateId, countryId);
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(409).json({
        success: false,
        message: "data creation failed",
      });
    }
    //  }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

// 4 update city
const updateCityController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(401).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCitiesByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { name, stateCode, countryCode } = req.body;
        const updatedetails = await updateCityRepository(
          id,
          name,
          stateCode,
          countryCode
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
      message: " something went wrong cb cont ",
    });
  }
};

// 5 delete city
const deleteCityController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCitiesByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteCityRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(409).json({
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
      message: " something went wrong cb cont ",
    });
  }
};

module.exports = {
  getAllDetailsController,
  getCitiesByIdController,
  createCityController,
  updateCityController,
  deleteCityController,
};
