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

module.exports = {
  isZero,
  isOption,
  isCountOption,
  isCharacterOption,
  isOptionZero
};
