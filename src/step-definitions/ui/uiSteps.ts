/**
 * UI VALIDATION STEPS - Generic visual & UI tests
 * 
 * These steps are reusable across different features
 * They validate UI elements and visual regression
 */

import { Then } from '../../fixtures/Fixtures';
import { asLocatorKey } from '../../utils/asLocatorKey';

Then(
  'visual validation passes for {string} element',
  async ({ commonPage }, locatorKey: string) => {
    await commonPage.assertVisualElement(locatorKey);
  }
);

Then(
  'visual validation passes for {string} page',
  async ({ commonPage }, pageName: string) => {
    await commonPage.assertVisualPage(pageName);
  }
);
