import { Given, When, Then } from '../../fixtures/Fixtures';
import { saucedemoUrl } from '../../utils/testData';
import { asLocatorKey } from '../../utils/asLocatorKey';
import { L } from '../../config/config_locators';

Given('user opens saucedemo application', async ({ page }) => {
  await page.goto(saucedemoUrl);
  await page.waitForLoadState('networkidle');
});

When('user enters {string} in {string}', async ({ commonPage, td }, value: string, key: string) => {
  await commonPage.inputInElementByKey(asLocatorKey(key), td(value));
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