const {
  getCountryRepository,
  getStatesByIdRepository,
  getCitiesByIdRepository,
} = require("../repository/countryApiRepository");

//1 gte country details
const getCountryController = async (req, res) => {
  try {
    let details = await getCountryRepository(req, res);

    if (details) {
      res.status(200).json({
        success: true,
        message: "countries fetched",
        data: details,
      });
    }
    if (!details) {
      res.status(400).json({
        success: false,
        message: "countries fetch failed",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Controller: catch block Error");
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
      console.log("calling repo");
      const details = await getStatesByIdRepository(id, res);
      //  console.log(details.array[0]);
      if (details) {
        res.send(details);
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

//3 get cities by id
const getCitiesByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      console.log("id passed is not a number");
      res.send("send valid id: ", id, "   is not a number");
    } else {
      console.log("calling repo");
      const details = await getCitiesByIdRepository(id, res);
      //  console.log(details.array[0]);
      if (details) {
        res.status(200).json({
          success: true,
          message: "fetched details of cities",
          data: details,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "cities fetch failed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller: catch block Error");
  }
};
module.exports = {
  getCountryController,
  getStatesByIdController,
  getCitiesByIdController,
};
