const isZero = input => input == 0;

const isInvalidOption = function (givenOption) {
  let validOptios  = [ 'c', 'n' ];
  return !validOptios.includes(givenOption);
}

const isInvalidHeadCount = function (count) {
  return isNaN(count) || count < 1;
}

const isInvalidTailCount = function (count) {
  return isNaN(count) || count < 0;
}

const errors = {
  head: function (organizedData, fs) {
    let { existsSync } = fs;
    let { count, files, option } = organizedData;

    if (isZero(count)) {
      return 'head: illegal line count -- 0';
    }

    if (isInvalidOption(option)) {
      let errorMsg = 'head: illegal option -- ' + option + '\nusage: head [-n lines | -c bytes] [file ...]';
      return errorMsg;
    }

    if (isInvalidHeadCount(count)) {
      return (option == 'n') ? 'head: illegal line count -- ' + count : 'head: illegal byte count -- ' + count;
    }

    if (files.length == 1 && !existsSync(files[0])) {
      return 'head: ' + files[0] + ': No such file or directory';
    }
  },
  tail: function (organizedData, fs) {
    let { existsSync } = fs;
    let { count, files, option } = organizedData;

    if (isInvalidOption(option)) {
      let errorMsg = 'tail: illegal option -- ' + option + '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      return errorMsg;
    }

    if (isInvalidTailCount(count)) {
      return 'tail: illegal offset -- ' + count;
    }

    if (files.length == 1 && !existsSync(files[0])) {
      return 'tail: ' + files[0] + ': No such file or directory';
    }
  }
}

module.exports = {
  errors
};
