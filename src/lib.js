const { errors } = require('./errors.js');
const { parseInputs } = require('./parser.js');

const getHeadData = function (count, contents, separator) {
  return contents.split(separator).slice(0, count).join(separator);
}

const readFileContents = function (readFileSync, fileName, organizedData) {
  const { count, reader, separator } = organizedData;
  return reader(count, readFileSync(fileName, 'utf8'),separator);
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
  let readerSelector = { 'c': getHeadData, 'n': getHeadData };
  let separator = { 'c': "", 'n': "\n" };

  organizedData['reader'] = readerSelector[organizedData['option']];
  organizedData['separator'] = separator[organizedData['option']];
  
  let errorMsg = errors['head'](headData, organizedData, fs);

  if (errorMsg) {
    return errorMsg;
  }

  return getContents(organizedData, fs, 'head');
}

const getTailData = function (count, contents, separator) {
  if(count == 0){
    return "";
  }
  return contents.split(separator).slice(-count).join(separator);
}

const tail = function (tailData, fs) {
  let organizedData = parseInputs(tailData);
  let readerSelector = { 'c': getTailData, 'n': getTailData };
  let separator = { 'c': "", 'n': "\n" };

  organizedData['reader'] = readerSelector[organizedData['option']];
  organizedData['separator'] = separator[organizedData['option']];

  let errorMsg = errors['tail'](tailData, organizedData, fs);

  if (errorMsg) {
    return errorMsg;
  }

  return getContents(organizedData, fs, 'tail');
}

module.exports = {
  parseInputs,
  getHeadData,
  getTailData,
  readFiles,
  readFileContents,
  getContents,
  tail,
  head
};