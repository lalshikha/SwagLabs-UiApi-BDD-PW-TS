import { Page, Locator } from '@playwright/test';
import logger from '../utils/logger';
import { compareWithBaseline, VisualCompareOptions } from '../utils/visualCompare';
import { L, type LocatorKey } from '../src/config/config_locators';


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
   * Central accessor: pass a key from config_locators (Option B).
   * Default behavior: treat mapped value as data-test attribute value.
   *
   * If later you want to support non-data-test selectors, you can add a convention like:
   * L.someKey = 'css:button:has-text("Add to cart")'
   */
  protected getByKey(key: LocatorKey): Locator {
    const raw = L[key];

    // Optional extension point:
    if (raw.startsWith('css:')) return this.page.locator(raw.replace(/^css:/, ''));

    return this.getByDataTest(raw);
  }

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
