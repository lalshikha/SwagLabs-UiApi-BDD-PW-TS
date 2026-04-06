/**
 * EXAMPLE STEP DEFINITIONS - TEMPLATE (For Complex Logic Only)
 * 
 * ⚠️ IMPORTANT: DO NOT USE FOR SIMPLE UI INTERACTIONS
 * 
 * YOU PROBABLY DON'T NEED THIS FILE!
 * Use commonSteps.ts for 95% of your test automation.
 * 
 * Available Generic Steps (Use these instead):
 * - Given user opens the application
 * - When user enters "{string}" in "{string}"
 * - When user clicks "{string}"
 * - Then "{string}" should be visible
 * - Then "{string}" text should be "{string}"
 * 
 * INSTRUCTIONS (If you must create custom steps):
 * 1. Rename file to match feature area: dashboardSteps.ts, checkoutSteps.ts
 * 2. Only add steps for COMPLEX workflows
 * 3. Keep using fixture injection (do NOT create global instances)
 * 4. Use asLocatorKey() for compile-time validation
 * 
 * PATTERN:
 * - Import { When, Then, Given } from fixtures
 * - Each step performs ONE logical user action
 * - Use this.logger for debugging
 * - Reference locator keys from config_locators.ts
 * - Use td() helper for test data resolution
 * 
 * Example of COMPLEX step (worth custom code):
 * - Parse a data grid and validate content
 * - Multi-step checkout workflow
 * - Complex form validation with cross-field dependencies
 */

import { When, Then, Given } from '../../fixtures/Fixtures';
import { asLocatorKey } from '../../utils/asLocatorKey';

/**
 * EXAMPLE: Complex workflow step (Only if absolutely necessary)
 * 
 * ⚠️ Consider using commonSteps instead:
 * Instead of: When user performs complex checkout
 * Use:
 *   When user enters "testdata.email" in "checkout_emailInput"
 *   And user enters "testdata.cardNumber" in "checkout_cardInput"
 *   And user clicks "checkout_submitButton"
 */
When('user performs complex order validation', async ({ commonPage, td }) => {
  // TODO: Only implement if this multi-step workflow cannot be expressed
  // as separate generic steps in the feature file
  
  // Example: Validate order contains specific items and total
  // const items = await commonPage.getAllVisibleText('order_itemRow');
  // const total = await commonPage.getTextByKey('order_total');
  // if (items.length === 0) throw new Error('No items in order');
});

/**
 * EXAMPLE: Complex assertion (Only if simple text matching won't work)
 * 
 * ⚠️ Consider using commonSteps instead:
 * Instead of: Then order total should be calculated correctly
 * Use:
 *   Then "order_totalAmount" text should be "$123.45"
 */
Then('complex data validation passes', async ({ commonPage }) => {
  // TODO: Only implement complex assertions here
  // For simple text checks, use commonSteps:
  // Then "{locatorKey}" text should be "{expectedText}"
  throw new Error('Implement your complex assertion logic here');
});

// TODO: Add your application-specific steps here, following the pattern above
// Remember: Each step should perform ONE logical action
// Keep steps simple and readable for non-technical stakeholders
