/**Controller is to connect between routers and the Repository's
 * where it takes (params,body,filter conditins etc )api route from routes and passes to Repository after necessary screening
 *  the response received from Repo is Shown  as final response with data and Status Codes
 * 
 ** to get the state  & city based on  country

 * in this Controller the method calls were as follows
 * 1.  getCountryController     ---> get all the countris
 * 2.  getStatesByIdController   --> get all the States by country id
 * 3.  getCitiesByIdController    ---> get all the cities based on state id

 *
 */

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

//3 get cities by id
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
