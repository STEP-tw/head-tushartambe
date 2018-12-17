1. src/error.js 
    there is no tests.

2. src/error.js
    line no:3
    isInvalidOption can be named better.

3. src/error.js
    line no:33
    the option variable is not used anywhere.

4. src/parser.js
    line no:1
    isZero function is not used anywhere and it is repeating.

5. src/parser.js
    no tests for all helper function.

6. src/parser.js
    hard to understand function arguments which are named as inputs.

7. src/parser.js
    line no:7
    regular expression can be modified.

8. src/lib.js
    line no:48,70
    readerSelector is poor naming.

9. src/lib.js
    line no : 25
    code repeatation to check isFileExists.

10. src/lib.js
    line no:46 
    code is repeated in head() and tail().

11. test/libTest.js
    line no: 13
    fileReaderIdentity() and isFileExists() will not work for falsy inputs.

12. test/libTest.js
    line no: 64
    sequence of tests is not in order.

13. test/libTest.js
    line no: 97, 171
    all combinations of tests not covered.

14. test/libTest.js
    repeatition of fileReaderIdentity() in many places.

15. test/libTest.js
    line no: 276
    repeated set of tests.

16. test/parserTest.js
    all possible combinations are not tested.

17. src/lib.js
    line no: 75
    returning empty line for 0 count will fail tests for multiple files.