import { Given, When, Then } from '../../fixtures/Fixtures';
import { saucedemoUrl } from '../../utils/testData';
import { asLocatorKey } from '../../utils/asLocatorKey';

Given('user opens saucedemo application', async ({ page }) => {
  await page.goto(saucedemoUrl);
  await page.waitForLoadState('networkidle');
});

When('user enters {string} in {string}', async ({ commonPage, td }, value: string, key: string) => {
  await commonPage.enterText(asLocatorKey(key), td(value));
});

When('user clicks {string}', async ({ commonPage }, key: string) => {
  await commonPage.click(asLocatorKey(key));
});

Then('{string} should be visible', async ({ commonPage }, key: string) => {
  await commonPage.assertVisible(asLocatorKey(key));
});

Then('{string} text should be {string}', async ({ commonPage, td }, key: string, expected: string) => {
  await commonPage.assertText(asLocatorKey(key), td(expected));
});