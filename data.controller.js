const fs = require("fs");
const moment = require("moment");

const csv = require("csv-parser");

let journeyList = [];

let stationList = [];

class GroupController {
  JourneyList(request, response, next) {
    console.log("test");
    journeyList = [];
    console.time(__filename);
    fs.createReadStream("2021-05.csv")
      .pipe(csv())
      .on("data", (row) => {
        journeyList.push(row);
      })
      .on("end", () => {
        console.log(journeyList.length);
        response.sendStatus(200);
        console.timeEnd(__filename);
      });
  }

  JourneyListByPage(request, response, next) {}

  StationList(request, response, next) {}

  NewStation(request, response, next) {}

  NewJourney(request, response, next) {}
}

module.exports = new GroupController();
