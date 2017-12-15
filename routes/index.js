var express = require('express');
var router = express.Router();

var PImage = require("pureimage");
var fs = require("fs");
var winston = require("winston");

var cache = {};

var colors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d"
];

function getColor(text) {
  var idx = text.charCodeAt() % colors.length
  return colors[idx]
}

function genTextAvatar(text, outputFilePath, size, callback) {
  var img = PImage.make(size, size);
  var ctx = img.getContext('2d');

  var font = PImage.registerFont('public/font/SourceSansPro-Regular.ttf', 'Source Sans Pro');
  font.load(function () {
    ctx.fillStyle = getColor(text);
    ctx.fillRect(0, 0, size, size);
    ctx.font = `${size / 1.5}pt 'Source Sans Pro'`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(text.substring(0, 2).toUpperCase(), size / 6, size / 1.4);

    PImage.encodePNGToStream(img, fs.createWriteStream(outputFilePath)).then(() => {
      winston.debug(`wrote out the png file to ${outputFilePath}`);
      callback(outputFilePath)
    }).catch((e) => {
      winston.error("there was an error writing", e);
      callback(emptyOutputFilePath)
    });
  });
}

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

  genTextAvatar(text, outputFilePath, size, function (outputFilePath) {
    var buf = fs.readFileSync(outputFilePath);
    cache[outputFilePath] = buf
    res.append('Content-Type', 'image/png');
    res.status(200).send(buf);
  })
});


// !!!!!!
// make empty
var emptyOutputFilePath = `${__dirname}/../public/cache/empty.png`
genTextAvatar("", emptyOutputFilePath, 200, function () {
  var buf = fs.readFileSync(emptyOutputFilePath);
  cache[emptyOutputFilePath] = buf
  winston.info(`make empty image file :( ${emptyOutputFilePath}`)
})

module.exports = router;
