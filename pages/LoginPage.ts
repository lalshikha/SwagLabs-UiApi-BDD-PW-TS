import { Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import { testUsers, saucedemoUrl } from '../utils/testData';

type LoginVisualKey = 'username' | 'password' | 'loginbutton';

export default class LoginPage extends BasePage {
  private get usernameInput(): Locator {
    return this.getByKey('login_username');
  }

  private get passwordInput(): Locator {
    return this.getByKey('login_password');
  }

  private get loginBtn(): Locator {
    return this.getByKey('login_loginButton');
  }

  private get errorBanner(): Locator {
    return this.getByKey('login_error');
  }

  async open(): Promise<void> {
    await this.page.goto(process.env.APP_URL ?? saucedemoUrl, { waitUntil: 'domcontentloaded' });
    this.logger.info('Opened saucedemo');
  }

  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Performing login for user: ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async loginAs(userType: string): Promise<void> {
    const user = testUsers[userType];
    if (!user) throw new Error(`Unknown userType "${userType}" in testUsers`);
    await this.login(user.username, user.password);
  }

  async assertLoginSuccess(): Promise<void> {
    await expect(this.getByKey('inventory_container')).toBeVisible();
    this.logger.info('Login successful - inventory container visible');
  }

  async assertLoginErrorVisible(): Promise<void> {
    await expect(this.errorBanner).toBeVisible();
    this.logger.info('Login error banner visible');
  }

  async assertLoginErrorText(expected: string): Promise<void> {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toHaveText(expected);
    this.logger.info(`Login error validated: ${expected}`);
  }


  /**
   * Only the keys you want to expose to feature files.
   * Step passes: username | password | loginbutton
   */
  getVisualElement(elementKey: string): Locator {
    const k = elementKey.trim().toLowerCase() as LoginVisualKey;

    switch (k) {
      case 'username':
        return this.usernameInput;
      case 'password':
        return this.passwordInput;
      case 'loginbutton':
        return this.loginBtn;
      default:
        throw new Error(`Unknown login elementKey "${elementKey}" (use: username|password|loginbutton)`);
    }
  }
}
