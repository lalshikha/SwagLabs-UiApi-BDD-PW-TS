@smoke @ui @regression @inventory
Feature: UI Inventory Functionality

  @TCId-Inv001
  Scenario: Verify user can login and access inventory page
    Given user opens saucedemo application
    When user performs UI login with "testdata.username" and "testdata.password"
    Then visual validation passes for "inventory" page    
    And "inventory_pageTitle_dt" text should be "Products"
    And "inventory_hamburgerMenu_id" should be visible
    And "inventory_addToCartButton_dt" should be visible

    
