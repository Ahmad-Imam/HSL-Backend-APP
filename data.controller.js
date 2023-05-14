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
    const PAGE_SIZE = 100;
    try {
      const pageNumber = parseInt(request.body.pageNumber) || 1;
      const startIndex = (pageNumber - 1) * PAGE_SIZE;
      const endIndex = pageNumber * PAGE_SIZE;

      const paginatedJourneyList = journeyList.slice(startIndex, endIndex);

      var finalJourneyList = [];
      paginatedJourneyList.forEach((item, index) => {
        finalJourneyList.push(item);
      });

      response.json({
        journeyList: paginatedJourneyList.length,
        finaljourneyListLength: finalJourneyList.length,
        currentPage: pageNumber,
        totalPages: Math.ceil(journeyList.length / PAGE_SIZE),
        finaljourneyList: finalJourneyList,
      });
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  }

  StationList(request, response, next) {}

  NewStation(request, response, next) {}

  NewJourney(request, response, next) {}
}

module.exports = new GroupController();
