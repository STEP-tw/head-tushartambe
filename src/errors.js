const isZero = input => input == 0;

const isInvalidOption = function (givenOption) {
  return givenOption[0] == '-' && givenOption[1] != 'n' && givenOption[1] != 'c' && !parseInt(givenOption);
}

const isInvalidCount = function (count) {
  return isNaN(count) || count < 1;
}

const errors = {
  head: function (headData, organizedData, isFileExists) {
    let { count, files, option } = organizedData;

    if (isZero(headData[0]) || isZero(count)) {
      return 'head: illegal line count -- 0';
    }

    if (isInvalidOption(headData[0])) {
      let errorMsg = 'head: illegal option -- ' + headData[0][1] + '\nusage: head [-n lines | -c bytes] [file ...]';
      return errorMsg;
    }

    if (isInvalidCount(count)) {
      return (option == 'n') ? 'head: illegal line count -- ' + headData[0].slice(2) : 'head: illegal byte count -- ' + headData[0].slice(2);
    }

    if (files.length == 1 && !isFileExists(files[0])) {
      return 'head: ' + files[0] + ': No such file or directory';
    }
  },
  tail: function (tailData, organizedData, isFileExists) {
    let { count, files } = organizedData;

    if (isInvalidOption(tailData[0])) {
      let errorMsg = 'tail: illegal option -- ' + tailData[0][1] + '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      return errorMsg;
    }

    if (isInvalidCount(count)) {
      return 'tail: illegal offset -- ' + tailData[0].slice(2);
    }

    if (files.length == 1 && !isFileExists(files[0])) {
      return 'tail: ' + files[0] + ': No such file or directory';
    }
  }
}

module.exports = {
  errors
};
