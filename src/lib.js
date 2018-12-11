const  {
  isOption,
  isCountOption,
  isCharacterOption,
  isOptionZero,
  isZero } = require('./util.js');

const separateCmdLineArgs = function(cmdArgs) {
  let cmdLineInputs = {
    option: 'n',
    count: 10,
    files: []
  }

  let options = cmdArgs[0].split("");

  if(isCountOption(options)) {
    +options[1] && (cmdLineInputs.option = 'n' , cmdLineInputs.count = +options.slice(1).join(""));
    +options[1] || (cmdLineInputs.option = options[1] , cmdLineInputs.count = +options.slice(2).join("")) ;

    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if(isCharacterOption(options)) {
    +options[1] || (cmdLineInputs.option = options[1],cmdLineInputs.count = cmdArgs[1],cmdLineInputs.files = cmdArgs.slice(2));
    +options[1] && (cmdLineInputs.option = 'n', cmdLineInputs.count =options[1], cmdLineInputs.files = cmdArgs.slice(1));
  }

  if(isOptionZero(options)) {
    cmdLineInputs.option = 'n';
    cmdLineInputs.count = 0;
    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if(!options.includes('-')){
    cmdLineInputs.files = cmdArgs.slice(0);
    cmdLineInputs.option = 'n';
    cmdLineInputs.count = 10;
  }
  return cmdLineInputs;
}

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

const readFile = function(organizedData,fileReader,isFileExists) {
  let { option, count, files, readerSelector } = organizedData;
  let formatedData =[];
  let delimeter = "";

  for(let counter = 0; counter < files.length; counter++){
    if(isFileExists(files[counter])) {
      formatedData.push(delimeter+'==> '+files[counter]+' <==');
      formatedData.push(readFileContents(fileReader,files[counter],organizedData)); 
      delimeter = "\n";
    } else {
      formatedData.push('head: '+files[counter]+': No such file or directory');
    }
  }

  return formatedData.join("\n");
}

const isInvalidOption = function(givenOption) {
  return givenOption[0] == '-' && givenOption[1] != 'n' && givenOption[1] != 'c' && !parseInt(givenOption);
}

const isInvalidCount = function(count) {
  return isNaN(count - 0) || count < 1;
}

const errors = {
  head : function(headData,organizedData,isFileExists) {
    let { count, files, option} = organizedData;

    if( isZero(headData[0]) || isZero(count) ){
      return 'head: illegal line count -- 0'
    }

    if(isInvalidOption(headData[0])){
      let errorMsg = 'head: illegal option -- '+headData[0][1]+'\nusage: head [-n lines | -c bytes] [file ...]';
      return errorMsg;
    }

    if(isInvalidCount(count)) {
      return (option == 'n') ? 'head: illegal line count -- '+headData[0].slice(2) : 'head: illegal byte count -- '+headData[0].slice(2);
    }

    if(files.length == 1 && !isFileExists(files[0])){
      return 'head: '+files[0]+': No such file or directory'
    }
  },
  tail : function(headData,organizedData,isFileExists) {
    let { count, files, option} = organizedData;

    if( isZero(headData[0]) || isZero(count) ){
      return '';
    }

    if(isInvalidOption(headData[0])){
      let errorMsg = 'tail: illegal option -- '+headData[0][1]+'\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      return errorMsg;
    }

    if(isInvalidCount(count)) {
      return 'tail: illegal offset -- '+headData[0].slice(2);
    }

    if(files.length == 1 && !isFileExists(files[0])){
      return 'tail: '+files[0]+': No such file or directory'
    }
  }
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

  return readFile(organizedData,fileReader,isFileExists);
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
