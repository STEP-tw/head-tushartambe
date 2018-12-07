const separateCmdLineArgs = function(cmdArgs) {
  let cmdLineInputs = {
    option: 'n',
    count: 10,
    files: []
  }

  let options = cmdArgs[2].split("");

  if(options[0] == '-' && options.length > 2) {
    +options[1] && (cmdLineInputs.option = 'n' , cmdLineInputs.count = +options.slice(1).join(""));
    +options[1] || (cmdLineInputs.option = options[1] , cmdLineInputs.count = +options.slice(2).join("")) ;

    cmdLineInputs.files = cmdArgs.slice(3);
  }

  if(options[0] == '-' && options.length == 2) {
    +options[1] || (cmdLineInputs.option = options[1],cmdLineInputs.count = cmdArgs[3],cmdLineInputs.files = cmdArgs.slice(4));
    +options[1] && (cmdLineInputs.option = 'n', cmdLineInputs.count =options[1], cmdLineInputs.files = cmdArgs.slice(3));
  }

  if(!options.includes('-')){
    cmdLineInputs.files = cmdArgs.slice(2);
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

const head = function(headData,fileReader,isFileExists) {
  let organizedData = separateCmdLineArgs(headData);
  let readerSelector = { 'c':getBytes,'n':getLines }
  organizedData['readerSelector'] = readerSelector[organizedData['option']];
  
  if( headData[2] == 0 || organizedData.count == 0 ){
    return 'head: illegal line count -- 0'
  }
  
  if(headData[2][0]=='-' && headData[2][1] !='n' && headData[2][1] != 'c' && !parseInt(headData[2])){
    return 'head: illegal option -- '+headData[2][1]+'\nusage: head [-n lines | -c bytes] [file ...]'
  }
  
  if(isNaN(organizedData.count-0) ||organizedData.count < 1) {
    return (organizedData.option == 'n') ? 'head: illegal line count -- ' + headData[2].slice(2) : 'head: illegal byte count -- ' + headData[2].slice(2);
  }

  if(organizedData['files'].length == 1 ) {
    if(!isFileExists(organizedData.files[0])){
      return 'head: '+organizedData.files[0]+': No such file or directory'
    }
    return readFileContents(fileReader,organizedData.files[0],organizedData);
  }

  return readFile(organizedData,fileReader,isFileExists);
}

module.exports = {
  separateCmdLineArgs,
  getBytes,
  getLines,
  readFile,
  readFileContents,
  head };
