const { runQuery, con } = require("../config/database");

const { menuCategoryModel } = require("../models");
const {
  updateFacilityCenterDetailsRepository,
} = require("../repository/facilityCenterRepository");

//1 get usertype details
const getAllDetailsController = async (req, res) => {
  try {
    let details = await getAllDetailsController();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
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
  }
};
const getAllDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      let model = new Model();
      for (i = 0; i < count; i++) {
        let result = results[i];
        model.fill();
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 2 get details By id
const getDetailByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getDetailByIdRepository(id, res);
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
  }
};

const getDetailByIdRepository = async (id, res) => {
  try {
    let query = " where id=?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new Model();
      model.fill();
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 3 create
const createController = async (req, res) => {
  try {
    const {} = req.body;
    // check for user/email/etc doesnot exits
    // check for user/email/etc doesnot exits
    const recordCheck = await functionCall();
    if (recordCheck || recordCheck == true) {
      // for exist pass negative
    } else if (!recordCheck || recordCheck == false) {
      const create = await createRepository();
      if (create) {
        res.status(200).json({
          success: true,
          message: "data created succesfully with id" + create,
          data: details,
        });
      }
      if (!create || create == false) {
        res.status(400).json({
          success: false,
          message: "data retrieval failed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

const createRepository = async () => {
  try {
    let query = "INSERT into `tableName` (`fieldnames`) VALUES(?,?) ";
    let sql = con.format(query, [values]);
    let results = await runQuery(sql);
    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 4 update

const updateController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getDetailByIdRepository(id, res);
      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "no Record Found With id = " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await updateRepository();
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
  }
};

const updateRepository = async (req, res) => {
  try {
    let query = " UPDATE `TABLENAME` set `fieldname`=? where id =?";
    let sql = con.format(query, [values, id]);
    let results = await runQuery(sql);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 5 delete
const deleteController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const recordCheck = await getDetailByIdRepository(id, res);

      if (!recordCheck || recordCheck == false) {
        res.status(400).json({
          success: false,
          message: "No Record Found with id " + id,
        });
      }
      if (recordCheck) {
        const {} = req.body;
        const updatedetails = await deleteRepository();
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
  }
};

const deleteRepository = async (id, res) => {
  try {
    let query = "DELETE from  `TABLENAME` where `id`=?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

module.exports = {
  getAllDetailsController,
  getAllDetailsRepository,

  getDetailByIdController,
  getDetailByIdRepository,

  createController,
  createRepository,

  updateController,
  updateRepository,

  deleteController,
};
