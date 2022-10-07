const {
  getAllCitiesDetailsRepository,
  createCitiesRepository,
  updateCityRepository,
  deleteCityRepository,
  getCitiesByCityIdRepository,

  getCitiesByStateIdRepository,
  getCitiesByCountryIdRepository,
} = require("../../repository/citiesRepository");

// 1 get all city details
const getAllDetailsController = async (req, res) => {
  try {
    let details = await getAllCitiesDetailsRepository();
    if (!details || details == false) {
      res.status(200).json({
        success: false,
        message: "Data retrieval failed",
        data: [],
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data retrieved succesfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//  2 get citiy by city Id
const getCityByCityIdController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getCitiesByCityIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Fetched cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No cities found with id " + id,
          data: [],
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

//  3 create city
const createCityController = async (req, res) => {
  try {
    const { name, stateId, countryId } = req.body;

    const create = await createCitiesRepository(name, stateId, countryId);
    if (create) {
      res.status(200).json({
        success: true,
        message: "Data created succesfully with id" + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(409).json({
        success: false,
        message: "Data creation failed",
      });
    }
    //  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong cb cont ",
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
        message: "Invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCitiesByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No record found with id = " + id,
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
      message: "something went wrong",
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
        message: "Invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCitiesByCityIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No record found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteCityRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted succesfully",
          });
        } else {
          res.status(409).json({
            success: false,
            message: "Delete Failed ",
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

// 6 get city by state  id
const getCitiesByStateIdController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getCitiesByStateIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Fetched details of cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No cities found with id " + id,
          data: [],
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

// 7 get city by country Id
const getCitiesByCountryIdController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.send("send valid id: ", id, "   is not a number");
    } else {
      const details = await getCitiesByCountryIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Fetched details of cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No cities found with id " + id,
          data: [],
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
module.exports = {
  getAllDetailsController,
  createCityController,
  updateCityController,
  deleteCityController,
  getCityByCityIdController,

  getCitiesByStateIdController,
  getCitiesByCountryIdController,
};
