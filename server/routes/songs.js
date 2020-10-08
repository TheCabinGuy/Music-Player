const express = require("express");
const router = express.Router();
const Songs = require("../models/Song");

/* GET ALL Songs */
router.get("/", function (req, res, next) {
  Songs.find(function (err, products = []) {
    if (err) return next(err);
    products.forEach(song => {
      (song.songPictureURL = `/image/${song.songPictureURL}`),
        (song.songAudioURL = `/audio/${song.songAudioURL}`);
    });
    res.json(products);
  });
});

/* GET SINGLE Song BY ID */

router.get("/:id", function (req, res, next) {
  Songs.findById(req.params.id, function (err, post = {}) {
    if (err || !post) return next(err);
    post.songPictureURL = `/image/${post.songPictureURL}`;
    post.songAudioURL = `/audio/${post.songAudioURL}`;
    res.json(post);
  });
});

/* SAVE Song */

router.post("/", function (req, res, next) {
  Songs.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Song */

router.put("/:id", function (req, res, next) {
  Songs.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Song */

router.delete("/:id", function (req, res, next) {
  Songs.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
