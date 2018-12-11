const isOption = function(input) {
  return input[0] == '-';
}

const isCountOption = function(input) {
  return isOption(input) && input.length > 2;
}

const isCharacterOption = function(input) {
  return isOption(input) && input.length == 2 && !isZero(input[1]);
} 

const isOptionZero = function(input) {
  return isOption(input) && input.length == 2 && isZero(input[1]);
}

const isZero = input => input == 0;

const isInvalidOption = function(givenOption) {
  return givenOption[0] == '-' && givenOption[1] != 'n' && givenOption[1] != 'c' && !parseInt(givenOption);
}

const isInvalidCount = function(count) {
  return isNaN(count - 0) || count < 1;
}

module.exports = {
  isZero,
  isOption,
  isCountOption,
  isCharacterOption,
  isOptionZero,
  isInvalidOption,
  isInvalidCount
};
