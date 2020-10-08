const express = require("express");
const router = express.Router();
const Playlists = require("../models/Playlists");

/* GET ALL Playlists */
router.get("/", function (req, res, next) {
  Playlists.find(function (err, products = []) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Playlist BY ID */

router.get("/:id", function (req, res, next) {
  Playlists.findById(req.params.id, function (err, post = {}) {
    if (err || !post) return next(err);
    post.songPictureURL = `http://localhost:9000/image/${post.songPictureURL}`;
    post.songAudioURL = `http://localhost:9000/audio/${post.songAudioURL}`;
    res.json(post);
  });
});

/* SAVE Playlist */

router.post("/", function (req, res, next) {
  Playlists.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Playlist */

router.put("/:id", function (req, res, next) {
  Playlists.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Playlist */

router.delete("/:id", function (req, res, next) {
  Playlists.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
