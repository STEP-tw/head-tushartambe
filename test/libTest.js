const assert = require('assert');
const {
  getHeadData,
  getTailData,
  readFiles,
  createHeading,
  dataFetcher,
  readFileContents,
  getContents,
  tail,
  head } = require('../src/lib.js');

const readFileSync = function (file) {
  let lines = ['line 1',
    'line 2',
    'line 3',
    'line 4',
    'line 5',
    'line 6',
    'line 7',
    'line 8',
    'line 9',
    'line 10',
    'line 11'];
  if (file == 'file') {
    return lines.join("\n");
  }
}

const existsSync = function (file) {
  if (file == 'file') {
    return true;
  }
  return false;
}

describe('getHeadData with separator "" ', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      let expectedOutput = '';
      let actual = getHeadData(4, '', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for 0 count value', function () {
    it('should empty value', function () {
      let expectedOutput = '';
      let actual = getHeadData(0, 'line 1\nline 2\nline 3\nline 4\nline 5\nline', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });
  ``
  describe('for count value less than total string characters', function () {
    it('should return same number of characters as count', function () {
      let expectedOutput = 'line 1\nl';
      let actual = getHeadData(8, 'line 1\nline', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value greater than total string characters', function () {
    it('should return whole string ', function () {
      let expectedOutput = 'line 1\nline';
      let actual = getHeadData(20, 'line 1\nline', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('getHeadData with separator "\n" ', function () {
  describe('for 0 count value', function () {
    it('should empty value', function () {
      let expectedOutput = '';
      let actual = getHeadData(0, 'line 1\nline 2\nline 3\nline 4\nline 5\nline', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      let expectedOutput = '';
      let actual = getHeadData(4, '', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value less than total lines', function () {
    it('should return same number of lines as count', function () {
      let expectedOutput = 'line 1\nline 2\nline 3\nline 4\nline 5';
      let actual = getHeadData(5, 'line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value greater than total lines', function () {
    it('should return whole string ', function () {
      let expectedOutput = 'line 1\nline';
      let actual = getHeadData(20, 'line 1\nline', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });


});

describe('getTailData for separator "" ', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      let expectedOutput = '';
      let actual = getTailData(4, '', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value greater than total string characters', function () {
    it('should return whole string ', function () {
      let expectedOutput = 'line 1\nline';
      let actual = getTailData(20, 'line 1\nline', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value less than total string characters', function () {
    it('should return same number of last characters as count', function () {
      let expectedOutput = 'e 1\nline';
      let actual = getTailData(8, 'line 1\nline', '');
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('getTailData with separator "\n" ', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value', function () {
      let expectedOutput = '';
      let actual = getTailData(4, '', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value greater than total lines', function () {
    it('should return whole string ', function () {
      let expectedOutput = 'line 1\nline';
      let actual = getTailData(20, 'line 1\nline', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for count value less than total lines', function () {
    it('should return same number of last lines as count', function () {
      let expectedOutput = 'line 4\nline 5\nline 6\nline 7\nline 8';
      let actual = getTailData(5, 'line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8', "\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('createHeading', function () {
  it('should return heading for that given name', function () {
    let expectedOutput = '==> ' + 'file' + ' <==';
    let actual = createHeading('file');
    assert.deepEqual(actual, expectedOutput);
  });
  it('should return heading for that given number', function () {
    let expectedOutput = '==> ' + 10 + ' <==';
    let actual = createHeading(10);
    assert.deepEqual(actual, expectedOutput);
  });
});

describe('dataFetcher', function () {
  describe('for all files are exists', function () {
    it('should return all files data as per count and option', function () {
      let organizedData = { option: 'n', count: 5, files: ['file'], reader: getHeadData, separator: "\n" };
      let expectedOutput = '==> file <==\nline 1\nline 2\nline 3\nline 4\nline 5';
      let actual = dataFetcher(organizedData, 'head', { readFileSync, existsSync })('file');

      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('if a file does not exists', function () {
    it('should return error for missing file and data as per count and option for other file', function () {
      let organizedData = { option: 'n', count: 5, files: ['abc'], reader: getHeadData, separator: "\n" };
      let expectedOutput = 'head: abc: No such file or directory';
      let actual = dataFetcher(organizedData, 'head', { readFileSync, existsSync })('abc');
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('readFiles', function () {
  describe('for all files are exists', function () {
    it('should return all files data as per count and option', function () {
      let organizedData = { option: 'n', count: 5, files: ['file', 'file'], reader: getHeadData, separator: "\n" };
      let expectedOutput = '==> file <==\nline 1\nline 2\nline 3\nline 4\nline 5\n\n==> file <==\nline 1\nline 2\nline 3\nline 4\nline 5';
      let actual = readFiles(organizedData, 'head', { readFileSync, existsSync });

      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('if a file does not exists', function () {
    it('should return error for missing file and data as per count and option for other file', function () {
      let organizedData = { option: 'n', count: 5, files: ['file', 'abc'], reader: getHeadData, separator: "\n" };
      let expectedOutput = '==> file <==\nline 1\nline 2\nline 3\nline 4\nline 5\n' + 'head: abc: No such file or directory';
      let actual = readFiles(organizedData, 'head', { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('readFileContents', function () {
  it('should return the contents of file as per count and option', function () {
    let organizedData = { option: 'n', count: 5, files: ['file',], reader: getHeadData, separator: "\n" };
    let expectedOutput = 'line 1\nline 2\nline 3\nline 4\nline 5';
    let actual = readFileContents('file', organizedData, readFileSync);
    assert.deepEqual(actual, expectedOutput);
  });
});

describe('getContents', function () {

  it('should return required data as per option and count for all valid inputs', function () {
    let organizedData = { option: 'n', count: 4, files: ['file'], reader: getHeadData, separator: "\n" };
    let expectedOutput = 'line 1\nline 2\nline 3\nline 4';
    let actual = getContents(organizedData, 'head', { readFileSync, existsSync });
    assert.deepEqual(actual, expectedOutput);
  });
});

describe('head with single file', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return first 10 lines of file', function () {
      let givenCmdLineArgs = ['file'];
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      let lines = ['line 1',
        'line 2',
        'line 3',
        'line 4',
        'line 5',
        'line 6',
        'line 7',
        'line 8',
        'line 9',
        'line 10'];
      let expectedOutput = lines.join("\n");
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return first given number of lines', function () {
      let givenCmdLineArgs = ['-5', 'file'];
      let expectedOutput = 'line 1\nline 2\nline 3\nline 4\nline 5';
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n9', 'file'];
      let lines = ['line 1',
        'line 2',
        'line 3',
        'line 4',
        'line 5',
        'line 6',
        'line 7',
        'line 8',
        'line 9'];
      let expectedOutput = lines.join("\n");
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      givenCmdLineArgs = ['-c8', 'file'];
      expectedOutput = 'line 1\nl';
      actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n', '9', 'file'];
      let lines = ['line 1',
        'line 2',
        'line 3',
        'line 4',
        'line 5',
        'line 6',
        'line 7',
        'line 8',
        'line 9'];
      let expectedOutput = lines.join("\n");
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      givenCmdLineArgs = ['-c', '8', 'file'];
      expectedOutput = 'line 1\nl';
      actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('head with multiple files', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return first 10 lines of each file', function () {
      let givenCmdLineArgs = ['file', 'file'];
      let lines = ['line 1',
        'line 2',
        'line 3',
        'line 4',
        'line 5',
        'line 6',
        'line 7',
        'line 8',
        'line 9',
        'line 10'];
      let expectedOutput = '==> file <==\n' + lines.join("\n") + '\n\n==> file <==\n' + lines.join("\n");
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return first given number of lines of each file', function () {
      let givenCmdLineArgs = ['-3', 'file', 'file'];
      let expectedOutput = '==> file <==\nline 1\nline 2\nline 3\n\n==> file <==\nline 1\nline 2\nline 3';
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return given number of lines for -n option of each file', function () {
      let givenCmdLineArgs = ['-n3',
        'file',
        'file'];
      let expectedOutput = '==> file <==\nline 1\nline 2\nline 3\n\n==> file <==\nline 1\nline 2\nline 3';
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
    it('should return given number of characters for -c option of each file', function () {
      let givenCmdLineArgs = ['-c3',
        'file',
        'file'];
      let expectedOutput = '==> file <==\nlin\n\n==> file <==\nlin';
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return give number of lines for -n option of each file', function () {
      let givenCmdLineArgs = ['-n',
        '3',
        'file',
        'file'];
      let expectedOutput = '==> file <==\nline 1\nline 2\nline 3\n\n==> file <==\nline 1\nline 2\nline 3';
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return given number of characters for -c option of each file', function () {
      let givenCmdLineArgs = ['-c',
        '3',
        'file',
        'file'];
      let expectedOutput = '==> file <==\nlin\n\n==> file <==\nlin';
      let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('head', function () {
  describe('handle errors', function () {
    it('should return error when invalid option is specified', function () {
      let expectedOutput = 'head: illegal line count -- 0';
      let actual = head(["-n0", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return error when -0 is given as count', function () {
      let expectedOutput = 'head: illegal line count -- 0';
      let actual = head(["-0", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return error when count is invalid', function () {
      let expectedOutput = 'head: illegal line count -- -10';
      let actual = head(["-n-10", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      expectedOutput = 'head: illegal byte count -- -10';
      actual = head(["-c-10", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return error when invalid option is speciified', function () {
      let expectedOutput = 'head: illegal option -- z\nusage: head [-n lines | -c bytes] [file ...]'
      let actual = head(["-z", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return the error message when -n or -c and then alphanumeric combination is given ', function () {
      let expectedOutput = 'head: illegal line count -- u922';
      let actual = head(["-nu922", 'README.mdafs', 'file2.txt'], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      expectedOutput = 'head: illegal byte count -- u922';
      actual = head(["-cu922", 'README.mdafs', 'file2.txt'], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('handle errors of files', function () {
    describe('single file that not exists', function () {
      it('should return file not found error ', function () {
        let givenCmdLineArgs = ['-n',
          '3',
          'someFile'];
        let expectedOutput = 'head: ' + 'someFile' + ': No such file or directory';
        let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
        assert.deepEqual(actual, expectedOutput);
      });
    });

    describe('multiple files that not exists', function () {
      it('should return file not found error of each file', function () {
        let givenCmdLineArgs = ['-n',
          '3',
          'someFile',
          'someFile2'];
        let expectedOutput = 'head: ' + 'someFile' + ': No such file or directory' + '\n' + 'head: ' + 'someFile2' + ': No such file or directory'
        let actual = head(givenCmdLineArgs, { readFileSync, existsSync });
        assert.deepEqual(actual, expectedOutput);
      });
    });
  });
});

describe('tail with single file', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return last 10 lines or if less lines then whole file of file', function () {
      let givenCmdLineArgs = ['file'];
      let lines = ['line 2',
        'line 3',
        'line 4',
        'line 5',
        'line 6',
        'line 7',
        'line 8',
        'line 9',
        'line 10',
        'line 11'];
      let expectedOutput = lines.join("\n");
      let actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return last given number of lines', function () {
      let givenCmdLineArgs = ['-5', 'file'];
      let lines = ['line 7',
        'line 8',
        'line 9',
        'line 10',
        'line 11'];
      let expectedOutput = lines.join("\n");
      let actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return last given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n2', 'file'];
      let expectedOutput = 'line 10\nline 11';
      let actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      givenCmdLineArgs = ['-c8', 'file'];
      expectedOutput = '\nline 11';
      actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = ['-n', '2', 'file'];
      let expectedOutput = 'line 10\nline 11';
      let actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      givenCmdLineArgs = ['-c', '8', 'file'];
      expectedOutput = '\nline 11';
      actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });
});

describe('tail', function () {
  describe('handle errors', function () {

    it('should return error when count is invalid', function () {
      let expectedOutput = 'tail: illegal offset -- -1r0';
      let actual = tail(["-n-1r0", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return error when invalid option is speciified', function () {
      let expectedOutput = 'tail: illegal option -- z'
      expectedOutput += '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      let actual = tail(["-z", "file1"], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return the error message when -n or -c and then alphanumeric combination is given ', function () {
      let expectedOutput = 'tail: illegal offset -- u922';
      let actual = tail(["-nu922", 'README.mdafs', 'file2.txt'], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);

      expectedOutput = 'tail: illegal offset -- u922';
      actual = tail(["-cu922", 'README.mdafs', 'file2.txt'], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return empty string for count 0', function () {
      let expectedOutput = '';
      let actual = tail(["-c", "0", 'file'], { readFileSync, existsSync });
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('handle errors of files', function () {
    describe('single file that not exists', function () {
      it('should return file not found error ', function () {
        let givenCmdLineArgs = ['-n',
          '3',
          'someFile'];
        let expectedOutput = 'tail: ' + 'someFile' + ': No such file or directory'
        let actual = tail(givenCmdLineArgs, { readFileSync, existsSync });
        assert.deepEqual(actual, expectedOutput);
      });
    });
  });
});
