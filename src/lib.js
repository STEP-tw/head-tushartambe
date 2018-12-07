const separateCmdLineArgs = function(cmdArgs) {
  let cmdLineInputs = {
    option: 'n',
    count: 10,
    files: []
  }

  let options = cmdArgs[0].split("");

  if(options[0] == '-' && options.length > 2) {
    +options[1] && (cmdLineInputs.option = 'n' , cmdLineInputs.count = +options.slice(1).join(""));
    +options[1] || (cmdLineInputs.option = options[1] , cmdLineInputs.count = +options.slice(2).join("")) ;

    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if(options[0] == '-' && options.length == 2) {
    +options[1] || (cmdLineInputs.option = options[1],cmdLineInputs.count = cmdArgs[1],cmdLineInputs.files = cmdArgs.slice(2));
    +options[1] && (cmdLineInputs.option = 'n', cmdLineInputs.count =options[1], cmdLineInputs.files = cmdArgs.slice(1));
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

const isZero = input => input == 0;

const isInvalidOption = function(givenOption) {
  return givenOption[0] == '-' && givenOption[1] != 'n' && givenOption[1] != 'c' && !parseInt(givenOption);
}

const isInvalidCount = function(count) {
  return isNaN(count - 0) || count < 1;
}

const readFilesAndErrorHandler = function(headData,organizedData,fileReader,isFileExists) {
  let { option, count, files, readerSelector } = organizedData;

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

  if(files.length == 1 ) {
    if(!isFileExists(files[0])){
      return 'head: '+files[0]+': No such file or directory'
    }
    return readFileContents(fileReader,files[0],organizedData);
  }

  return readFile(organizedData,fileReader,isFileExists);
}

const head = function(headData,fileReader,isFileExists) {
  let organizedData = separateCmdLineArgs(headData);
  let readerSelector = { 'c':getBytes,'n':getLines }
  organizedData['readerSelector'] = readerSelector[organizedData['option']];

  return readFilesAndErrorHandler(headData,organizedData,fileReader,isFileExists);
}

module.exports = {
  separateCmdLineArgs,
  getBytes,
  getLines,
  readFile,
  readFileContents,
  head };
