const  {
  isCountOption,
  isCharacterOption,
  isOptionZero } = require('./util.js');

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

module.exports = {
  separateCmdLineArgs
};
