const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  songName: String,
  artist: String,
  songPictureURL: String,
  songAudioURL: String
});

module.exports = mongoose.model("Song", SongSchema);
