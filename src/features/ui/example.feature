# FEATURE TEMPLATE - EXAMPLE
# 
# ⚠️ CUSTOMIZATION REQUIRED: Use this as a template for your feature files.
#
# INSTRUCTIONS:
# 1. Rename to your feature area: dashboard.feature, products.feature, etc.
# 2. Replace "Example" with your actual feature name
# 3. Replace scenario names with your application's workflows
# 4. Replace step text with your Gherkin vocabulary
# 5. Keep steps simple and readable for non-technical stakeholders
# 6. Use @TCId-XXXX tags for traceability to test data
#
# NAMING CONVENTIONS:
# - @smoke, @regression, @e2e for categorization
# - @TCId-001, @TCId-002 for mapping to test data in src/test-data/dev/*.json
# - Scenario names describe the user action/expected result
#
# TEST DATA:
# - Reference test data using @TCId-XXXX tags
# - Data loaded from: src/test-data/dev/example.json
# - Access via td("testdata.fieldname") in steps

@ui @example @smoke
Feature: Example Application Login

  # Background runs before each scenario in this feature
  Background:
    # TODO: Replace with your app's login page URL or use baseURL from config
    Given user opens "loginUrl"

  # SCENARIO 1: Successful login
  @TCId-Example001 @smoke
  Scenario: User can login with valid credentials
    When user enters "testdata.username" in "login_username"
    And user enters "testdata.password" in "login_password"
    And user clicks "login_loginButton"
    Then "dashboard_page" should be visible

  # SCENARIO 2: Failed login with invalid credentials
  @TCId-Example002 @smoke
  Scenario: User sees error for invalid credentials
    When user enters "testdata.invalidUsername" in "login_username"
    And user enters "testdata.invalidPassword" in "login_password"
    And user clicks "login_loginButton"
    Then "login_error" should be visible
    And "login_error" text should be "Invalid credentials"

  # SCENARIO 3: Multiple test cases using scenario outline
  @TCId-Example003
  Scenario Outline: Various login attempts
    When user enters "<username>" in "login_username"
    And user enters "<password>" in "login_password"
    And user clicks "login_loginButton"
    Then login should complete with result: "<expected_result>"

    # TODO: Update examples with your app's test cases
    Examples:
      | username            | password    | expected_result |
      | testdata.validUser1 | correctPass | success         |
      | testdata.validUser2 | correctPass | success         |
      | invalidUser         | anyPass     | error           |
      | validUser           | wrongPass   | error           |

  # TODO: ADD MORE SCENARIOS HERE FOLLOWING THE PATTERN ABOVE
  # Remember: Keep scenarios focused on user behavior, not implementation details
  # BDD features should be readable by business stakeholders

