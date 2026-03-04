import { Given, When, Then } from '../../fixtures/Fixtures';
import { testData, type TestData } from '../../utils/testData';
import { asLocatorKey } from '../../utils/asLocatorKey';

Given('user opens {string}', async ({ page }, urlKey: string) => {
  const key = urlKey.trim() as keyof TestData;
  if (!(key in testData)) {
    throw new Error(`Unknown url key "${urlKey}". Valid keys: ${Object.keys(testData).join(', ')}`);
  }
  await page.goto(testData[key]);
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