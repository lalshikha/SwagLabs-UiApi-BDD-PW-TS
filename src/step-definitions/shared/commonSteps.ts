import { Given, When, Then } from '../../fixtures/Fixtures';
import { saucedemoUrl } from '../../utils/testData';
import { asLocatorKey } from '../../utils/asLocatorKey';
import { L } from '../../config/config_locators';

Given('user opens saucedemo application', async ({ page }) => {
  await page.goto(saucedemoUrl);
  await page.waitForLoadState('networkidle');
});

When('user enters {string} in {string}', async ({ commonPage, td }, value: string, key: string) => {
  await commonPage.inputInElementByDT(L[asLocatorKey(key)], td(value));
});

When('user clicks {string}', async ({ commonPage }, key: string) => {
  await commonPage.clickElementByDT(L[asLocatorKey(key)]);
});

Then('{string} should be visible', async ({ commonPage }, key: string) => {
  const locatorKey = asLocatorKey(key);
  const value = L[locatorKey];

  if (locatorKey.endsWith('_dt')) {
    await commonPage.assertElementByDTIsVisible(value);
  } 
  else if (locatorKey.endsWith('_id')) {
    await commonPage.assertElementByIdIsVisible(value);
  } 
  else {
    throw new Error(
      `Unsupported locator type for key: ${locatorKey}. Expected suffix _dt or _id`
    );
  }
});

Then('{string} text should be {string}', async ({ commonPage }, key: string, expectedText: string) => {
  await commonPage.assertTextMatchByDT(L[asLocatorKey(key)], expectedText);
});