import { Locator } from '@playwright/test';
import BasePage from './BasePage';

function ensurePng(name: string): string {
  return name.toLowerCase().endsWith('.png') ? name : `${name}.png`;
}

export default class CommonPage extends BasePage {
  /**
   * Locator registry lives here (Page layer), so steps stay clean.
   * Add more elements as needed.
   */
  private getElementLocator(elementName: string): Locator {
    const key = elementName.trim().toLowerCase();

    switch (key) {
      case 'username':
        return this.getByDataTest('username');

      case 'password':
        return this.getByDataTest('password');

      case 'loginbutton':
      case 'login-button':
        return this.getByDataTest('login-button');

      default:
        throw new Error(
          `Unknown element "${elementName}". Supported: username, password, loginbutton`
        );
    }
  }

  /**
   * 1) Page visual validation.
   * Call: "visual validation passes for login page"
   * Generates/compares: pageUnderTest_login.png
   */
  async assertVisualPage(pageName: string): Promise<void> {
    const key = pageName.trim().toLowerCase();
    const snapshot = ensurePng(`pageUnderTest_${key}`);
    await this.assertPageScreenshot(snapshot);
  }

  /**
   * 2) Element visual validation.
   * Call: "visual validation passes for username element"
   * Generates/compares: elementUnderTest_username.png
   */
  async assertVisualElement(elementName: string): Promise<void> {
    const key = elementName.trim().toLowerCase();
    const snapshot = ensurePng(`elementUnderTest_${key}`);

    const locator = this.getElementLocator(key);
    await this.assertElementScreenshot(locator, snapshot);
  }
}
