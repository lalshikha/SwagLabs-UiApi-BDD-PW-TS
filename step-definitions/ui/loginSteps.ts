// step-definitions/ui/loginSteps.ts
import { When, Then } from '../../fixtures/Fixtures';
import { expect } from '@playwright/test';

// Negative step 1: raw username/password (using your data-test locators)
When(
  'user attempts UI login with username {string} and password {string}',
  async ({ page }, username: string, password: string) => {
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();
  }
);

// Existing positive step (userType from testUsers)
When('user performs UI login with {word} credentials', async ({ loginPage }, userType: string) => {
  await loginPage.loginAs(userType);
});

// Existing positive assert
Then('UI login should be successful', async ({ loginPage }) => {
  await loginPage.assertLoginSuccess();
});

// Negative step 2: assert error banner text (using your data-test locator)
Then('UI login should fail with error {string}', async ({ loginPage }, expectedError: string) => {
  await loginPage.assertLoginErrorText(expectedError);
});

