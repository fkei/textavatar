var fs = require("fs");
var PImage = require("pureimage");
var winston = require("winston");

var colors = [
  "#2980b9",
  "#4753a2",
  "#1940c5",
  "#0801a9",
  "#1abc9c",
  "#2ecc71",
  "#6e9d38",
  "#00a968",
  "#34495e",
  "#600714",
  "#7a2403",
  "#6c3d15",
  "#7f8c8d",
  "#594255",
  "#c0392b",
  "#bca57c",
  "#d48c7e",
  "#e07095",
  "#841a75",
  "#e67e22",
  "#9b59b6",
  "#d427b1",
  "#f1c40f",
  "#e5a323",
  "#00533f",
  "#24140e"
];

function getColor(text) {
  var idx = text.charCodeAt() % colors.length
  return colors[idx]
}

function genTextAvatar(text, outputFilePath, size, callback) {
  var img = PImage.make(size, size);
  var ctx = img.getContext('2d');

  var font = PImage.registerFont(`${__dirname}/../public/font/SourceSansPro-Regular.ttf`, 'Source Sans Pro');
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

module.exports = {
    genTextAvatar: genTextAvatar
}