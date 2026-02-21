import { When, Then } from '../../fixtures/Fixtures';

When('user performs UI login with {word} credentials', async ({ loginPage }, userType: string) => {
  await loginPage.loginAs(userType);
});

Then('UI login should be successful', async ({ loginPage }) => {
  await loginPage.assertLoginSuccess();
});