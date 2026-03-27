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
    Given user navigates to the login page

  # SCENARIO 1: Successful login
  @TCId-Example001 @smoke
  Scenario: User can login with valid credentials
    # TODO: Update scenario name to match your app's terminology
    
    # TODO: Replace step and data keys with your actual field names
    When user fills username with "testdata.username"
    And user fills password with "testdata.password"
    And user clicks login button
    
    # TODO: Replace with your app's success indicator (dashboard heading, URL, etc.)
    Then user should be logged in successfully

  # SCENARIO 2: Failed login with invalid credentials
  @TCId-Example002 @smoke
  Scenario: User sees error for invalid credentials
    # TODO: Update scenario name and steps for your app
    
    When user fills username with "testdata.invalidUsername"
    And user fills password with "testdata.invalidPassword"
    And user clicks login button
    
    # TODO: Replace with your app's error validation
    Then error message should be displayed
    And error message should contain "Invalid credentials"

  # SCENARIO 3: Multiple test cases using scenario outline
  @TCId-Example003
  Scenario Outline: Various login attempts
    # TODO: Add more variations or delete if not needed for your app
    
    When user fills username with "<username>"
    And user fills password with "<password>"
    And user clicks login button
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

