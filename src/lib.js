const  {
  isOption,
  isCountOption,
  isCharacterOption,
  isOptionZero,
  isZero,
  isInvalidOption,
  isInvalidCount } = require('./util.js');

const { errors } = require('./errors.js');
const { separateCmdLineArgs } = require('./parser.js');

const getBytes = function(count,contents) {
  return contents.split("").slice(0,count).join("");
}

const getLines = function(count,contents) {
  return contents.split("\n").slice(0,count).join("\n");
}

const readFileContents = function(fileReader,fileName,organizedData) {
  const {count , readerSelector } = organizedData;
  return readerSelector(count, fileReader(fileName,'utf8'))
}

const readFile = function(organizedData,fileReader,isFileExists,funName) {
  let { option, count, files, readerSelector } = organizedData;
  let formatedData =[];
  let delimeter = "";

  for(let counter = 0; counter < files.length; counter++){
    if(isFileExists(files[counter])) {
      formatedData.push(delimeter+'==> '+files[counter]+' <==');
      formatedData.push(readFileContents(fileReader,files[counter],organizedData)); 
      delimeter = "\n";
    } else {
      formatedData.push(funName+': '+files[counter]+': No such file or directory');
    }
  }

  return formatedData.join("\n");
}

const readFilesAndErrorHandler = function(headData,organizedData,fileReader,isFileExists,funName) {
  let { option, count, files, readerSelector } = organizedData;

  let errorMsg = errors[funName](headData,organizedData,isFileExists);

  if(errorMsg || errorMsg == "") {
    return  errors[funName](headData,organizedData,isFileExists)
  }

  if(files.length == 1 ) {
    return readFileContents(fileReader,files[0],organizedData);
  }

  return readFile(organizedData,fileReader,isFileExists,funName);
}

const head = function(headData,fileReader,isFileExists) {
  let organizedData = separateCmdLineArgs(headData);
  let readerSelector = { 'c':getBytes,'n':getLines }
  organizedData['readerSelector'] = readerSelector[organizedData['option']];

  return readFilesAndErrorHandler(headData,organizedData,fileReader,isFileExists,'head');
}

const getTailBytes = function(count,contents) {
  return contents.split("").slice(-count).join("");
}

const getTailLines = function(count,contents) {
  return contents.split("\n").slice(-count).join("\n");
}

const tail = function(tailData,fileReader,isFileExists) {
  let organizedData = separateCmdLineArgs(tailData);
  let readerSelector = { 'c':getTailBytes,'n':getTailLines }
  organizedData['readerSelector'] = readerSelector[organizedData['option']];

  return readFilesAndErrorHandler(tailData,organizedData,fileReader,isFileExists,'tail');
}

module.exports = {
  separateCmdLineArgs,
  getBytes,
  getLines,
  readFile,
  readFileContents,
  tail,
  head };
