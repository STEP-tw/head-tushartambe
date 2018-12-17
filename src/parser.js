const isStartsWithHypen = function(givenOption) { 
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

const createObject = function(option, count, files) {
  return { 'option': option, 'count': count, 'files': files };
} 

const parseInputs = function (cmdArgs) {
  let cmdLineInputs = {};

  if (isNumberOption(cmdArgs[0])) {
    cmdLineInputs = createObject('n', Math.abs(cmdArgs[0]), cmdArgs.slice(1));
  }

  if (isCharacterOption(cmdArgs[0])) {
     cmdLineInputs = createObject(cmdArgs[0][1], cmdArgs[1], cmdArgs.slice(2));
  }

  if (isOptionWithCount(cmdArgs[0])) {
    cmdLineInputs = createObject(cmdArgs[0][1], cmdArgs[0].slice(2), cmdArgs.slice(1));
  }
  
  if (!isStartsWithHypen(cmdArgs[0])) {
    cmdLineInputs = createObject('n', 10, cmdArgs.slice(0));
  }

  return cmdLineInputs;
}

module.exports = {
  parseInputs
};
