const mongoose = require("mongoose");

const playListSchema = new mongoose.Schema({
  playlistName: String,
  songIds: [String]
});

module.exports = mongoose.model("Playlist", playListSchema);
