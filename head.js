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
const fs = require('fs');

const {
  separateCmdLineArgs } = require('./src/lib.js');

const readFileContents = function(fileName) {
  return fs.readFileSync(fileName,'utf8');
}

const readFilesAndInputs = function(cmdArgs) {
  cmdLineInputs = seperateCmdArgs(cmdArgs);
  cmdLineInputs.fileContents = cmdLineInputs['files'].map(readFileContents);

  return cmdLineInputs;
}
