/**
 * EXAMPLE PAGE OBJECT - TEMPLATE
 * 
 * ⚠️ CUSTOMIZATION REQUIRED: Use this as a template for your application's page objects.
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to create a new page: `cp ExamplePage.ts YourPageName.ts`
 * 2. Replace 'Example' with your page name in the class declaration
 * 3. Replace method names with your application's user actions
 * 4. Replace locator keys (e.g., login_username) with your app's actual keys
 * 5. Do NOT add business logic here - keep it to UI interactions
 * 6. Methods should represent user actions (login, search, addToCart, etc.)
 * 
 * PATTERN:
 * - Extend BasePage to inherit generic helpers
 * - Each method performs ONE logical user action
 * - Use getByKey(), clickByKey(), inputInElementByKey() from BasePage
 * - Use this.logger for debugging
 * - Return 'this' for method chaining where appropriate
 */

import { BasePage } from './BasePage';
import { asLocatorKey } from '../utils/asLocatorKey';

export class ExamplePage extends BasePage {
  /**
   * Example: Fill username field
   * Replace method name and locator key with your app's requirements
   */
  async fillUsername(username: string): Promise<void> {
    // TODO: Replace 'login_usernameInput' with your actual locator key
    // See: src/config/config_locators.ts for available keys
    await this.inputInElementByKey('login_usernameInput', username);
    this.logger.info(`Filled username: ${username}`);
  }

  /**
   * Example: Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    // TODO: Replace 'login_passwordInput' with your actual locator key
    await this.inputInElementByKey('login_passwordInput', password);
    this.logger.info('Filled password');
  }

  /**
   * Example: Click login button
   */
  async clickLogin(): Promise<void> {
    // TODO: Replace 'login_submitButton' with your actual locator key
    await this.clickByKey('login_submitButton');
    this.logger.info('Clicked login button');
  }

  /**
   * Example: Composite action - login with credentials
   * Chains multiple simple actions into a business workflow
   */
  async loginAs(username: string, password: string): Promise<void> {
    this.logger.info(`Attempting login for user: ${username}`);
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Example: Verify error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    // TODO: Replace 'login_errorMessage' with your actual locator key
    try {
      await this.assertVisibleByKey('login_errorMessage');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Example: Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    // TODO: Replace 'login_errorMessage' with your actual locator key
    const locator = this.getByKey('login_errorMessage');
    return await locator.textContent() || '';
  }
}

