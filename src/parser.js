const isNumber = function (input) {
  return !isNaN(input);
}

const isCharacterOption = function (input) {
  let isNotAlphabet = !input[1].match(/^[a-zA-Z]+$/)
  let length = input.length;
  return !isNotAlphabet && (length == 2);
}

const isOptionWithNumber = function (input) {
  let isOption = isCharacterOption(input.slice(0, 2));
  return isOption && isNumber(parseInt(input.slice(2)));
}

const isOptionWithInvalidCount = function (input) {
  let isOption = isCharacterOption(input.slice(0, 2));
  return isOption && isNaN(input.slice(2));
}

const parseInputs = function (cmdArgs) {
  let cmdLineInputs = {
    option: 'n',
    count: 10,
    files: []
  };

  if (isNumber(cmdArgs[0])) {
    cmdLineInputs.option = 'n';
    cmdLineInputs.count = Math.abs(cmdArgs[0]);
    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if (isCharacterOption(cmdArgs[0])) {
    cmdLineInputs.option = cmdArgs[0][1];
    cmdLineInputs.count = cmdArgs[1]
    cmdLineInputs.files = cmdArgs.slice(2);
  }

  if (isOptionWithNumber(cmdArgs[0])) {
    cmdLineInputs.option = cmdArgs[0][1];
    cmdLineInputs.count = cmdArgs[0].slice(2);
    cmdLineInputs.files = cmdArgs.slice(1);
  }

  if (isOptionWithInvalidCount(cmdArgs[0])) {
    cmdLineInputs.option = cmdArgs[0][1];
    cmdLineInputs.count = cmdArgs[0].slice(2);
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
  parseInputs
};
