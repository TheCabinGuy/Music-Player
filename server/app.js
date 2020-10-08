const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  optionsSuccessStatus: 200
};

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/Music_Player", {
    useNewUrlParser: true
  })
  .then(() => console.log("connection successful"))
  .catch(err => console.error(err));

const indexRouter = require("./routes/index");
const songs = require("./routes/songs");
const playlists = require("./routes/playlists");
const albums = require("./routes/albums");
const fileGenerator = require("./routes/file");

const app = express();

app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/song", songs);
app.use("/playlist", playlists);
app.use("/album", albums);
app.use("/image", fileGenerator("images"));
app.use("/audio", fileGenerator("audio"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
