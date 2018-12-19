const isInvalidOption = function (givenOption) {
  let validOptios = ['c', 'n'];
  return !validOptios.includes(givenOption);
}

const isInvalidHeadCount = function (count) {
  return isNaN(count) || count < 1;
}

const isInvalidTailCount = function (count) {
  return isNaN(count) || count < 0;
}

const invalidOptionError = function (option,opertaion) {
  let error = {
    head: 'head: illegal option -- ' + option + '\nusage: head [-n lines | -c bytes] [file ...]',
    tail: 'tail: illegal option -- ' + option + '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
  };

  return error[opertaion]
}

const invalidCountError = function(count,option, operation) {
  let error = {
    head: {
      n: 'head: illegal line count -- ' + count,
      c: 'head: illegal byte count -- ' + count
    },
    tail: {
      n: 'tail: illegal offset -- ' + count,
      c: 'tail: illegal offset -- ' + count
    }
  }
  return error[operation][option];
}

const fileNotExistsError = function(file, operation) {
  return operation + ': ' + file + ': No such file or directory';
}

const errors = {
  head: function (organizedData, operation, fs) {
    let { existsSync } = fs;
    let { count, files, option } = organizedData;
    console.log(option); 

    if (isInvalidOption(option)) {
      return invalidOptionError(option, operation);
    }

    if (isInvalidHeadCount(count)) {
      return invalidCountError(count, option, operation);
    }

    if (files.length == 1 && !existsSync(files[0])) {
      return fileNotExistsError(files[0], operation)
    }
  },
  tail: function (organizedData, operation, fs) {
    let { existsSync } = fs;
    let { count, files, option } = organizedData;

    if (isInvalidOption(option)) {
      return invalidOptionError(option, operation);
    }

    if (isInvalidTailCount(count)) {
      return invalidCountError(count, option, operation);
    }

    if (files.length == 1 && !existsSync(files[0])) {
      return fileNotExistsError(files[0], operation)
    }
  }
}

module.exports = {
  errors
};
