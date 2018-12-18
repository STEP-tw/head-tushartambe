const { errors } = require('./errors.js');
const { parseInputs } = require('./parser.js');

const getHeadData = function (count, contents, separator) {
  return contents.split(separator).slice(0, count).join(separator);
}

const readFileContents = function (fileName, organizedData, readFileSync) {
  const { count, reader, separator } = organizedData;
  return reader(count, readFileSync(fileName, 'utf8'),separator);
}

const readFiles = function (organizedData, funName, fs) {
  let { readFileSync, existsSync } = fs;

  let { files } = organizedData;
  let formatedData = [];
  let delimeter = "";

  for (let counter = 0; counter < files.length; counter++) {
    let fileData = funName + ': ' + files[counter] + ': No such file or directory';

    if (existsSync(files[counter])) {
      fileData = delimeter + '==> ' + files[counter] + ' <==' + '\n';
      fileData += readFileContents(files[counter], organizedData, readFileSync);
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
    return readFileContents(files[0], organizedData, readFileSync);
  }

  return readFiles(organizedData, funName, fs);
}

const head = function (headData, fs) {
  let organizedData = parseInputs(headData);
  let separator = { 'c': "", 'n': "\n" };

  organizedData['separator'] = separator[organizedData['option']];
  organizedData['reader'] = getHeadData;
  
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
  let separator = { 'c': "", 'n': "\n" };

  organizedData['separator'] = separator[organizedData['option']];
  organizedData['reader'] = getTailData;

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