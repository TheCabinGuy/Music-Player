const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  albumName: String,
  albumPicture: String,
  songIds: [String]
});

module.exports = mongoose.model("Album", albumSchema);
