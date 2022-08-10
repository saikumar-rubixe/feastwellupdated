const express = require("express");
const rolesRoute2 = express.Router();

const rolesCheck = async (permissions) => {
  return (req, res, next) => {
    let userType = req.body.userType;
    if (permissions.includes(userType)) {
      next();
    } else {
      return res.status(401).json("anauthorized");
    }
  };
};

// sample example

rolesRoute2.route("/").get(rolesCheck, (req, res) => {
  res.send("welcome you are accessed");
});
module.exports = { rolesRoute2 };
