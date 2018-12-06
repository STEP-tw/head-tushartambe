/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/
const fileReader = require('fs').readFileSync;
const isFileExists = require('fs').existsSync;
const { head } = require('./src/lib.js');

const main = function(usrInputs) {
  console.log(head(usrInputs, fileReader, isFileExists))
}

main(process.argv);
