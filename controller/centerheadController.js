const {
  insertCenterHeadRepository,
  updateCenterHeadRepository,
  deleteCenterHeadRepository,
  getAllCenterHeadRepository,
  getByIdCenterHeadRepository,
} = require("../repository/centerHeadRepository");
// 1 create center head
const insertCenterHeadController = async (req, res) => {
  const {
    centerHeadName,
    personId,
    centeremail,
    centerContactNumber,
    centerCountryId,
    centerStateId,
    centerCityId,
    centerHeadStatus,
    createdBy,
  } = req.body;
  try {
    const create = await insertCenterHeadRepository(
      centerHeadName,
      personId,
      centeremail,
      centerContactNumber,
      centerCountryId,
      centerStateId,
      centerCityId,
      centerHeadStatus,
      createdBy
    );
    if (!create || create == false) {
      res.status(400).json({
        success: false,
        message: " insertion failed ",
      });
    } else if (create) {
      res.status(200).json({
        success: true,
        message: " insertion succesful with id " + create,
      });
    }
  } catch (error) {
    console.log("controller: catch block error");
    console.log(error);
  }
};

//2 update center head
const updateCenterHeadController = async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: " pass id as number only",
      });
    } else {
      const {
        centerHeadName,
        personId,
        centeremail,
        centerContactNumber,
        centerCountryId,
        centerStateId,
        centerCityId,
        centerHeadStatus,
        updatedBy,
      } = req.body;
      const recordCheck = getByIdCenterHeadRepository(id, res);
      if (recordCheck && recordCheck != false) {
        const update = await updateCenterHeadRepository(
          id,
          centerHeadName,
          personId,
          centeremail,
          centerContactNumber,
          centerCountryId,
          centerStateId,
          centerCityId,
          centerHeadStatus,
          updatedBy
        );
        if (update == false || !update) {
          res.status(400).json({
            success: false,
            message: " update failed ",
          });
        }
        if (update == 2) {
          res.status(400).json({
            success: false,
            message: " update  failed OR  MULTIPLE RECORDS AFFECTED",
          });
        }
        if (update == true) {
          res.status(200).json({
            success: true,
            message: "updated record succesfully",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: " No record found to update with given id" + id,
        });
      }
    }
  } catch (error) {
    console.log("controller: catch block error");
    console.log(error);
  }
};

//3 delete
const delteCenterHeadController = async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: " pass id as number only",
      });
    } else {
      let recordCheck = await getByIdCenterHeadRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(404).json({
          success: false,
          message: " No record Found delete failed",
        });
      } else if (recordCheck) {
        const deleteRecord = await deleteCenterHeadRepository(id, res);
        if (deleteRecord == true) {
          res.status(200).json({
            success: true,
            message: " deleted succesfully",
          });
        } else if (deleteRecord == false) {
          res.status(400).json({
            success: false,
            message: " delete failed",
          });
        }
      }
    }
  } catch (error) {
    console.log("controller: catch block error");
    console.log(error);
  }
};

// 4 get by id
const getByIdCenterHeadController = async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: " pass Id as Number only ",
      });
    } else {
      let details = await getByIdCenterHeadRepository(id, res);
      if (details) {
        res.status(200).json({
          success: true,
          message: "details fetched succesfully ",
          data: details,
        });
      } else {
        res.status(400).json({
          success: false,
          message: " no record found with id " + id,
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("controller : catch block error ");
  }
};

// 5  get all
const getAllCenterHeadController = async (req, res) => {
  try {
    let details = await getAllCenterHeadRepository(req, res);
    if (details) {
      res.status(200).json({
        success: true,
        message: " get  details succesfu;",
        data: details,
      });
    } else {
      res.status(400).json({
        success: false,
        message: " cannot retrive details",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("controller:Catch block error ");
    res.status(400).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};
module.exports = {
  insertCenterHeadController,
  updateCenterHeadController,
  delteCenterHeadController,
  getByIdCenterHeadController,
  getAllCenterHeadController,
};
