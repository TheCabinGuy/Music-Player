const express = require("express");
const router = express.Router();
const path = require("path");

const getFileGenerator = type => {
  /* GET File by ID */
  router.get("/:name", function (req, res, next) {
    const options = {
      root: path.resolve(`./public/${type}`),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
      }
    };

    const fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  });

  return router;
};

module.exports = getFileGenerator;
