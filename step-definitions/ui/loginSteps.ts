// step-definitions/ui/loginSteps.ts
import { When, Then } from '../../fixtures/Fixtures';

// Negative step 1: raw username/password (can also accept testdata.* tokens now)
When(
  'user attempts UI login with username {string} and password {string}',
  async ({ page, resolveTestData, $testInfo }, username: string, password: string) => {
    const resolvedUsername = resolveTestData(username, $testInfo);
    const resolvedPassword = resolveTestData(password, $testInfo);

    await page.locator('[data-test="username"]').fill(String(resolvedUsername));
    await page.locator('[data-test="password"]').fill(String(resolvedPassword));
    await page.locator('[data-test="login-button"]').click();
  }
);

// Positive login: supports Examples values like "testdata.user1"
When('user performs UI login for {string}', async ({ loginPage, resolveTestData, $testInfo }, usernameToken) => {
  const username = resolveTestData(usernameToken, $testInfo);
  const password = resolveTestData('testdata.password', $testInfo);
  await loginPage.login(String(username), String(password));
});

// Keep your existing step (optional)
When('user performs UI login with {word} credentials', async ({ loginPage }, userType: string) => {
  await loginPage.loginAs(userType);
});

Then('UI login should be successful', async ({ loginPage }) => {
  await loginPage.assertLoginSuccess();
});

Then(
  'UI login should fail with error {string}',
  async ({ loginPage, resolveTestData, $testInfo }, expectedError: string) => {
    const resolvedError = resolveTestData(expectedError, $testInfo);
    await loginPage.assertLoginErrorText(String(resolvedError));
  }
);
