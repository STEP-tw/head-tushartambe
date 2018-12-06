const assert = require('assert');
const {
  separateCmdLineArgs,
  getBytes,
  getLines,
  readFile,
  head } = require('../src/lib.js');

const multipleFileReader = function( file ) {
  return 'line1\nline2\nline3\nline4\nline5';
}

const fileReaderIdentity = function( file ) {
  return 'line 1\nline 2\nline 3\nline 4\nline 5';
}

const isFileExists = function(file) {
  return true;
}

describe('separateCmdLineArgs', function () {
  describe('for separate-on option and count is not given', function () {
    it('should separate all arguments and give default option -n and count 10', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        'file.txt' ];
      let separatedArgs = { option: 'n', count: 10, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should separate all arguments and give default option -n and count as given', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-19',
        'file.txt' ];
      let separatedArgs = { option: 'n', count: 19, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should give separate-on option and given count', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-n19',
        'file.txt' ];
      let separatedArgs = { option: 'n', count: 19, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);

      givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c8',
        'file.txt' ];
      separatedArgs = { option: 'c', count: 8, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should give separate-on option and count as given ', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c',
        '8',
        'file.txt' ];
      let separatedArgs = { option: 'c', count: '8', files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for multiple files', function () {
    it('should return option and count with array of all files', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c',
        '8',
        'file.txt',
        'file2.txt' ];
      let separatedArgs = { option: 'c', count: '8', files: [ 'file.txt', 'file2.txt' ] };
    });
  });
});

describe('getBytes', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value',function () {
      assert.deepEqual(getBytes(4,''),'');
    });
  });

  describe('for 0 count value', function () {
    it('should empty value', function () {
      assert.deepEqual(getBytes(0,'line 1\nline 2\nline 3\nline 4\nline 5\nline'),'');
    });
  });

  describe('for count value greater than total string characters', function () {
    it('should return whole string ', function () {
      assert.deepEqual(getBytes(20,'line 1\nline'),'line 1\nline');
    });
  });

  describe('for count value less than total string characters', function () {
    it('should return same number of characters as count', function () {
      assert.deepEqual(getBytes(8,'line 1\nline'),'line 1\nl');
    });
  });
});

describe('getLines', function () {
  describe('for empty contents and any count value', function () {
    it('should return empty value',function () {
      assert.deepEqual(getLines(4,''),'');
    });
  });

  describe('for 0 count value', function () {
    it('should empty value', function () {
      assert.deepEqual(getLines(0,'line 1\nline 2\nline 3\nline 4\nline 5\nline'),'');
    });
  });

  describe('for count value greater than total lines', function () {
    it('should return whole string ', function () {
      assert.deepEqual(getLines(20,'line 1\nline'),'line 1\nline');
    });
  });

  describe('for count value less than total lines', function () {
    it('should return same number of lines as count', function () {
      assert.deepEqual(getLines(5,'line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8'),'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });
});


describe('head with single file', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return first 10 lines of file',function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        'file' ];
      assert.deepEqual(head(givenCmdLineArgs,fileReaderIdentity,isFileExists),'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return first given number of lines', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-5',
        'file' ];
      assert.deepEqual(head(givenCmdLineArgs,fileReaderIdentity,isFileExists),'line 1\nline 2\nline 3\nline 4\nline 5');
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-n9',
        'file' ];
      assert.deepEqual(head(givenCmdLineArgs,fileReaderIdentity,isFileExists),'line 1\nline 2\nline 3\nline 4\nline 5');

      givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c8',
        'file' ];
      assert.deepEqual(head(givenCmdLineArgs,fileReaderIdentity,isFileExists),'line 1\nl');
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return given number of lines/characters as per option', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-n9',
        'file' ];
      assert.deepEqual(head(givenCmdLineArgs,fileReaderIdentity,isFileExists),'line 1\nline 2\nline 3\nline 4\nline 5');

      givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c',
        '8',
        'file' ];
      assert.deepEqual(head(givenCmdLineArgs,fileReaderIdentity,isFileExists),'line 1\nl');
    });
  });
});

describe('head with multiple files', function () {
  describe('for separate-on option and count is not given', function () {
    it('should return first 10 lines of each file',function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        'file1',
        'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\nline4\nline5\n\n==> file1 <==\nline1\nline2\nline3\nline4\nline5';
      assert.deepEqual(head(givenCmdLineArgs,multipleFileReader,isFileExists),output);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should return first given number of lines of each file', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\n\n==> file1 <==\nline1\nline2\nline3';
      assert.deepEqual(head(givenCmdLineArgs,multipleFileReader,isFileExists),output);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should return given number of lines for -n option of each file', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-n3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\n\n==> file1 <==\nline1\nline2\nline3';
      assert.deepEqual(head(givenCmdLineArgs,multipleFileReader,isFileExists),output);
    });
    it('should return given number of characters for -c option of each file', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nlin\n\n==> file1 <==\nlin';
      assert.deepEqual(head(givenCmdLineArgs,multipleFileReader,isFileExists),output);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should return give number of lines for -n option of each file', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-n',
        '3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nline1\nline2\nline3\n\n==> file1 <==\nline1\nline2\nline3';
      assert.deepEqual(head(givenCmdLineArgs,multipleFileReader,isFileExists),output);
    });

    it('should return given number of characters for -c option of each file', function () {
      let givenCmdLineArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c',
        '3',
        'file1',
        'file1'];
      let output = '==> file1 <==\nlin\n\n==> file1 <==\nlin';
      assert.deepEqual(head(givenCmdLineArgs,multipleFileReader,isFileExists),output);
    });
  });
});

describe('head', function () {
  describe('handle errors', function () {
    it('should return error when invalid option is specified', function() {
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(head([,,"-n0","file1"],fileReaderIdentity, isFileExists),expectedOutput);
    });

    it('should return error when -0 is given as count', function() {
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(head([,,"-0","file1"],fileReaderIdentity, isFileExists),expectedOutput);
    });

    it('should return error when count is invalid', function() {
      let expectedOutput = 'head: illegal line count -- -10';
      assert.deepEqual(head([,,"-n-10","file1"],fileReaderIdentity, isFileExists),expectedOutput);

      expectedOutput = 'head: illegal byte count -- -10';
      assert.deepEqual(head([,,"-c-10","file1"],fileReaderIdentity, isFileExists),expectedOutput);
    });

    it('should return error when invalid option is speciified', function() {
      let expectedOutput = 'head: illegal option -- z\nusage: head [-n lines | -c bytes] [file ...]' 
      assert.deepEqual(head([,,"-z","file1"],fileReaderIdentity, isFileExists),expectedOutput);
    });

    it('should return the error message when -n or -c and then alphanumeric combination is given ', function () {
      let expectedOutput = 'head: illegal line count -- u922';
      assert.deepEqual(head(['','',"-nu922",'README.mdafs','file2.txt'],fileReaderIdentity,isFileExists),expectedOutput);

      expectedOutput = 'head: illegal byte count -- u922';
      assert.deepEqual(head(['','',"-cu922",'README.mdafs','file2.txt'],fileReaderIdentity,isFileExists),expectedOutput);
    });

  });
});
