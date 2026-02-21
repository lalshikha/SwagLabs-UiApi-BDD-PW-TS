@smoke @regression @ui @login
Feature: UI Login Functionality

  Background:
    Given user opens saucedemo application

  @TCId-001
  Scenario Outline: Valid user login through UI flow
    Then visual validation passes for username element
    And visual validation passes for password element
    And visual validation passes for loginbutton element
    And visual validation passes for login page
    When user performs UI login for "<username>"
    Then UI login should be successful

    Examples:
      | username       |
      | testdata.user1 |
      | testdata.user2 |

  @TCId-002
  Scenario: Login should fail when username is blank
    When user attempts UI login with username "" and password "secret_sauce"
    Then UI login should fail with error "Epic sadface: Username is required"

  @TCId-003
  Scenario: Login should fail when password is blank
    When user attempts UI login with username "standard_user" and password ""
    Then UI login should fail with error "Epic sadface: Password is required"

  @TCId-004
  Scenario: Login should fail when both username and password are blank
    When user attempts UI login with username "" and password ""
    Then UI login should fail with error "Epic sadface: Username is required"

  @TCId-005
  Scenario: Login should fail for invalid username
    When user attempts UI login with username "wrong_user" and password "secret_sauce"
    Then UI login should fail with error "Epic sadface: Username and password do not match any user in this service"

  @TCId-006
  Scenario: Login should fail for invalid password
    When user attempts UI login with username "standard_user" and password "wrong_password"
    Then UI login should fail with error "Epic sadface: Username and password do not match any user in this service"

  @TCId-007
  Scenario: Login should fail for locked out user
    When user performs UI login with locked_out_user credentials
    Then UI login should fail with error "Epic sadface: Sorry, this user has been locked out."
