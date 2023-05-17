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
        console.log(journeyList[0]);

        response.sendStatus(200);
        console.timeEnd(__filename);
      });
  }

  JourneyListByPage(request, response, next) {
    console.log("in");
    const PAGE_SIZE = 10;

    try {
      const pageNumber = parseInt(request.body.pageNumber) || 1;
      const startIndex = (pageNumber - 1) * PAGE_SIZE;
      const endIndex = pageNumber * PAGE_SIZE;

      const paginatedJourneyList = journeyList.slice(startIndex, endIndex);
      var keys = [];
      paginatedJourneyList.forEach((item, index) => {
        keys = Object.keys(item);
      });
      console.log(keys);
      var finalJourneyList = [];
      paginatedJourneyList.forEach((item, index) => {
        if (
          parseInt(item[keys[6]]) > 10 &&
          parseInt(item[keys[7]]) > 10 &&
          Number.isInteger(Number(item[keys[2]])) &&
          Number(item[keys[2]]) > 0 &&
          Number.isInteger(Number(item[keys[4]])) &&
          Number(item[keys[4]]) > 0 &&
          moment(item[keys[1]], moment.ISO_8601, true).isValid() &&
          moment(item[keys[0]], moment.ISO_8601, true).isValid() &&
          Number.isInteger(
            Number(moment(item[keys[1]]).diff(moment(item[keys[0]])))
          ) &&
          Number(moment(item[keys[1]]).diff(moment(item[keys[0]]))) > 0
        ) {
          var finalJourneyMap = [];
          finalJourneyMap = {
            departureDate: item[keys[0]],
            returnDate: item[keys[1]],
            departureStationId: item[keys[2]],
            departureStationName: item[keys[3]],
            returnStationId: item[keys[4]],
            returnStationName: item[keys[5]],
            coverDistance: item[keys[6]],
            duration: item[keys[7]],
          };
          finalJourneyList.push(finalJourneyMap);
        }
      });

      response.json({
        finalJourneyList,
      });
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  }

  StationList(request, response, next) {
    var keys = [];
    stationList = [];
    var finalStationList = [];
    var finalStationMap;
    fs.createReadStream("Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv")
      .pipe(csv())
      .on("data", (row) => {
        stationList.push(row);
      })
      .on("end", () => {
        stationList.forEach((item, index) => {
          keys = Object.keys(item);
        });
        stationList.forEach((item, index) => {
          if (
            !(isNaN(parseFloat(item[keys[11]])) && isNaN(item[keys[11]] - 0)) &&
            !(isNaN(parseFloat(item[keys[12]])) && isNaN(item[keys[12]] - 0))
          ) {
            finalStationList.push(item);
          }
        });

        console.log(finalStationList.length);
        console.log(finalStationList[0]);

        response.sendStatus(200);
      });
  }

  NewStation(request, response, next) {}

  NewJourney(request, response, next) {}
}

module.exports = new GroupController();
