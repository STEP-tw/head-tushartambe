const { errors } = require('./errors.js');
const { parseInputs } = require('./parser.js');

const getHeadData = function (count, contents, separator) {
  return contents.split(separator).slice(0, count).join(separator);
}

const readFileContents = function (fileName, organizedData, readFileSync) {
  const { count, reader, separator } = organizedData;
  return reader(count, readFileSync(fileName, 'utf8'),separator);
}

const createHeading = function(name) {
  return '==> ' + name + ' <==';
}

const fileNotExistsError = function(funName, fileName) {
  return funName + ': ' + fileName + ': No such file or directory';
}

const dataFetcher = function(organizedData, funName, fs) {
  let delimeter = '';
  let { readFileSync, existsSync } = fs;
  return function(file) {
    if(existsSync(file)) {
      let result =  delimeter+createHeading(file) + "\n" + readFileContents(file, organizedData, readFileSync);
      delimeter = '\n';
      return result;
    }
    return fileNotExistsError(funName,file);
  }
}

const readFiles = function (organizedData, funName, fs) {
  let { files } = organizedData;
  let formatedData = files.map(dataFetcher(organizedData, funName, fs));

  return formatedData.join("\n");
}

const getContents = function (organizedData, funName, fs) {
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
  
  let errorMsg = errors['head'](organizedData, fs);

  return errorMsg || getContents(organizedData, 'head', fs);
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

  let errorMsg = errors['tail'](organizedData, fs);

  return errorMsg || getContents(organizedData, 'tail', fs);
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