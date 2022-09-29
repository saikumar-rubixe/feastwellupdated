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
    res.status(500).json({
      success: false,
      message: " something went wrong in  cities controller",
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
          message: "fetched details of cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Cities found with id " + id,
          data: [],
        });
      }
    }
  } catch (error) {
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
      const recordCheck = await getCitiesByCityIdRepository(id, res);

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
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
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
          message: "fetched details of cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Cities found with id " + id,
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
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
          message: "fetched details of cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Cities found with id " + id,
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont ",
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
