# Addition to Testcafe-cucumber for parallel execution and HMTL reports


This is an extension to [TestCafé and Cucumber](https://github.com/rquellh/testcafe-cucumber)



## Installation 

1. Make sure [Node.js](https://nodejs.org/) is installed
2. Navigate to the root of the repo
3. Use the `npm install` command

## Running tests

### Windows
You can run tests by executing the  `npm test-chrome`, `npm test-ie`, `npm test-edge`, `npm test-firefox`commands in command prompt. For headless, add headless at the end, like `npm test-chrome-headless`

### Parallel execution

Add or remove --parallel=3 at the end

### Report
Then run  `npm run report` to generate the report. Rports folder is generated with HTML reports in it.

### Zip of report
Run `npm run createzip` to generate zip of a report, which, by providing path in CI, can then be downloaded as an artifact.




