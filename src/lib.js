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

const head = function(headData,fileReader,isFileExists) {

}

module.exports = {
  separateCmdLineArgs,
  getBytes,
  getLines };
