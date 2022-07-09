const express = require("express");
const nameRoute = express.Router();
const { Insert, getAll, getById, update, deleted } = require("../controller");
nameRoute.route("/:id").get(getById);

//nameRoute.route("/").post(Insert);
//nameRoute.route("/").get(getAll);

//nameRoute.route("/:id").put(update);
//nameRoute.route("/:id").delete(deleted);

module.exports = { nameRoute };
