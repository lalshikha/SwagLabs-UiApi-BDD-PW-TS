/**
 * EXAMPLE STEP DEFINITIONS - TEMPLATE
 * 
 * ⚠️ CUSTOMIZATION REQUIRED: Use this as a template for your step definitions.
 * 
 * INSTRUCTIONS:
 * 1. Rename file to match your feature area (e.g., dashboardSteps.ts, productsSteps.ts)
 * 2. Replace 'examplePage' with your application's page objects
 * 3. Replace step texts with your application's Gherkin vocabulary
 * 4. Keep using fixture injection - do NOT create global page instances
 * 5. Use asLocatorKey() to validate locator keys at compile-time
 * 
 * PATTERN:
 * - Import { Given, When, Then } from fixtures
 * - Replace fixture names with your page objects
 * - Each step performs ONE user action
 * - Step text should be readable business language
 * - Use td() helper for test data resolution
 */

import { When, Then, Given } from '../../fixtures/Fixtures';
import { asLocatorKey } from '../../utils/asLocatorKey';

/**
 * Example: Navigate to page
 */
Given('user navigates to {string}', async ({ page }, url: string) => {
  // TODO: Replace with your app's navigation logic or use specific page objects
  await page.goto(url);
});

/**
 * Example: Fill form field with test data
 * TODO: Replace with your actual step and field names
 */
When('user fills username with {string}', async ({ examplePage, td }, dataKey: string) => {
  const username = td(dataKey);
  await examplePage.fillUsername(username);
});

/**
 * Example: Fill password field
 */
When('user fills password with {string}', async ({ examplePage, td }, dataKey: string) => {
  const password = td(dataKey);
  await examplePage.fillPassword(password);
});

/**
 * Example: Click button action
 */
When('user clicks login button', async ({ examplePage }) => {
  await examplePage.clickLogin();
});

/**
 * Example: Composite step - login in one go
 */
When('user logs in with {string} and {string}', async ({ examplePage, td }, usernameKey: string, passwordKey: string) => {
  const username = td(usernameKey);
  const password = td(passwordKey);
  await examplePage.loginAs(username, password);
});

/**
 * Example: Verify error message
 */
Then('error message should be displayed', async ({ examplePage }) => {
  const isDisplayed = await examplePage.isErrorMessageDisplayed();
  if (!isDisplayed) {
    throw new Error('Error message was not displayed');
  }
});

/**
 * Example: Verify specific error text
 */
Then('error message should contain {string}', async ({ examplePage }, expectedText: string) => {
  const errorText = await examplePage.getErrorMessageText();
  if (!errorText.includes(expectedText)) {
    throw new Error(`Expected error to contain "${expectedText}", but got: "${errorText}"`);
  }
});

// TODO: Add your application-specific steps here, following the pattern above
// Remember: Each step should perform ONE logical action
// Keep steps simple and readable for non-technical stakeholders
