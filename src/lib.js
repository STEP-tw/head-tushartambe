const { handleErrors } = require('./errors.js');
const { parseInputs } = require('./parser.js');

const getHeadData = function (count, contents, separator) {
  return contents.split(separator).slice(0, count).join(separator);
}

const readFileContents = function (fileName, organizedData, readFileSync) {
  const { count, reader, separator } = organizedData;
  return reader(count, readFileSync(fileName, 'utf8'), separator);
}

const createHeading = function (name) {
  return '==> ' + name + ' <==';
}

const dataFetcher = function (organizedData, functionName, fs) {
  let delimeter = '';
  let { readFileSync, existsSync } = fs;
  return function (file) {
    if (existsSync(file)) {
      let result = delimeter + createHeading(file) + "\n" + readFileContents(file, organizedData, readFileSync);
      delimeter = '\n';
      return result;
    }
    return functionName + ': ' + file + ': No such file or directory';
  }
}

const readFiles = function (organizedData, functionName, fs) {
  let { files } = organizedData;
  let formatedData = files.map(dataFetcher(organizedData, functionName, fs));

  return formatedData.join("\n");
}

const getContents = function (organizedData, functionName, fs) {
  let { readFileSync } = fs;
  let { files } = organizedData;

  if (files.length == 1) {
    return readFileContents(files[0], organizedData, readFileSync);
  }

  return readFiles(organizedData, functionName, fs);
}

const getTailData = function (count, contents, separator) {
  if (count == 0) {
    return "";
  }
  return contents.split(separator).slice(-count).join(separator);
}

const getReaderFunction = {
  head: getHeadData,
  tail: getTailData
};

const getUtility = function (utility, inputForUtility, fs) {
  let organizedData = parseInputs(inputForUtility);
  let separator = { 'c': "", 'n': "\n" };

  organizedData['separator'] = separator[organizedData['option']];
  organizedData['reader'] = getReaderFunction[utility];

  let errorMsg = handleErrors(organizedData, utility, fs);

  return errorMsg || getContents(organizedData, utility, fs);
}

const tail = getUtility.bind(null, "tail");

const head = getUtility.bind(null, "head");

module.exports = {
  parseInputs,
  getHeadData,
  getTailData,
  readFiles,
  createHeading,
  dataFetcher,
  readFileContents,
  getContents,
  tail,
  head
};