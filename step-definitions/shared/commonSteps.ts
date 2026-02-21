import { Given } from '../../fixtures/Fixtures';
import { saucedemoUrl } from '../../utils/testData';

Given('user opens saucedemo application', async ({ page }) => {
  await page.goto(saucedemoUrl);
  await page.waitForLoadState('networkidle');
});
