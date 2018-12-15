const assert = require('assert');
const {
  getBytes,
  getLines,
  getTailBytes,
  getTailLines,
  readFiles,
  readFileContents,
  getContents,
  tail,
  head } = require('../src/lib.js');

const multipleFileReader = function (file) {
  return 'line1\nline2\nline3\nline4\nline5';
}

const fileReaderIdentity = function (file) {
  return 'line 1\nline 2\nline 3\nline 4\nline 5';
}

const isFileExists = function (file) {
  return true;
}

describe('getBytes', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      assert.deepEqual(getBytes(4, ''), '');
    });
  });

  describe('for 0 count value', function () {
    it('should empty value', function () {
      assert.deepEqual(getBytes(0, 'line 1\nline 2\nline 3\nline 4\nline 5\nline'), '');
    });
  });
  ``
  describe('for count value greater than total string characters', function () {
    it('should return whole string ', function () {
      assert.deepEqual(getBytes(20, 'line 1\nline'), 'line 1\nline');
    });
  });

  describe('for count value less than total string characters', function () {
    it('should return same number of characters as count', function () {
      assert.deepEqual(getBytes(8, 'line 1\nline'), 'line 1\nl');
    });
  });
});

describe('getLines', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      assert.deepEqual(getLines(4, ''), '');
    });
  });

  describe('for 0 count value', function () {
    it('should empty value', function () {
      assert.deepEqual(getLines(0, 'line 1\nline 2\nline 3\nline 4\nline 5\nline'), '');
    });
  });

  describe('for count value greater than total lines', function () {
    it('should return whole string ', function () {
      assert.deepEqual(getLines(20, 'line 1\nline'), 'line 1\nline');
    });
  });

  describe('for count value less than total lines', function () {
    it('should return same number of lines as count', function () {
      assert.deepEqual(getLines(5, 'line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8'), 'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });
});

describe('getTailBytes', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      assert.deepEqual(getTailBytes(4, ''), '');
    });
  });

  describe('for count value greater than total string characters', function () {
    it('should return whole string ', function () {
      assert.deepEqual(getTailBytes(20, 'line 1\nline'), 'line 1\nline');
    });
  });

  describe('for count value less than total string characters', function () {
    it('should return same number of last characters as count', function () {
      assert.deepEqual(getTailBytes(8, 'line 1\nline'), 'e 1\nline');
    });
  });
});

describe('getTailLines', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      assert.deepEqual(getTailLines(4, ''), '');
    });
  });

  describe('for count value greater than total lines', function () {
    it('should return whole string ', function () {
      assert.deepEqual(getTailLines(20, 'line 1\nline'), 'line 1\nline');
    });
  });

  describe('for count value less than total lines', function () {
    it('should return same number of last lines as count', function () {
      assert.deepEqual(getTailLines(5, 'line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8'), 'line 4\nline 5\nline 6\nline 7\nline 8');
    });
  });
});


describe('readFiles', function () {
  describe('all files are exists', function () {
    it('should return all files data as per count and option', function () {
      const fileReaderIdentity = function (file) {
        return 'line1\nline2\nline3\nline4\nline5';
      };
      let organizedData = { option: 'n', count: 10, files: ['file1', 'file1'], readerSelector: getLines };
      let output = '==> file1 <==\nline1\nline2\nline3\nline4\nline5\n\n==> file1 <==\nline1\nline2\nline3\nline4\nline5';
      assert.deepEqual(readFiles(organizedData, fileReaderIdentity, isFileExists, 'head'), output);
    });
  });

  describe('if a file does not exists', function () {
    it('should return error for missing file and data as per count and option for other file', function () {
      const fileReaderIdentity = function (file) {
        return 'line1\nline2\nline3\nline4\nline5';
      };
      let organizedData = { option: 'n', count: 10, files: ['file1', 'abc'], readerSelector: getLines };
      let output = '==> file1 <==\nline1\nline2\nline3\nline4\nline5\n' + 'head: abc: No such file or directory';
      let isFileExists = function (fileName) {
        if (fileName == 'abc') {
          return false;
        }
        return true;
      };
      assert.deepEqual(readFiles(organizedData, fileReaderIdentity, isFileExists, 'head'), output);
    });
  });
});

describe('readFileContents', function () {
  it('should return the contents of file as per count and option', function () {
    const fileReaderIdentity = function (file) {
      return 'line1\nline2\nline3\nline4\nline5';
    };
    let organizedData = { option: 'n', count: 10, files: ['file1',], readerSelector: getLines };
    let output = 'line1\nline2\nline3\nline4\nline5';
    assert.deepEqual(readFileContents(fileReaderIdentity, 'file1', organizedData), output);
  });
});

describe('getContents', function () {
  
  it('should return required data as per option and count for all valid inputs', function () {
    const fileReaderIdentity = function (file) {
      return 'line1\nline2\nline3\nline4\nline5';
    };
    let organizedData = { option: 'n', count: 10, files: ['file1'], readerSelector: getLines };
    let output = 'line1\nline2\nline3\nline4\nline5';
    assert.deepEqual(getContents(organizedData, fileReaderIdentity, isFileExists, 'head'), output);
  });
});

describe('head with single file', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return first 10 lines of file', function () {
      let givenCmdLineArgs = ['file'];
      assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return first given number of lines', function () {
      let givenCmdLineArgs = ['-5', 'file'];
      assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n9', 'file'];
      assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nline 2\nline 3\nline 4\nline 5');

      givenCmdLineArgs = ['-c8', 'file'];
      assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nl');
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n9', 'file'];
      assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nline 2\nline 3\nline 4\nline 5');

      givenCmdLineArgs = ['-c', '8', 'file'];
      assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nl');
    });
  });
});

describe('head with multiple files', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return first 10 lines of each file', function () {
      let givenCmdLineArgs = ['file1', 'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\nline4\nline5\n\n==> file1 <==\nline1\nline2\nline3\nline4\nline5';
      assert.deepEqual(head(givenCmdLineArgs, multipleFileReader, isFileExists), output);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return first given number of lines of each file', function () {
      let givenCmdLineArgs = ['-3', 'file1', 'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\n\n==> file1 <==\nline1\nline2\nline3';
      assert.deepEqual(head(givenCmdLineArgs, multipleFileReader, isFileExists), output);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return given number of lines for -n option of each file', function () {
      let givenCmdLineArgs = ['-n3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\n\n==> file1 <==\nline1\nline2\nline3';
      assert.deepEqual(head(givenCmdLineArgs, multipleFileReader, isFileExists), output);
    });
    it('should return given number of characters for -c option of each file', function () {
      let givenCmdLineArgs = ['-c3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nlin\n\n==> file1 <==\nlin';
      assert.deepEqual(head(givenCmdLineArgs, multipleFileReader, isFileExists), output);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return give number of lines for -n option of each file', function () {
      let givenCmdLineArgs = ['-n',
        '3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\n\n==> file1 <==\nline1\nline2\nline3';
      assert.deepEqual(head(givenCmdLineArgs, multipleFileReader, isFileExists), output);
    });

    it('should return given number of characters for -c option of each file', function () {
      let givenCmdLineArgs = ['-c',
        '3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nlin\n\n==> file1 <==\nlin';
      assert.deepEqual(head(givenCmdLineArgs, multipleFileReader, isFileExists), output);
    });
  });
});

describe('head', function () {
  describe('handle errors', function () {
    it('should return error when invalid option is specified', function () {
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(head(["-n0", "file1"], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return error when -0 is given as count', function () {
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(head(["-0", "file1"], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return error when count is invalid', function () {
      let expectedOutput = 'head: illegal line count -- -10';
      assert.deepEqual(head(["-n-10", "file1"], fileReaderIdentity, isFileExists), expectedOutput);

      expectedOutput = 'head: illegal byte count -- -10';
      assert.deepEqual(head(["-c-10", "file1"], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return error when invalid option is speciified', function () {
      let expectedOutput = 'head: illegal option -- z\nusage: head [-n lines | -c bytes] [file ...]'
      assert.deepEqual(head(["-z", "file1"], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return the error message when -n or -c and then alphanumeric combination is given ', function () {
      let expectedOutput = 'head: illegal line count -- u922';
      assert.deepEqual(head(["-nu922", 'README.mdafs', 'file2.txt'], fileReaderIdentity, isFileExists), expectedOutput);

      expectedOutput = 'head: illegal byte count -- u922';
      assert.deepEqual(head(["-cu922", 'README.mdafs', 'file2.txt'], fileReaderIdentity, isFileExists), expectedOutput);
    });
  });

  describe('handle errors of files', function () {
    describe('single file that not exists', function () {
      let isFileExists = file => false;
      it('should return file not found error ', function () {
        let givenCmdLineArgs = ['-n',
          '3',
          'someFile'];
        let expectedOutput = 'head: ' + 'someFile' + ': No such file or directory'

        assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), expectedOutput);
      });
    });

    describe('multiple files that not exists', function () {
      let isFileExists = file => false;
      it('should return file not found error of each file', function () {
        let givenCmdLineArgs = ['-n',
          '3',
          'someFile',
          'someFile2'];
        let expectedOutput = 'head: ' + 'someFile' + ': No such file or directory' + '\n' + 'head: ' + 'someFile2' + ': No such file or directory'

        assert.deepEqual(head(givenCmdLineArgs, fileReaderIdentity, isFileExists), expectedOutput);
      });
    });
  });
});

describe('tail with single file', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return last 10 lines or if less lines then whole file of file', function () {
      let givenCmdLineArgs = ['file'];
      assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return last given number of lines', function () {
      let givenCmdLineArgs = ['-5', 'file'];
      assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return last given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n2', 'file'];
      assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 4\nline 5');

      givenCmdLineArgs = ['-c8', 'file'];
      assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), '4\nline 5');
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n', '2', 'file'];
      assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), 'line 4\nline 5');

      givenCmdLineArgs = ['-c', '8', 'file'];
      assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), '4\nline 5');
    });
  });
});

describe('tail', function () {
  describe('handle errors', function () {

    it('should return error when count is invalid', function () {
      let expectedOutput = 'tail: illegal offset -- -1r0';
      assert.deepEqual(tail(["-n-1r0", "file1"], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return error when invalid option is speciified', function () {
      let expectedOutput = 'tail: illegal option -- z\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      assert.deepEqual(tail(["-z", "file1"], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return the error message when -n or -c and then alphanumeric combination is given ', function () {
      let expectedOutput = 'tail: illegal offset -- u922';
      assert.deepEqual(tail(["-nu922", 'README.mdafs', 'file2.txt'], fileReaderIdentity, isFileExists), expectedOutput);

      expectedOutput = 'tail: illegal offset -- u922';
      assert.deepEqual(tail(["-cu922", 'README.mdafs', 'file2.txt'], fileReaderIdentity, isFileExists), expectedOutput);
    });

    it('should return empty string for count 0', function () {
      let expectedOutput = '';

      assert.deepEqual(tail(["-c", "0", 'file'], fileReaderIdentity, isFileExists), expectedOutput);
    });
  });

  describe('handle errors of files', function () {
    describe('single file that not exists', function () {
      let isFileExists = file => false;
      it('should return file not found error ', function () {
        let givenCmdLineArgs = ['-n',
          '3',
          'someFile'];
        let expectedOutput = 'tail: ' + 'someFile' + ': No such file or directory'

        assert.deepEqual(tail(givenCmdLineArgs, fileReaderIdentity, isFileExists), expectedOutput);
      });
    });
  });
});
