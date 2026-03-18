@smoke @ui @regression @inventory
Feature: UI Inventory Functionality

  @TCId-Inv001
  Scenario: Verify user can login and access inventory page
    Given user opens "saucedemoUrl"
    When user performs UI login with "testdata.username" and "testdata.password"
    Then visual validation passes for "inventory" page    
    And page title should be "Products"
    And "inventory_hamburgerMenu" should be visible
    And "inventory_addToCartButton" should be visible

  @TCId-Inv002
  Scenario: Verify page title is not Products123 on inventory page
  # created using Playwright MCP
    Given user opens "saucedemoUrl"
    When user performs UI login with "testdata.username" and "testdata.password"
    Then page title should not be "Products123"
    And page title should be "Products"
