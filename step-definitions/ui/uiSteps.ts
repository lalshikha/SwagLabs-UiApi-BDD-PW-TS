// step-definitions/ui/uiSteps.ts
import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../fixtures/world';
import CommonPage from '../../pages/CommonPage';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

function safeFilePart(value: string): string {
  // Keeps filenames OS-safe even if usernames contain special chars.
  return value.replace(/[^\w.-]/g, '_');
}

When(
  'user performs UI login with {word} credentials',
  async function (this: CustomWorld, userType: string) {
    const loginPage = new LoginPage(this.page!);
    const user = this.testData.testUsers[userType];

    await loginPage.login(user.username, user.password);

    // Used by the later visual step to pick the correct baseline per user.
    this.currentUserName = user.username;
  }
);

Then('UI login should be successful', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.assertLoginSuccess();
});

Then(
  'visual validation passes for {word}',
  async function (this: CustomWorld, pageName: string) {
    const commonPage = new CommonPage(this.page!);

    const user = this.currentUserName ?? 'unknownUser';
    const snapshot = `pageUnderTest_${pageName}_${safeFilePart(user)}.png`;

    await commonPage.assertVisualSnapshot(snapshot, {
      threshold: 0.1,
      maxDiffPixels: 200,
      maxDiffPixelRatio: 0.001,
      maxSizeDiffPixels: 0,
    });
  }
);

Then('user sees inventory page loaded', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  await inventoryPage.assertInventoryLoaded();
});

When('user adds first item to cart', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page!);
  await inventoryPage.addFirstItemToCart();
});
