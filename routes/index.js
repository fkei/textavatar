var express = require('express');
var router = express.Router();
var lib = require('../lib/textavatar');

var fs = require("fs");
var winston = require("winston");

var cache = {};

/* GET home page. */
router.get('/:text', function (req, res, next) {
  var text = req.params.text || "";
  var size = req.query.size || 200;
  var outputFilePath = `${__dirname}/../public/cache/${text}@${size}.png`

  var hit = cache[outputFilePath];
  if (hit) {
    winston.info(`Cache hit :) ${outputFilePath}`)
    res.append('Content-Type', 'image/png');
    res.status(200).send(hit);
    return;
  } else {
    winston.info(`Cache not hit :( ${outputFilePath}`)
  }

  lib.genTextAvatar(text, outputFilePath, size, function (outputFilePath) {
      var buf = fs.readFileSync(outputFilePath);
    cache[outputFilePath] = buf
    res.append('Content-Type', 'image/png');
    res.status(200).send(buf);
  })
});


// !!!!!!
// make empty
var emptyOutputFilePath = `${__dirname}/../public/cache/empty.png`
lib.genTextAvatar("", emptyOutputFilePath, 200, function () {
  var buf = fs.readFileSync(emptyOutputFilePath);
  cache[emptyOutputFilePath] = buf
  winston.info(`make empty image file :( ${emptyOutputFilePath}`)
})

module.exports = router;
