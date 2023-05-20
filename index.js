/**
 * Module dependencies.
 */
const express = require("express");

/**
 * Express app configuration.
 */
var app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * Routes
 */
var indexRouter = require("./routes");

app.use("/", indexRouter);

/**
 * Error handling middleware
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Start the server
 */
const hostname = "0.0.0.0";
var port = 8080;

app.listen(process.env.PORT || port, hostname, () =>
  console.log(`App is running on port ${port}`)
);

module.exports = app;
