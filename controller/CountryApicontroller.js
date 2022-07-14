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
  getAllCountryRepository,
  getCountryByIdRepository,
  createCountryRepository,
  updateCountryRepository,
  deleteCountryRepository,
} = require("../repository/countryApiRepository");

//1 gte country details
const getAllCountryController = async (req, res) => {
  try {
    let details = await getAllCountryRepository(req, res);

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
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};
// 2 get by id
const getCountryByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getCountryByIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
          message: "No record found with id " + id,
        });
      }
      if (details) {
        res.status(200).json({
          success: true,
          message: "data retrieved succesfully",
          data: details,
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something went wrong!");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

// 3 create country
const createCountryController = async (req, res) => {
  try {
    const { name, phoneCode, is02, timeZones } = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    // const recordCheck = await functionCall();
    // if (recordCheck || recordCheck == true) {
    //   // for exist pass negative
    // } else if (!recordCheck || recordCheck == false) {
    const create = await createCountryRepository(
      name,
      phoneCode,
      is02,
      timeZones
    );
    if (create) {
      res.status(200).json({
        success: true,
        message: "data created succesfully with id" + create,
        data: create,
      });
    }
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    //  }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};
// 4 update country
const updateCountryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCountryByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const { name, phoneCode, is02, timeZones } = req.body;
        const updatedetails = await updateCountryRepository(
          name,
          phoneCode,
          is02,
          timeZones,
          id
        );
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "updated details succesfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "update Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

// 5 delete country
const deleteCountryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCountryByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await deleteCountryRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "delete succesfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "delete Failed ",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont ",
    });
  }
};

module.exports = {
  getAllCountryController,
  getCountryByIdController,
  createCountryController,
  updateCountryController,
  deleteCountryController,
};
