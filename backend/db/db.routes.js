// db.routes.js
const express = require("express");
const router = express.Router();
const dbController = require("./db.controller");

router.get("/timesheets/", dbController.getTimesheetsForUser);
router.get("/timeoff/", dbController.getTimeoffForUser);
router.post("/timeoff", dbController.createTimeoffRequest);


module.exports = router;
