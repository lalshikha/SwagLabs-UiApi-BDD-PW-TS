import { Given, When, Then } from '../../fixtures/Fixtures';
import { getAppUrl } from '../../utils/testData';
import { asLocatorKey } from '../../utils/asLocatorKey';

Given('user opens the application', async ({ page }) => {
  await page.goto(getAppUrl());
  await page.waitForLoadState('networkidle');
});

When('user enters {string} in {string}', async ({ commonPage, td }, value: string, key: string) => {
  // Handle EMPTY placeholder for Scenario Outline examples (represents empty string)
  const actualValue = value === 'EMPTY' ? '' : td(value);
  await commonPage.inputInElementByKey(asLocatorKey(key), actualValue);
});

When('user clicks {string}', async ({ commonPage }, key: string) => {
  await commonPage.clickByKey(asLocatorKey(key));
});

Then('{string} should be visible', async ({ commonPage }, key: string) => {
  await commonPage.assertVisibleByKey(asLocatorKey(key));
});

Then('{string} text should be {string}', async ({ commonPage }, key: string, expectedText: string) => {
  await commonPage.assertContainsTextByKey(asLocatorKey(key), expectedText);
});

Then('page title should be {string}', async ({ commonPage }, expectedText: string, exact?: boolean, message?: string) => {
  await commonPage.assertElementByTextIsVisible(expectedText, true, message || "Page title does not match expected value");
});

Then('page title should not be {string}', async ({ commonPage }, expectedText: string, message?: string) => {
  await commonPage.assertElementByTextIsNotVisible(expectedText, true, message || "Page title should not match the given value");
});

Then('{string} should be a clickable link', async ({ commonPage }, key: string) => {
  await commonPage.assertClickableLinkByKey(asLocatorKey(key));
});

Then('{string} text should not be {string}', async ({ commonPage }, key: string, unexpectedText: string) => {
  await commonPage.assertNotContainsTextByKey(asLocatorKey(key), unexpectedText);
});

Then('{string} should be clickable', async ({ commonPage }, key: string) => {
  await commonPage.assertClickableByKey(asLocatorKey(key));
});

Then('{string} should not be clickable', async ({ commonPage }, key: string) => {
  await commonPage.assertNotClickableByKey(asLocatorKey(key));
});
