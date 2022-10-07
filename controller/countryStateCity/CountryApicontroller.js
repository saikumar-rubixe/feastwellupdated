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
} = require("../../repository/countryApiRepository");

//1 gte country details
const getAllCountryController = async (req, res) => {
  try {
    let details = await getAllCountryRepository(req, res);

    if (details) {
      res.status(200).json({
        success: true,
        message: "Countries fetched",
        data: details,
      });
    }
    if (!details) {
      res.status(200).json({
        success: false,
        message: "Countries fetch failed",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
        message: "Invalid id Passed:  " + id,
      });
    } else {
      const details = await getCountryByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
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
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// 3 create country
const createCountryController = async (req, res) => {
  try {
    const { name, phoneCode, is02, timeZones } = req.body;

    const create = await createCountryRepository(
      name,
      phoneCode,
      is02,
      timeZones
    );
    if (create) {
      res.status(201).json({
        success: true,
        message: "Data created succesfully with id" + create,
        insertId: create,
      });
    }
    if (!create || create == false) {
      res.status(404).json({
        success: false,
        message: "Data retrieval failed",
      });
    }
    //  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
        message: "Invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCountryByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No record found With id = " + id,
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
            message: "Updated details succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Update failed ",
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

// 5 delete country
const deleteCountryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getCountryByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const updatedetails = await deleteCountryRepository(id, res);
        if (updatedetails == true) {
          res.status(200).json({
            success: true,
            message: "Deleted succesfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Delete failed ",
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
  getAllCountryController,
  getCountryByIdController,
  createCountryController,
  updateCountryController,
  deleteCountryController,
};
