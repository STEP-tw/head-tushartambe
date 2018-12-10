/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/

const fileReader = require('fs').readFileSync;
const isFileExists = require('fs').existsSync;
const { tail } = require('./src/lib.js');

const main = function(usrInputs) {
  let tailData = usrInputs.slice(2);
  console.log(tail(tailData, fileReader, isFileExists))
}

main(process.argv);
