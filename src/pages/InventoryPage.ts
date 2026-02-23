import { Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class InventoryPage extends BasePage {
  private get inventoryContainer(): Locator {
    return this.getByKey('inventory_container');
  }

  private get inventoryItems(): Locator {
    return this.getByKey('inventory_item');
  }

  private get firstAddToCartButton(): Locator {
    // If the app doesn't have stable data-test for each "Add to cart" button,
    // keep it as a locator() here (not great, but practical).
    return this.page.locator('button:has-text("Add to cart")').first();
  }

  async assertInventoryLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
    this.logger.info('Inventory loaded - container and first item visible');
  }

  async addFirstItemToCart(): Promise<void> {
    await this.assertInventoryLoaded();
    await this.firstAddToCartButton.click();
    this.logger.info('Added first item to cart');
  }

  getVisualElement(elementName: string): Locator {
    switch (elementName.trim().toLowerCase()) {
      case 'inventory':
      case 'inventorycontainer':
      case 'inventorylist':
        return this.inventoryContainer;

      case 'firstitem':
      case 'firstinventoryitem':
        return this.inventoryItems.first();

      default:
        throw new Error(`Unknown inventory elementName "${elementName}"`);
    }
  }
}
