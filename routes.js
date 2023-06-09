const express = require("express");

/**
 * Express Router for handling data routes.
 * @type {express.Router}
 */
const router = express.Router();

const DataController = require("./data.controller");

/**
 * GET / - Retrieve the list of journeys.
 * @name GetJourneyList
 * @memberof module:routes/dataRoutes
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.get("/", DataController.JourneyList);

/**
 * POST /JourneyListByPage - Retrieve a paginated list of journeys.
 * @name GetJourneyListByPage
 * @memberof module:routes/dataRoutes
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.post("/JourneyListByPage", DataController.JourneyListByPage);

/**
 * GET /StationList - Retrieve the list of stations.
 * @name GetStationList
 * @memberof module:routes/dataRoutes
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.get("/StationList", DataController.StationList);

/**
 * POST /NewStation - Create a new station.
 * @name CreateNewStation
 * @memberof module:routes/dataRoutes
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.post("/NewStation", DataController.NewStation);

/**
 * POST /NewJourney - Create a new journey.
 * @name CreateNewJourney
 * @memberof module:routes/dataRoutes
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.post("/NewJourney", DataController.NewJourney);

/**
 * POST /FilterJourney - Filter the list of journeys.
 * @name FilterJourney
 * @memberof module:routes/dataRoutes
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.post("/FilterJourney", DataController.FilterJourney);

module.exports = router;
