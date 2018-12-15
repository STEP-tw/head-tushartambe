const isZero = input => input == 0;
const isNumber = function (input) {
  return !isNaN(input);
}

const isOnlyOption = function (input) {
  let options = ['-n', '-c'];
  return options.includes(input);
}

const isOptionWithNumber = function (input) {
  let isOption = isOnlyOption(input.slice(0, 2));
  return isOption && isNumber(parseInt(input.slice(2)));
}

const isOptionWithInvalidCount = function (input) {
  let isOption = isOnlyOption(input.slice(0, 2));
  return isOption && isNaN(input.slice(2));
}

const separateCmdLineArgs = function (cmdArgs) {
  let cmdLineInputs = {
    option: 'n',
    count: 10,
    files: []
  };

  //let options = cmdArgs[0].split("");

  if (isNumber(cmdArgs[0])) {
    cmdLineInputs.option = 'n';
    cmdLineInputs.count = Math.abs(cmdArgs[0]);
    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if (isOnlyOption(cmdArgs[0])) {
    cmdLineInputs.option = cmdArgs[0][1];
    cmdLineInputs.count = cmdArgs[1]
    cmdLineInputs.files = cmdArgs.slice(2);
  }

  if (isOptionWithNumber(cmdArgs[0])) {
    cmdLineInputs.option = cmdArgs[0][1];
    cmdLineInputs.count =   cmdArgs[0].slice(2);
    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if (isOptionWithInvalidCount(cmdArgs[0])) {
    cmdLineInputs.option = cmdArgs[0][1];
    cmdLineInputs.count =   cmdArgs[0].slice(2);
    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if (!cmdArgs[0].includes('-')) {
    cmdLineInputs.files = cmdArgs.slice(0);
    cmdLineInputs.option = 'n';
    cmdLineInputs.count = 10;
  }
  return cmdLineInputs;
}

module.exports = {
  separateCmdLineArgs
};
