const fs = require("fs");
const moment = require("moment");
const csvWriter = require("csv-write-stream");
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
            coverDistance: (parseInt(item[keys[6]]) / 1000).toPrecision(2),
            duration: (parseInt(item[keys[7]]) / 60).toPrecision(2),
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
        console.log(keys);
        stationList.forEach((item, index) => {
          if (
            !(isNaN(parseFloat(item[keys[11]])) && isNaN(item[keys[11]] - 0)) &&
            !(isNaN(parseFloat(item[keys[12]])) && isNaN(item[keys[12]] - 0))
          ) {
            finalStationList.push(item);
          }
        });

        console.log(finalStationList.length);
        console.log(finalStationList[0].FID);

        response.json({ finalStationList });
      });
  }

  async NewStation(request, response, next) {
    if (isNaN(parseFloat(request.body.x)) && isNaN(request.body.x - 0)) {
      response.statusCode = 400;
      response.write("X is not a number");
      response.send();
    } else if (isNaN(parseFloat(request.body.y)) && isNaN(request.body.y - 0)) {
      response.statusCode = 400;
      response.write("Y is not a number");
      response.send();
    } else if (
      isNaN(parseFloat(request.body.fid)) &&
      isNaN(request.body.fid - 0)
    ) {
      response.statusCode = 400;
      response.write("FID is not a number");
      response.send();
    } else if (
      isNaN(parseFloat(request.body.id)) &&
      isNaN(request.body.id - 0)
    ) {
      response.statusCode = 400;
      response.write("ID is not a number");
      response.send();
    } else {
      var writer = csvWriter();
      writer = csvWriter({
        sendHeaders: false,
      });
      writer.pipe(
        fs.createWriteStream(
          "Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv",
          {
            flags: "a",
          }
        )
      );
      writer.write({
        header1: `${request.body.fid}`,
        header2: `${request.body.id}`,
        header3: `${request.body.nimi}`,
        header4: `${request.body.namn}`,
        header5: `${request.body.name}`,
        header6: `${request.body.osoite}`,
        header7: `${request.body.address}`,
        header8: `${request.body.kaupunki}`,
        header9: `${request.body.stad}`,
        header10: `${request.body.operaatto}`,
        header11: `${request.body.kapasiteet}`,
        header12: `${request.body.x}`,
        header13: `${request.body.y}`,
      });
      writer.end();

      response.send({
        title: "success",
        statuscode: response.statuscode,
      });
    }
  }

  async NewJourney(request, response, next) {
    var dateDiff =
      Number.isInteger(
        Number(
          moment(request.body.returnDate).diff(
            moment(request.body.departureDate)
          )
        )
      ) &&
      Number(
        moment(request.body.returnDate).diff(moment(request.body.departureDate))
      ) > 0;
    var validDepartureDate = moment(
      request.body.departureDate,
      moment.ISO_8601,
      true
    ).isValid();
    var validReturnDate = moment(
      request.body.returnDate,
      moment.ISO_8601,
      true
    ).isValid();
    var validDepartureId =
      Number.isInteger(Number(request.body.departureId)) &&
      Number(request.body.departureId) > 0;
    var validReturnId =
      Number.isInteger(Number(request.body.returnId)) &&
      Number(request.body.returnId) > 0;

    if (
      parseInt(request.body.coverDistance) < 10 ||
      parseInt(request.body.duration) < 10
    ) {
      response.statusCode = 400;
      response.write("Cover distance or duration is not less than 10");
      response.send();
    } else if (!validDepartureId || !validReturnId) {
      response.statusCode = 400;
      response.write(
        "Departure station id or Return station id is not a positive integer"
      );
      response.send();
    } else if (!validDepartureDate || !validReturnDate) {
      response.statusCode = 400;
      response.write("Not a valid date format");
      response.send();
    } else if (!dateDiff) {
      response.statusCode = 400;
      response.write("Return Time can not be before Departure time");
      response.send();
    } else {
      var writer = csvWriter();
      writer = csvWriter({
        sendHeaders: false,
      });
      writer.pipe(
        fs.createWriteStream("2021-05.csv", {
          flags: "a",
        })
      );

      writer.write({
        header1: `${request.body.departureDate}`,
        header2: `${request.body.returnDate}`,
        header3: `${request.body.departureId}`,
        header4: `${request.body.departureName}`,
        header5: `${request.body.returnId}`,
        header6: `${request.body.returnName}`,
        header7: `${request.body.coverDistance}`,
        header8: `${request.body.duration}`,
      });
      writer.end();

      response.sendStatus(200);
    }
  }

  async FilterJourney(request, response, next) {
    var keys = [];
    journeyList.forEach((item, index) => {
      keys = Object.keys(item);
    });

    var returnListFiltered = journeyList.filter(function (e) {
      // console.log(e);

      return e[keys[5]] === request.body.nimi;
    });
    var departureListFiltered = journeyList.filter(function (e) {
      // console.log(e);

      return e[keys[3]] === request.body.nimi;
    });

    var avgReturnDistance = calculateAvgDistance(returnListFiltered);
    var avgDepartureDistance = calculateAvgDistance(departureListFiltered);
    console.log(departureListFiltered.length);
    console.log(avgDepartureDistance);
    console.log(avgReturnDistance);
    console.log(returnListFiltered.length);
    response.json({
      totalReturn: returnListFiltered.length,
      totalDeparture: departureListFiltered.length,
      avgReturn: avgReturnDistance,
      avgDeparture: avgDepartureDistance,
    });
  }
}
function calculateAvgDistance(filteredList) {
  let avgDistance = 0;
  if (filteredList.length === 0) return 0;
  var keys = [];
  journeyList.forEach((item, index) => {
    keys = Object.keys(item);
  });
  filteredList.forEach((element) => {
    avgDistance += parseFloat(element[keys[6]]);
  });

  return (avgDistance / filteredList.length).toFixed(4);
}

module.exports = new GroupController();
