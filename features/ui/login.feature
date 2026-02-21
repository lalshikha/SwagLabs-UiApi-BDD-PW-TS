@smoke @regression @ui @TCId-001 @login
Feature: UI Login Functionality

  Scenario Outline: Valid user login through UI flow
    Given user opens saucedemo application
    Then visual validation passes for username element
    And visual validation passes for password element    
    And visual validation passes for loginbutton element
    And visual validation passes for login page
    When user performs UI login with <user> credentials
    Then UI login should be successful

    Examples:
      | user          |
      | standard_user |      
      | visual_user   |
 