import { Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export class InventoryLocators {
  readonly inventoryContainer = 'inventory-container';
  readonly addToCartButtons = 'add-to-cart';
  readonly cartBadge = 'shopping_cart_badge';
}

export default class InventoryPage extends BasePage {
  private readonly loc = new InventoryLocators();

  private get inventoryContainer(): Locator {
    return this.getByDataTest(this.loc.inventoryContainer);
  }

  private get firstAddToCartButton(): Locator {
    return this.page.locator('[data-test^="add-to-cart"]').first();
  }

private get cartBadge(): Locator {
  return this.page.locator('.shopping_cart_badge');
}

  async assertInventoryLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    const count = await this.page.locator('[data-test="inventory-item"]').count();
    expect(count).toBeGreaterThan(0);
    this.logger.info(count + ' inventory items loaded');
  }

async addFirstItemToCart(): Promise<void> {
  await expect(this.inventoryContainer).toBeVisible();
  await this.firstAddToCartButton.click();
  await expect(this.cartBadge).toHaveText('1');
  this.logger.info('Added first item to cart and badge updated to 1');
}

  async captureInventoryScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: 'screenshots/' + fileName, fullPage: true });
    this.logger.info('Captured screenshot: ' + fileName);
  }
}
