@regression @functional @api @TCId-002 @login
Feature: Functional API Login Validation

  Scenario Outline: API backend validates login credentials
    Given API service validates <user> login

    Examples:
      | user          |
      | standard_user |
      | visual_user   |
