// step-definitions/ui/loginSteps.ts
import { Then } from '../../fixtures/Fixtures';

Then('UI login should be successful', async ({ inventoryPage }) => {
  await inventoryPage.assertInventoryLoaded();
});

Then('UI login should fail with error {string}', async ({ loginPage, td }, expectedError: string) => {
  await loginPage.assertLoginErrorText(td(expectedError));
});
