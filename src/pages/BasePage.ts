import { Page, Locator, expect } from '@playwright/test';
import logger from '../utils/logger';
import { compareWithBaseline, VisualCompareOptions } from '../utils/visualCompare';
import { L, type LocatorKey } from '../config/config_locators';

type PageShotOptions = Parameters<Page['screenshot']>[0];
type LocatorShotOptions = Parameters<Locator['screenshot']>[0];

export default abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger = logger;

  constructor(page: Page) {
    this.page = page;
    this.logger.info(`${this.constructor.name} initialized`);
  }

  // Your AUT uses data-test="..."
  protected getByDataTest(value: string): Locator {
    return this.page.locator(`[data-test="${value}"]`);
  }

  /**
   * Central accessor: pass a key from config_locators.
   * Default behavior: treat mapped value as data-test attribute value.
   */
  protected getByKey(key: LocatorKey): Locator {
    const raw = L[key];

    // Optional extension point:
    if (raw.startsWith('css:')) return this.page.locator(raw.replace(/^css:/, ''));

    return this.getByDataTest(raw);
  }

  // --------------------------
  // Generic keyword methods
  // --------------------------

  /** Use in steps when you want a Locator (without exposing selectors). */
  public $(key: LocatorKey): Locator {
    return this.getByKey(key);
  }

  public async click(key: LocatorKey): Promise<void> {
    await this.$(key).click();
  }

  public async enterText(key: LocatorKey, value: string): Promise<void> {
    await this.$(key).fill(value);
  }

  public async assertVisible(key: LocatorKey): Promise<void> {
    await expect(this.$(key)).toBeVisible();
  }

  public async assertText(key: LocatorKey, expected: string): Promise<void> {
    await expect(this.$(key)).toHaveText(expected);
  }

  public async assertContainsText(key: LocatorKey, expected: string): Promise<void> {
    await expect(this.$(key)).toContainText(expected);
  }

  // --------------------------
  // Visual compare (unchanged)
  // --------------------------

  protected visualDefaults(): VisualCompareOptions {
    return {
      threshold: 0.1,
      maxDiffPixels: -1, // disabled (ratio-only)
      maxDiffPixelRatio: 0.001,
      maxSizeDiffPixels: 0,
      includeAA: false,
      alpha: 0.1,
    };
  }

  async assertPageScreenshot(
    snapshotFileName: string,
    visualOpts?: VisualCompareOptions,
    shotOpts?: PageShotOptions
  ): Promise<void> {
    const options: VisualCompareOptions = {
      ...this.visualDefaults(),
      ...(visualOpts ?? {}),
      maxDiffPixels: -1,
    };

    const screenshotOptions: PageShotOptions = {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      ...shotOpts,
    };

    const buffer = await this.page.screenshot(screenshotOptions);
    await compareWithBaseline({ screenshotBuffer: buffer, snapshotFileName, options });
  }

  async assertElementScreenshot(
    element: Locator,
    snapshotFileName: string,
    visualOpts?: VisualCompareOptions,
    shotOpts?: LocatorShotOptions
  ): Promise<void> {
    const options: VisualCompareOptions = {
      ...this.visualDefaults(),
      ...(visualOpts ?? {}),
      maxDiffPixels: -1,
    };

    await element.waitFor({ state: 'visible' });

    const screenshotOptions: LocatorShotOptions = {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      ...shotOpts,
    };

    const buffer = await element.screenshot(screenshotOptions);
    await compareWithBaseline({ screenshotBuffer: buffer, snapshotFileName, options });
  }
}
