import { Page, Locator } from '@playwright/test';
import logger from '../utils/logger';

export default abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger = logger;

  constructor(page: Page) {
    this.page = page;
    this.logger.info(this.constructor.name + ' initialized');
  }

  protected getByDataTest(value: string): Locator {
    return this.page.locator('[data-test="' + value + '"]');
  }
}
