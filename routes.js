const express = require("express");

const router = express.Router();

const DataController = require("./data.controller");
router.get("/", DataController.JourneyList);

router.get("/JourneyListByPage", DataController.JourneyListByPage);
router.get("/StationList", DataController.StationList);
router.post("/NewStation", DataController.NewStation);
router.post("/NewJourney", DataController.NewJourney);

module.exports = router;
