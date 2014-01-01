var fs = require ('fs');
var Buffer = require('buffer').Buffer;
var Iconv  = require('iconv').Iconv;
var assert = require('assert');

var charsetDetector = require("node-icu-charset-detector");

var buffer = fs.readFileSync("subtitle.srt");
var charset = charsetDetector.detectCharset(buffer);

var iconv = new Iconv('ISO-8859-1', 'UTF8');

var sub = fs.readFileSync('subtitle.srt').toString();

var convertedSub = iconv.convert(sub);

console.log (convertedSub.toString());
console.log("charset name: " + charset.toString());
console.log("language: " + charset.language);
console.log("detection confidence: " + charset.confidence);
console.log ('não');

fs.writeFile('subtitle.srt', convertedSub, function (err) {
 if (err) throw err;
 console.log('It\'s saved!');
});