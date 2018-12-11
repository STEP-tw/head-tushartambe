const assert = require('assert');

const { separateCmdLineArgs } = require('../src/parser.js');

describe('separateCmdLineArgs', function () {
  describe('for separate-on option and count is not given', function () {
    it('should separate all arguments and give default option -n and count 10', function () {
      let givenCmdLineArgs = [ 'file.txt' ];
      let separatedArgs = { option: 'n', count: 10, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for separate-on option is not given and count is given', function () {
    it('should separate all arguments and give default option -n and count as given', function () {
      let givenCmdLineArgs = [ '-19', 'file.txt' ];
      let separatedArgs = { option: 'n', count: 19, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for separate-on option is given and count is given with it', function () {
    it('should give separate-on option and given count', function () {
      let givenCmdLineArgs = [ '-n19', 'file.txt' ];
      let separatedArgs = { option: 'n', count: 19, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);

      givenCmdLineArgs = [ '-c8', 'file.txt' ];
      separatedArgs = { option: 'c', count: 8, files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for separate-on option is given and count is given separately', function () {
    it('should give separate-on option and count as given ', function () {
      let givenCmdLineArgs = [ '-c', '8', 'file.txt' ];
      let separatedArgs = { option: 'c', count: '8', files: [ 'file.txt' ] };
      assert.deepEqual(separateCmdLineArgs(givenCmdLineArgs),separatedArgs);
    });
  });

  describe('for multiple files', function () {
    it('should return option and count with array of all files', function () {
      let givenCmdLineArgs = [ '-c', '8', 'file.txt', 'file2.txt' ];
      let separatedArgs = { option: 'c', count: '8', files: [ 'file.txt', 'file2.txt' ] };
    });
  });
});

