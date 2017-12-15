#!/usr/bin/env node

var fs = require('fs');
var commander = require('commander');
var lib = require('./lib/textavatar');
var winston = require("winston");

//////////

var main = exports.main = function main () {
    commander
        .version(require("./package.json").version)
        .description('Text Avatar(one or twe word) Generation')
        .option('-t --text <text>', 'one or twe word. ex) fk', String, "")
        .option('-o --out <out>', 'Write file path', String, "output.png")
        .parse(process.argv)
    ;
    if (!commander.text) {
        console.log("[ERROR] --text option not found.");
        return 
    }
    console.log("[INFO ] options:", commander.text, commander.out)
    lib.genTextAvatar(commander.text, commander.out, 200, function () {
      var buf = fs.readFileSync(commander.out);
      winston.info(`output image file :( ${commander.out}`)
    })

};

main(); // main()