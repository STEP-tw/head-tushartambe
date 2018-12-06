const assert = require('assert');
const {
  separateCmdLineArgs,
  getBytes,
  getLines } = require('../src/lib.js');

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
