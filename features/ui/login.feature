@smoke @regression @ui @TCId-001 @login
Feature: UI Login Functionality

  Scenario Outline: Valid user login through UI flow
    Given user opens saucedemo application
    When user performs UI login with <user> credentials
    Then UI login should be successful
    And visual validation passes for login

    Examples:
      | user          |
      | standard_user |
      | visual_user   |
