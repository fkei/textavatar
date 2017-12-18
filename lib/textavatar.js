var fs = require("fs");
var PImage = require("pureimage");
var winston = require("winston");
var crypto = require('crypto');

var colors = [
  "#2980b9",
  "#4753a2",
  "#6e9d38",
  "#00533f",
  "#34495e",
  "#600714",
  "#6c3d15",
  "#7f8c8d",
  "#594255",
  "#c0392b",
  "#bca57c",
  "#d48c7e",
  "#841a75",
  "#e67e22",
  "#d427b1",
  "#e5a323"
];

function getColor(text) {
  var idx = crypto.createHash('sha1').update(text).digest('hex').charCodeAt() % colors.length;
  return colors[idx];
}

function genTextAvatar(text, outputFilePathOrStream, size, callback) {
  var img = PImage.make(size, size);
  var ctx = img.getContext('2d');

  var font = PImage.registerFont(`${__dirname}/../public/font/SourceSansPro-Regular.ttf`, 'Source Sans Pro');
  font.load(function () {
    ctx.fillStyle = getColor(text);
    ctx.fillRect(0, 0, size, size);
//    ctx.font = `${size / 1.5}pt 'Source Sans Pro'`;
    var fontSize = size / 1.5
    ctx.font = `${fontSize}pt 'Source Sans Pro'`;
    ctx.fillStyle = "#FFFFFF";
//    ctx.fillText(text.substring(0, 2).toUpperCase(), size / 6, size / 1.4);
    var t = text.substring(0, 2).toUpperCase();

    console.log(size , fontSize)
    if (t.length == 2) { // 2
        ctx.fillText(t, (size /2) - (fontSize / 1.8), size / 1.4);
    } else if (t.length == 1) { // 1
        ctx.fillText(t, size / 2 - (fontSize / 4), size / 1.4);
    } else { // 0
        ctx.fillText(t, 0, 0);
    }

    let writeStream;
    if (typeof outputFilePathOrStream === 'string') {
      writeStream = fs.createWriteStream(outputFilePathOrStream);
    } else {
      writeStream = outputFilePathOrStream;
    }

    PImage.encodePNGToStream(img, writeStream).then(() => {
      winston.debug(`wrote out the png file to ${outputFilePathOrStream}`);
      callback(outputFilePathOrStream)
    }).catch((e) => {
      winston.error("there was an error writing", e);
      callback(outputFilePathOrStream)
    });
  });
}

module.exports = {
    genTextAvatar: genTextAvatar
}
