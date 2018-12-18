const isZero = input => input == 0;

const isInvalidOption = function (givenOption) {
  return givenOption[0] == '-' && givenOption[1] != 'n' && givenOption[1] != 'c' && !parseInt(givenOption);
}

const isInvalidHeadCount = function (count) {
  return isNaN(count) || count < 1;
}

const isInvalidTailCount = function (count) {
  return isNaN(count) || count < 0;
}

const errors = {
  head: function (headData, organizedData, fs) {
    let { existsSync } = fs;
    let { count, files, option } = organizedData;

    if (isZero(headData[0]) || isZero(count)) {
      return 'head: illegal line count -- 0';
    }

    if (isInvalidOption(headData[0])) {
      let errorMsg = 'head: illegal option -- ' + headData[0][1] + '\nusage: head [-n lines | -c bytes] [file ...]';
      return errorMsg;
    }

    if (isInvalidHeadCount(count)) {
      return (option == 'n') ? 'head: illegal line count -- ' + headData[0].slice(2) : 'head: illegal byte count -- ' + headData[0].slice(2);
    }

    if (files.length == 1 && !existsSync(files[0])) {
      return 'head: ' + files[0] + ': No such file or directory';
    }
  },
  tail: function (tailData, organizedData, fs) {
    let { existsSync } = fs;
    let { count, files } = organizedData;

    if (isInvalidOption(tailData[0])) {
      let errorMsg = 'tail: illegal option -- ' + tailData[0][1] + '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      return errorMsg;
    }

    if (isInvalidTailCount(count)) {
      return 'tail: illegal offset -- ' + tailData[0].slice(2);
    }

    if (files.length == 1 && !existsSync(files[0])) {
      return 'tail: ' + files[0] + ': No such file or directory';
    }
  }
}

module.exports = {
  errors
};
