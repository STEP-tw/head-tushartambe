const assert = require('assert');
const {
  separateCmdArgs } = require('../src/lib.js');

describe('separateCmdArgs', function () {
  describe('for seperate-on option and count is not given', function () {
    it('should separate all arguments and give default option -n and count 10', function () {
      let givenCmdArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        'file.txt' ];
      let separatedArgs = { option: 'n', count: 10, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdArgs(givenCmdArgs),separatedArgs);
    });
  });

  describe('for seperate-on option is not given and count is given', function () {
    it('should separate all arguments and give default option -n and count as given', function () {
     let givenCmdArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-19',
        'file.txt' ];
      let separatedArgs = { option: 'n', count: 19, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdArgs(givenCmdArgs),separatedArgs);
    });
  });

  describe('for seperate-on option is given and count is given with it', function () {
    it('should give seperate-on option and given count', function () {
      let givenCmdArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-n19',
        'file.txt' ];
      let separatedArgs = { option: 'n', count: 19, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdArgs(givenCmdArgs),separatedArgs);

      givenCmdArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c8',
        'file.txt' ];
      separatedArgs = { option: 'c', count: 8, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdArgs(givenCmdArgs),separatedArgs);
    });
  });

  describe('for seperate-on option is given and count is given seperately', function () {
    it('should give seperate-on option and count as given ', function () {
      let givenCmdArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c',
        '8',
        'file.txt' ];
      let separatedArgs = { option: 'c', count: '8', files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdArgs(givenCmdArgs),separatedArgs);

    });
  });

  describe('for multiple files', function () {
    it('should return option and count with array of all files', function () {
      let givenCmdArgs = [ '/usr/local/bin/node',
        '/Users/tmtushar/Projects/ownHeadCommand/head.js',
        '-c',
        '8',
        'file.txt',
        'file2.txt' ];
      let separatedArgs = { option: 'c', count: '8', files: [ 'file.txt', 'file2.txt' ] };
    });
  });
});

