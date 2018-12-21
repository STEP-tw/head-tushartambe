const isStartsWithHypen = function (givenOption) {
  return givenOption[0] == '-';
}

const isNumberOption = function (input) {
  return isStartsWithHypen(input) && !isNaN(input);
}

const isCharacterOption = function (givenOption) {
  let isNotAlphabet = !givenOption[1].match(/[A-z]/)
  let length = givenOption.length;
  return !isNotAlphabet && (length == 2);
}

const isOptionWithCount = function (givenOption) {
  let isOption = isCharacterOption(givenOption.slice(0, 2));
  return isOption && (givenOption.length > 2);
}

const createObject = function (option, count, files) {
  return { 'option': option, 'count': count, 'files': files };
}

const parseInputs = function (cmdArgs) {
  let cmdLineInputs = {};
  let option = cmdArgs[0][1];
  let files = cmdArgs.slice(1);

  if (isNumberOption(cmdArgs[0])) {
    option = 'n';
    count = Math.abs(cmdArgs[0]);
    cmdLineInputs = createObject(option, count, files);
  }

  if (isCharacterOption(cmdArgs[0])) {
    count = cmdArgs[1];
    files = cmdArgs.slice(2);
    cmdLineInputs = createObject(option, count, files);
  }

  if (isOptionWithCount(cmdArgs[0])) {
    count = cmdArgs[0].slice(2);
    cmdLineInputs = createObject(option, count, files);
  }

  if (!isStartsWithHypen(cmdArgs[0])) {
    option = 'n';
    count = 10;
    files = cmdArgs.slice(0);
    cmdLineInputs = createObject(option, count, files);
  }

  return cmdLineInputs;
}

module.exports = {
  parseInputs
};
