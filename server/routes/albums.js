const express = require("express");
const router = express.Router();
const Albums = require("../models/Albums");

/* GET ALL Albums */
router.get("/", function (req, res, next) {
  Albums.find(function (err, products = []) {
    if (err) return next(err);
    products.forEach(album => {
      album.albumPicture = `/image/${album.albumPicture}`;
    });
    res.json(products);
  });
});

/* GET SINGLE Album BY ID */

router.get("/:id", function (req, res, next) {
  Albums.findById(req.params.id, function (err, post = {}) {
    if (err || !post) return next(err);
    post.albumPicture = `/image/${post.albumPicture}`;
    res.json(post);
  });
});

/* SAVE Album */

router.post("/", function (req, res, next) {
  Albums.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Album */

router.put("/:id", function (req, res, next) {
  Albums.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Album */

router.delete("/:id", function (req, res, next) {
  Albums.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
