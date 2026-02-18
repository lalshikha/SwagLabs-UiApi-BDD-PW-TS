import { When, Then } from '@cucumber/cucumber';
import {CustomWorld} from '../../fixtures/world';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

When('user performs UI login with {word} credentials', async function (this: CustomWorld, userType: string) {
  const loginPage = new LoginPage(this.page!);
  const user = this.testData.testUsers[userType];
  await loginPage.login(user.username, user.password);
});

Then('UI login should be successful', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.assertLoginSuccess();
});

Then('visual validation passes for login', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.captureLoginScreenshot('login.png');
});

Then('user sees inventory page loaded', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  await inventoryPage.assertInventoryLoaded();
});

When('user adds first item to cart', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  await inventoryPage.addFirstItemToCart();
});
