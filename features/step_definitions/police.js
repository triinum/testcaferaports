const {Given, When, Then} = require('cucumber');
const Role = require('testcafe').Role;
const PolicePage = require('../support/pages/police-page');
const {RequestLogger} = require('testcafe');
const { ClientFunction } = require('testcafe');
const moment = require('moment');
moment().format();
const fs = require('fs');




Given(/^I open the police page$/, async function() {
    


    await testController.navigateTo(PolicePage.Police.url());
});

When(/^I verify front page items$/, async function() {
    await testController.expect(PolicePage.Police.actionBoxes().count).eql(6);
    await testController.expect(PolicePage.Police.greyColumns().count).eql(4);
    await testController.expect(PolicePage.Police.newsListSmall().count).eql(7);
    await testController.click(PolicePage.Police.allNewsLink());
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains('uudised'); 
    
    //seda peab veel leiutama
    //const logger = RequestLogger('https://tagasiside.smit.dev/sendMail', { logResponseBody: true });
    //await testController.expect(logger.requests[0].response.statusCode).eql(200);
    
});

Then(/^I verify front page items in English$/, async function() {
    await testController.navigateTo(PolicePage.Police.url()+'/en');
    //await testController.click(PolicePage.Police.englishButton()).wait(5000);
    //await testController.expect(PolicePage.Police.frontBoxes().nth(0).innerText).contains('Emergency');   
    await testController.expect(PolicePage.Police.actionBoxes().nth(0).innerText).contains('Crossing the border');
    await testController.expect(PolicePage.Police.actionBoxes().count).eql(6);
    await testController.expect(PolicePage.Police.greyColumns().count).eql(4);
    //await testController.click(PolicePage.Police.allNews());
    
});



 Then(/^I search rahapesu "([^"]*)"$/, async function (text) {
    await testController.navigateTo('https://www.politsei.ee/et/rahapesu');
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains('rahapesu');
    await this.addScreenshotToReport();
    await testController.typeText(PolicePage.Police.rahapesuSearch(), text);
    await testController.pressKey("enter");
    await testController.expect(PolicePage.Police.rahapesuSearchresult().innerText).contains(text);
 });
   
    
When(/^I search for kadunud esemed$/, async function() {
    await testController.navigateTo(PolicePage.Police.url()+'/et');
    await testController.typeText(PolicePage.Police.searchBox(), "leitud esemed");
    await testController.pressKey("enter");
    await testController.click(PolicePage.Police.secondSearchResult()).wait(7000);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains('leitud'); 
    await testController.expect(PolicePage.Police.lostItemsImage().visible).ok();
    //await testController.typeText(PolicePage.Police.lostitemInput(), "Monark");
    //await testController.pressKey("enter");
    //await testController.expect(PolicePage.Police.lostItemName().innerText).contains("Monark");
});

Then(/^I search for dokumendi kehtivuse kontroll$/, async function() {
    await testController.typeText(PolicePage.Police.searchBox(), "dokumendi kehti");
    await testController.pressKey("enter");
    await testController.click(PolicePage.Police.secondSearchResult()).wait(7000);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains('dokumendi'); 
});


When(/^I expect an error message if doc not found$/, async function() {
    await testController.click(PolicePage.Police.searchBox());
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(PolicePage.Police.lostitemInput(), "32323232");
    await testController.pressKey("enter");
    //await testController.expect(PolicePage.Police.documentationErrorMessage().innerText).contains("andmekogus puuduvad");
});


When(/^I search for "([^"]*)"$/, async function(text) {
    await testController.typeText(PolicePage.Police.searchBox(), text);
    await testController.pressKey("enter");
});

When(/^result includes (.*)$/, async function(text) {
    await testController.expect(PolicePage.Police.secondSearchResult().innerText).contains(text);
    await testController.click(PolicePage.Police.secondSearchResult()).wait(7000);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains('koosolekud'); 
    await testController.expect(PolicePage.Police.meetingListResult().count).eql(30);  
});

Then(/^I search for meeleavaldused "([^"]*)"$/, async function(text) {
    await testController.typeText(PolicePage.Police.searchBoxMeeleavaldus(), text);
});

When(/^I click on services icon$/, async function() {
    await testController.click(PolicePage.Police.servicesIcon());
});

Then('I am redirected to a subpage', async function () {
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains('teenindused'); 
});

When('I click on Tartu service', async function () {
    await testController.click(PolicePage.Police.tartuService());
    await this.addScreenshotToReport();
});

Then('average service time is less than 15 minutes', async function () {
    const myElement = PolicePage.Police.myDateFromWebpage();
    
    await testController.expect(myElement.innerText).contains('2020');
    
    const elementText = await myElement.innerText;

    const waitingTimeRegex = /(?:.*)dokumendi taotluse esitamise keskmine ooteaeg: ([0-9]{2}) min/g;
    const returnTimeRegex = /(?:.*)dokumendi kättesaamise(?:.*): ([0-9]{2}) min/g;
    const lastUpdatedRegex = /(?:.*)uuendati: (\d+.\d+.\d+ - \d{2}:\d{1,2})/g;

    const parsedWaitingGroup = waitingTimeRegex.exec(elementText);
    const parsedReturnGroup = returnTimeRegex.exec(elementText);
    const lastUpdatedGroup = lastUpdatedRegex.exec(elementText);

    // Debug
    // console.log("taotluse esitamise ooteaeg (min):",  Number(parsedWaitingGroup[1]));
    // console.log("kättesaamise ooteaeg (min):", Number(parsedReturnGroup[1]));
    // console.log("Viimati uuendati:", lastUpdatedGroup[1]); // HH:mm
    
    const pageDate = moment.utc(lastUpdatedGroup[1], "dd:mm:YYYY HH:mm");
    const actualDate = moment.utc();
    
    const diff = actualDate.diff(pageDate);
    const duration = moment.duration(diff);
    

    // Expect
    await testController.expect(duration.minutes()).lte(15); // Väiksem kui või võrdne 15'nega
    //await testController.expect(Number(lastUpdatedGroup[1])).lte(50); // Et taotluse esitamise aeg oleks väiksem või 20
    //await testController.expect(Number(parsedReturnGroup[1])).lte(25); // Et taotluse kättesaamise aeg oleks väiksem või 20
    
    await this.addScreenshotToReport();  
});


 When('I click on footericon {string}', async function (String) {   
    await testController.expect(PolicePage.Police.footerIcon().innerText).contains(String);
    await this.addScreenshotToReport();
 });



 When('I click on policework subpage {string}', async function (name) {   
    await testController.click(PolicePage.Police.menuItemPoliceWork());
    await testController.click(PolicePage.Police.subMenuItemLostItems(), name);
 });

 Then('I can click on lost persons menu item', async function () {  
    await testController.click(PolicePage.Police.menuItemLostPersons());
});  

Then('items exist on mobile', async function () {
    await testController.resizeWindow(480, 853);
    await testController.click(PolicePage.Police.mainLogo()).wait(7000);
    //await testController.expect(PolicePage.Police.mainCardActions().count).eql(2);
    //ait testController.expect(PolicePage.Police.secondaryNewsHeadingfirst().count).eql(7);
    //await testController.expect(PolicePage.Police.columns().count).eql(1);
    //await testController.click(PolicePage.Police.mobileMenu());
    //await testController.typeText(PolicePage.Police.mobileSearch(), "koosolekud");
   


});

Then ('teenindused page and check if page exists in all languages', async function () {
    await testController.navigateTo('https://www.politsei.ee/en/services/services');
    await testController.expect(PolicePage.Police.servicesTitle().innerText).contains("Service");
    await testController.click(PolicePage.Police.tartuService());
    await testController.expect(PolicePage.Police.servicesText().innerText).contains("erved by buses");
    await this.addScreenshotToReport();
});

When ('rahapesu page has news', async function () {
    await testController.navigateTo('https://www.politsei.ee/et/rahapesu-andmebueroo');
    await testController.expect(PolicePage.Police.rahapesuArticleHeading().visible).ok();
    //await testController.click(PolicePage.Police.rahapesuNewsLink());
    //await testController.click(PolicePage.Police.rahapesuNewsMenuitem());
    
    
});

Then('news page exists in all languages', async function () {
    await testController.navigateTo('https://www.politsei.ee/et/uudised');
    await testController.expect(PolicePage.Police.newsTitle().innerText).contains("Uudised");
    await testController.expect(PolicePage.Police.articleDate().innerText).contains("2020");
    await testController.navigateTo('https://www.politsei.ee/en/news');   
    await testController.expect(PolicePage.Police.newsTitle().innerText).contains("News");
    await testController.expect(PolicePage.Police.articleDate().innerText).contains("2020");
    await testController.navigateTo('https://www.politsei.ee/ru/novosti');   
    await testController.expect(PolicePage.Police.newsTitle().innerText).contains("Новости");
    await testController.expect(PolicePage.Police.articleDate().innerText).contains("2020");    
    
    
    
    
    
    //await testController.click(PolicePage.Police.englishButton());   
   

});

When('toopakkumised includes talendipank link', async function () { 
    //await testController.expect(PolicePage.Police.newsTitle().innerText).contains("News");
    await testController.navigateTo('https://www.politsei.ee/et/tule-toole')
    await testController.expect(PolicePage.Police.talendipankLink().visible).ok();
    
    
});

Then('ID kaardi juhend works', async function () {
    await testController.navigateTo('https://www.politsei.ee/et/juhend/id-kaardi-taotlemine-taeiskasvanule')
    await testController.expect(PolicePage.Police.idKaardiJuhendHeading().visible).ok();
    
 
});



    



