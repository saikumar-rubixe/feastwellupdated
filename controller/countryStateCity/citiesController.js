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
        message: "Unabe to Retrieve City",
        data: [],
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "City Retrieved Successfully",
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

//  2 get citiy by city Id
const getCityByCityIdController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.send("Invalid ID");
    } else {
      const details = await getCitiesByCityIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Retrieved Cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Cities Found",
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

//  3 create city
const createCityController = async (req, res) => {
  try {
    const { name, stateId, countryId } = req.body;

    const create = await createCitiesRepository(name, stateId, countryId);
    if (create) {
      res.status(200).json({
        success: true,
        message: "City Created Succesfully",
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(409).json({
        success: false,
        message: "City Creation Failed",
      });
    }
    //  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getCitiesByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
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
            message: "Updated Details Succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Update Failed",
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

// 5 delete city
const deleteCityController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const recordCheck = await getCitiesByCityIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found",
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteCityRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted Succesfully",
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
      message: "Something Went Wrong",
    });
  }
};

// 6 get city by state  id
const getCitiesByStateIdController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.send("Invalid ID");
    } else {
      const details = await getCitiesByStateIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Retrieved Cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Cities Found",
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

// 7 get city by country Id
const getCitiesByCountryIdController = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      res.send("Invalid ID");
    } else {
      const details = await getCitiesByCountryIdRepository(id, res);

      if (details) {
        res.status(200).json({
          success: true,
          message: "Retrieved Cities",
          data: details,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Cities Found",
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
module.exports = {
  getAllDetailsController,
  createCityController,
  updateCityController,
  deleteCityController,
  getCityByCityIdController,

  getCitiesByStateIdController,
  getCitiesByCountryIdController,
};
