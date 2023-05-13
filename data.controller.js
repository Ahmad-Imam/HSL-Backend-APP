const fs = require("fs");
const moment = require("moment");
const csvWriter = require("csv-write-stream");
const Papa = require("papaparse");
const csv = require("csv-parser");

let journeyListJson = [];
let journeyListMap = [];

let stationListJson = [];
let stationListMap = [];

class GroupController {
  JourneyList(request, response, next) {}

  async JourneyListByPage(request, response, next) {}

  async StationList(request, response, next) {}

  async NewStation(request, response, next) {}

  async NewJourney(request, response, next) {}
}

module.exports = new GroupController();
