const {Selector} = require('testcafe');

// Selectors

function select(selector) {
    return Selector(selector).with({boundTestRun: testController});
}

exports.Police = {
    url: function() {
        return 'https://politsei.ee';
    },
    mainLogo: function() {
        return select('.brand').with({ boundTestRun: testController });
    },
    actionBoxes: function() {
        return select('.action').with({ boundTestRun: testController });
    },
    rahapesuSearch: function() {
        return select('#maincontent > div > div.content > div > p > span > label > input[type="text"]').with({ boundTestRun: testController });
    },
    rahapesuSearchresult: function() {
        return select('#maincontent > div > div.content > div > div > a:nth-child(1) > div > h4').with({ boundTestRun: testController });
    },
    newsTitle: function() {
        return select('#maincontent > div > div.content > div.cell-row > h1').with({ boundTestRun: testController });
    },
    allNewsLink: function() {
        return select('.link-right.news').with({ boundTestRun: testController });
    },
    englishButton: function() {
        return select('#lang > ul.menu-level1 > li:nth-child(2) > a').with({ boundTestRun: testController });
     },
    greyColumns: function() {
        return select('.column').with({ boundTestRun: testController });
    },
    newsListSmall: function() {
        return select('.news-list-item').with({ boundTestRun: testController });
    },
    mainCardActions: function() {
        return select('.card-body').with({ boundTestRun: testController });
    },
    mainCardActions: function() {
        return Selector('.grid .actions[data-v-21b4fbd8]').with({ boundTestRun: testController });  
    },
    lostItemsImage: function() {
        return select('.items-image').with({ boundTestRun: testController });
    }, 
    articleDate: function() {
        return select('#maincontent > div > div.content > div.news-list > article:nth-child(1) > div > small > time').with({ boundTestRun: testController });
    },       
    rahapesuArticleHeading: function() {
        return select('.article-headline').with({ boundTestRun: testController });
    },    
   secondaryNewsHeadingfirst: function() {
        return Selector('.news-list-item > p').with({ boundTestRun: testController });  
    }, 
    searchBox: function() {
        return select('#search').with({timeout: 70000}).with({ boundTestRun: testController });
    },
    firstSearchResult: function() {
        return Selector('.link').nth(0).with({boundTestRun: testController});
    },  
    myDateFromWebpage: function() {
        return Selector('.highlight.hours').nth(0).with({ boundTestRun: testController });
    },  
    secondSearchResult: function() {
        return Selector('#search-results > div:nth-child(1) > a > h4').with({boundTestRun: testController});
    }, 
    meetingListResult: function() {
        return Selector('.hidden-s').with({boundTestRun: testController});
    }, 
    searchBoxMeeleavaldus: function() {
        return Selector('.search-input').with({boundTestRun: testController});
    },     
    menuItemPoliceWork: function() {
        return Selector('.has-submenu').withText('Politseitöö').with({ boundTestRun: testController });  
    },
    subMenuItemLostPerson: function() {
        return Selector('#menu-level1-last > ul > li:nth-child(1) > a').with({ boundTestRun: testController }); 
    },
    servicesIcon: function() {
        return Selector('.action').nth(4).with({ boundTestRun: testController });
    },
    servicesTitle: function() {
        return Selector('#maincontent > div > div > h1').with({ boundTestRun: testController });
    },  
    servicesText: function() {
        return Selector('#maincontent > div > div > div.cell-row.cells-wrap > section > div > div > div.content').with({ boundTestRun: testController });
    },  
    
    tartuService: function() {
        return Selector('#cell-2').with({ boundTestRun: testController }); 
    },
    tartuServiceTitle: function() {
        return Selector('.highlight.hours').with({boundTestRun: testController});
    },
    
    loginErrorMessage: function() {
        return Selector('#js-flash-container > div > div');
    },
    rahapesuNewsLink: function() {
        return Selector('.read-more');
    },
    idKaardiJuhendHeading: function() {
        return Selector('#maincontent > div > div.content > h2').with({ boundTestRun: testController });
    },
    
    
    rahapesuNewsMenuitem: function() {
        return Selector('#maincontent > div > div.sidebar.links-secondary > ul > li.active > a');
    },
    talendipankLink: function() {  
        return Selector('#maincontent > div > div.content > table > tbody > tr:nth-child(2) > td:nth-child(1)').with({ boundTestRun: testController });
    },
    searchButton: function() {
        return Selector('#search');
    },
    firstSearchResult: function() {
        return Selector('.link').nth(0).with({boundTestRun: testController});
    },    
    submitButton: function() {
        return Selector('.listitem').child('h5').with({ boundTestRun: testController });
    },
    contactFormSubmit: function() {
        return Selector('.content').child('h1').with({ boundTestRun: testController });
    },
    menuItemContacts: function() {
        return Selector('.has-submenu').withText('Kontaktid').with({ boundTestRun: testController });  
    },
    documentationErrorMessage: function() {
        return Selector('.highlight.error').with({ boundTestRun: testController });  
    },
    subMenuItemLostItems: function() {
        return Selector('#menu-level1-last > ul > li:nth-child(1) > a').with({ boundTestRun: testController }); 
    },
    subMenuItemLostPersons: function() {
        return Selector('#menu-level3').nth(1).with({ boundTestRun: testController }); 
    },  
    searchInput: function() {
        return Selector('Search').withAttribute('type', 'input').with({ boundTestRun: testController }); 
    },
    lostitemInput: function() {
        return Selector("input").withAttribute("name", "documentNumber").with({ boundTestRun: testController }); 
    },  
    lostItemName: function() {
        return Selector('.name').with({ boundTestRun: testController }); 
    },   
    searchByLetter: function() {
        return Selector('#maincontent > div > div > section > div > ul > li:nth-child(24)').with({boundTestRun: testController});
    },
    searchByLetterMenuItem: function() {
        return Selector('.contact-container > contact-ui-controls > control-buttons > li:nth-child(1)').with({ boundTestRun: testController });
    },    
    footerIcon: function() {
        return Selector('.action').nth(2).with({ boundTestRun: testController });
    },   
    ServiceTitleHeading: function() {
        return Selector('.content').child('h1').with({ boundTestRun: testController });
    }, 
    columns: function() {
        return Selector('.rows').with({ boundTestRun: testController });
    },    
    mobileSubMenu: function() { 
        return Selector('#has-submenu').with({ boundTestRun: testController });              
    },
    mobileMenu: function() {
        return Selector('#mobile-menu').with({ boundTestRun: testController });
    },
    mobileSearch: function() {
        return Selector('.mobile-search.show').with({ boundTestRun: testController });
    },
    SubMenufirst: function() {  
        return Selector('#menu-level1-last').with({ boundTestRun: testController });
    }
    
    
};    