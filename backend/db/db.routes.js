// db.routes.js
const express = require("express");
const router = express.Router();
const dbController = require("./db.controller");

router.get("/timesheets", dbController.getTimesheetsForUser);
router.post("/timesheets", dbController.createTimeSheetForUser);
router.get("/timeoff/", dbController.getTimeoffForUser);
router.post("/timeoff", dbController.createTimeoffRequest);
router.get("/timeoff-manager", dbController.getTimeoffForManagedEmployees);
router.post("/approve-timeoff", dbController.approveTimeoff);
router.post("/post-tweet", dbController.postTweet);
router.delete("/delete-tweet/:tweetId", dbController.deleteTweet);
router.post("/get-tweets", dbController.getTweets);

module.exports = router;
