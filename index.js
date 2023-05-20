const express = require("express");

var app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var indexRouter = require("./routes");

app.use("/", indexRouter);
const hostname = "0.0.0.0";
var port = 8080;

app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT || port, hostname, () =>
  console.log(`App is running on port ${port}`)
);
module.exports = app;
