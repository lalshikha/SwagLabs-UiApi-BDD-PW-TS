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

  // --------------------------
  // Locator helpers (by attrs)
  // --------------------------

  protected byId(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  protected byDataTest(value: string): Locator {
    return this.page.locator(`[data-test="${value}"]`);
  }

  protected byTitle(title: string | RegExp): Locator {
    return this.page.getByTitle(title);
  }

  protected byRole(
    role: Parameters<Page['getByRole']>[0],
    name?: string | RegExp
  ): Locator {
    return this.page.getByRole(role, name ? { name } : undefined);
  }

  /** Use in steps when you want a Locator (without exposing selectors). */
  public $(key: LocatorKey): Locator {
    return this.getByKey(key);
  }

  protected getByKey(key: LocatorKey): Locator {
    const raw = L[key];
    if (raw.startsWith('css:')) return this.page.locator(raw.replace(/^css:/, ''));
    return this.byDataTest(raw);
  }
  
  // data inputs
  protected async inputInElementById(id: string, input: string, message?: string): Promise<void> {
    await this.byId(id).fill(input);
  }

  protected async inputInElementByDT(locator: string, input: string, message?: string): Promise<void> {
    await this.byDataTest(locator).fill(input);
  }
  
  // element clicks
  protected async clickElementById(id: string, message?: string): Promise<void> {
    await this.byId(id).click();
  }

  protected async clickElementByDT(value: string, message?: string): Promise<void> {
    await this.byDataTest(value).click();
  }

  // Visibility asserts
  protected async assertElementByIdIsVisible(id: string, message?: string): Promise<void> {
    await expect(this.byId(id), message).toBeVisible();
  }

  protected async assertElementByDTIsVisible(value: string, message?: string): Promise<void> {
    await expect(this.byDataTest(value), message).toBeVisible();
  }

  // Text asserts
  protected async assertTextMatchById(id: string, matchWith: string | RegExp, message?: string): Promise<void> {
    await expect(this.byId(id), message).toContainText(matchWith);
  }

  protected async assertTextMatchByDT(key: string, expectedText: string | RegExp, message?: string): Promise<void> {
    await expect(this.byDataTest(key), message).toContainText(expectedText);
  }

  public async inputInElementByKey(key: LocatorKey, input: string, message?: string): Promise<void> {
    await this.$(key).fill(input);
  }

  public async clickByKey(key: LocatorKey, message?: string): Promise<void> {
  await expect(this.$(key), message).toBeVisible();
  await this.$(key).click();
}

public async assertVisibleByKey(key: LocatorKey, message?: string): Promise<void> {
  await expect(this.$(key), message).toBeVisible();
}

public async assertContainsTextByKey(key: LocatorKey, expectedText: string | RegExp, message?: string): Promise<void> {
  await expect(this.$(key), message).toContainText(expectedText);
}

  // --------------------------
  // Visual compare (unchanged)
  // --------------------------

  protected visualDefaults(): VisualCompareOptions {
    return {
      threshold: 0.1,
      maxDiffPixels: -1,
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
