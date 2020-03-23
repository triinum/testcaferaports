

Feature: Politsei.ee user flow

  Sanity check scenarios
    
    
    
Scenario: Front page elements in EST and ENG, lost persons, documents validity check, ID card specs, money laundry page elements
    Given I open the police page
    When I verify front page items
    Then I verify front page items in English
    Then I search rahapesu "AL-QAIDA"
    #When I search for kadunud esemed
    #Then I search for dokumendi kehtivuse kontroll
    #When I expect an error message if doc not found

Scenario: service date and time
    Given I open the police page
    Then teenindused page and check if page exists in all languages 
    Then news page exists in all languages
    Then rahapesu page has news
    #Then Check if contacts page exists in all languages 
    When toopakkumised includes talendipank link 
    Then ID kaardi juhend works
    
        
Scenario: koosolekud, meeleavaldused, teeninduse ooteaeg
    Given I open the police page
    When I search for "koosolekud" 
    #When result includes koosolekud
    Then I search for meeleavaldused "meeleavaldus" 
    When I click on services icon
    Then I am redirected to a subpage
    When I click on Tartu service
    #Then average service time is less than 15 minutes

 
Scenario: elements exist on mobile screen of 480 ja 853
    Given I open the police page
    Then items exist on mobile