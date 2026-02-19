import { Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export class LoginLocators {
  // SauceDemo uses data-test="username", "password", "login-button", "error"
  readonly username = 'username';
  readonly password = 'password';
  readonly loginButton = 'login-button';
  readonly error = 'error';
}

export default class LoginPage extends BasePage {
  private readonly loc = new LoginLocators();

  private get usernameInput(): Locator {
    return this.getByDataTest(this.loc.username);
  }

  private get passwordInput(): Locator {
    return this.getByDataTest(this.loc.password);
  }

  private get loginBtn(): Locator {
    return this.getByDataTest(this.loc.loginButton);
  }

  private get errorBanner(): Locator {
    return this.getByDataTest(this.loc.error);
  }

  async login(username: string, password: string): Promise<void> {
    this.logger.info('Performing login for user: ' + username);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    this.logger.info('Login button clicked');
  }

  async assertLoginSuccess(): Promise<void> {
    // inventory page container (SauceDemo)
    await expect(this.page.locator('[data-test="inventory-container"]')).toBeVisible();
    this.logger.info('Login successful - inventory container visible');
  }

  async assertLoginErrorVisible(): Promise<void> {
    await expect(this.errorBanner).toBeVisible();
    this.logger.info('Login error banner visible');
  }
}
