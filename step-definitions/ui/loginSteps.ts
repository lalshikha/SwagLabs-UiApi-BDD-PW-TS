import { When, Then } from '@cucumber/cucumber';
import LoginPage from '../../pages/LoginPage';

When('user performs UI login with {word} credentials', async function (userType: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.loginAs(userType);
});

Then('UI login should be successful', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.assertLoginSuccess();
});
