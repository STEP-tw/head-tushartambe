const { errors } = require('./errors.js');
const { parseInputs } = require('./parser.js');

const getBytes = function (count, contents) {
  return contents.split("").slice(0, count).join("");
}

const getLines = function (count, contents) {
  return contents.split("\n").slice(0, count).join("\n");
}

const readFileContents = function (readFileSync, fileName, organizedData) {
  const { count, reader } = organizedData;
  return reader(count, readFileSync(fileName, 'utf8'));
}

const readFiles = function (organizedData, fs, funName) {
  let { readFileSync, existsSync } = fs;

  let { files } = organizedData;
  let formatedData = [];
  let delimeter = "";

  for (let counter = 0; counter < files.length; counter++) {
    let fileData = funName + ': ' + files[counter] + ': No such file or directory';

    if (existsSync(files[counter])) {
      fileData = delimeter + '==> ' + files[counter] + ' <==' + '\n';
      fileData += readFileContents(readFileSync, files[counter], organizedData);
      delimeter = "\n";
    }
    formatedData.push(fileData);
  }

  return formatedData.join("\n");
}

const getContents = function (organizedData, fs, funName) {
  let { readFileSync } = fs;
  let { files } = organizedData;

  if (files.length == 1) {
    return readFileContents(readFileSync, files[0], organizedData);
  }

  return readFiles(organizedData, fs, funName);
}

const head = function (headData, fs) {
  let organizedData = parseInputs(headData);
  let readerSelector = { 'c': getBytes, 'n': getLines };
  organizedData['reader'] = readerSelector[organizedData['option']];

  let errorMsg = errors['head'](headData, organizedData, fs);

  if (errorMsg) {
    return errorMsg;
  }

  return getContents(organizedData, fs, 'head');
}

const getTailBytes = function (count, contents) {
  if(count == 0){
    return "";
  }
  return contents.split("").slice(-count).join("");
}

const getTailLines = function (count, contents) {
  if(count == 0){
    return "";
  }
  return contents.split("\n").slice(-count).join("\n");
}

const tail = function (tailData, fs) {
  let organizedData = parseInputs(tailData);
  let readerSelector = { 'c': getTailBytes, 'n': getTailLines };
  organizedData['reader'] = readerSelector[organizedData['option']];

  const isZero = input => input == 0;

  if (isZero(tailData[0]) || isZero(organizedData.count)) {
    return '';
  }

  let errorMsg = errors['tail'](tailData, organizedData, fs);

  if (errorMsg) {
    return errorMsg;
  }

  return getContents(organizedData, fs, 'tail');
}

module.exports = {
  parseInputs,
  getBytes,
  getLines,
  getTailBytes,
  getTailLines,
  readFiles,
  readFileContents,
  getContents,
  tail,
  head
};
