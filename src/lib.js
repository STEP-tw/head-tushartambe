const { errors } = require('./errors.js');
const { parseInputs } = require('./parser.js');

const getBytes = function (count, contents) {
  return contents.split("").slice(0, count).join("");
}

const getLines = function (count, contents) {
  return contents.split("\n").slice(0, count).join("\n");
}

const readFileContents = function (fileReader, fileName, organizedData) {
  const { count, reader } = organizedData;
  return reader(count, fileReader(fileName, 'utf8'));
}

const readFiles = function (organizedData, fileReader, isFileExists, funName) {
  let { files } = organizedData;
  let formatedData = [];
  let delimeter = "";

  for (let counter = 0; counter < files.length; counter++) {
    let fileData = funName + ': ' + files[counter] + ': No such file or directory';

    if (isFileExists(files[counter])) {
      fileData = delimeter + '==> ' + files[counter] + ' <==' + '\n';
      fileData += readFileContents(fileReader, files[counter], organizedData);
      delimeter = "\n";
    }
    formatedData.push(fileData);
  }

  return formatedData.join("\n");
}

const getContents = function (organizedData, fileReader, isFileExists, funName) {
  let { files } = organizedData;

  if (files.length == 1) {
    return readFileContents(fileReader, files[0], organizedData);
  }

  return readFiles(organizedData, fileReader, isFileExists, funName);
}

const head = function (headData, fileReader, isFileExists) {
  let organizedData = parseInputs(headData);
  let readerSelector = { 'c': getBytes, 'n': getLines };
  organizedData['reader'] = readerSelector[organizedData['option']];

  let errorMsg = errors['head'](headData, organizedData, isFileExists);

  if (errorMsg ) {
    return errors['head'](headData, organizedData, isFileExists);
  }

  return getContents(organizedData, fileReader, isFileExists, 'head');
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

const tail = function (tailData, fileReader, isFileExists) {
  let organizedData = parseInputs(tailData);
  let readerSelector = { 'c': getTailBytes, 'n': getTailLines };
  organizedData['reader'] = readerSelector[organizedData['option']];

  const isZero = input => input == 0;

  if (isZero(tailData[0]) || isZero(organizedData.count)) {
    return '';
  }

  let errorMsg = errors['tail'](tailData, organizedData, isFileExists);

  if (errorMsg) {
    return errors['tail'](tailData, organizedData, isFileExists);
  }

  return getContents(organizedData, fileReader, isFileExists, 'tail');
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
