const report = require('multiple-cucumber-html-reporter');
const reportTitle = "Sitrepi e2e testid 5 sessiooni paralleelselt";

report.generate({
    jsonDir: 'reports',
    reportPath: 'reports/combined',
    disableLog: true,
    pageTitle: reportTitle,
    reportName: reportTitle,
    displayDuration: true,
    openReportInBrowser: true,
    durationInMS: false,
    saveCollectedJSON: true
});

