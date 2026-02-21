@smoke @regression @ui @login
Feature: UI Login Functionality

  @TCId-001
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

  @TCId-002
  Scenario: Login should fail when username is blank
    Given user opens saucedemo application
    When user attempts UI login with username "" and password "secret_sauce"
    Then UI login should fail with error "Epic sadface: Username is required"

  @TCId-003
  Scenario: Login should fail when password is blank
    Given user opens saucedemo application
    When user attempts UI login with username "standard_user" and password ""
    Then UI login should fail with error "Epic sadface: Password is required"

  @TCId-004
  Scenario: Login should fail when both username and password are blank
    Given user opens saucedemo application
    When user attempts UI login with username "" and password ""
    Then UI login should fail with error "Epic sadface: Username is required"

  @TCId-005
  Scenario: Login should fail for invalid username
    Given user opens saucedemo application
    When user attempts UI login with username "wrong_user" and password "secret_sauce"
    Then UI login should fail with error "Epic sadface: Username and password do not match any user in this service"

  @TCId-006
  Scenario: Login should fail for invalid password
    Given user opens saucedemo application
    When user attempts UI login with username "standard_user" and password "wrong_password"
    Then UI login should fail with error "Epic sadface: Username and password do not match any user in this service"

  # Optional (recommended) – only if you add locked_out_user to testUsers
  @TCId-007
  Scenario: Login should fail for locked out user
    Given user opens saucedemo application
    When user performs UI login with locked_out_user credentials
    Then UI login should fail with error "Epic sadface: Sorry, this user has been locked out."
