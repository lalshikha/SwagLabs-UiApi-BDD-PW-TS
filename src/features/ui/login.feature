@smoke @regression @ui @login
Feature: UI Login Functionality

  Background:
    Given user opens saucedemo application

  @TCId-001
  Scenario Outline: Valid user login through UI flow
    Then visual validation passes for "login_username" element
    And visual validation passes for "login_password" element
    And visual validation passes for "login_loginButton" element
    And visual validation passes for "login" page
    When user enters "<username>" in "login_username"
    And user enters "testdata.password" in "login_password"
    And user clicks "login_loginButton"
    Then "inventory_container" should be visible

    Examples:
      | username       |
      | testdata.user1 |
      | testdata.user2 |

  @TCId-002
  Scenario: Login should fail when username is blank
    When user enters "" in "login_username"
    And user enters "testdata.password" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" text should be "Epic sadface: Username is required"

  @TCId-003
  Scenario: Login should fail when password is blank
    When user enters "standard_user" in "login_username"
    And user enters "" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" text should be "Epic sadface: Password is required"

  @TCId-004
  Scenario: Login should fail when both username and password are blank
    When user enters "" in "login_username"
    And user enters "" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" text should be "Epic sadface: Username is required"

  @TCId-005
  Scenario: Login should fail for invalid username
    When user enters "wrong_user" in "login_username"
    And user enters "testdata.password" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" text should be "Epic sadface: Username and password do not match any user in this service"

  @TCId-006
  Scenario: Login should fail for invalid password
    When user enters "standard_user" in "login_username"
    And user enters "wrong_password" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" text should be "Epic sadface: Username and password do not match any user in this service"

  @TCId-007
  Scenario: Login should fail for locked out user
    When user enters "locked_out_user" in "login_username"
    And user enters "testdata.password" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" text should be "Epic sadface: Sorry, this user has been locked out."
