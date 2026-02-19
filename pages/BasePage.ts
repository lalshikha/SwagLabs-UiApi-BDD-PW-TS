import { Page, Locator } from '@playwright/test';
import logger from '../utils/logger';
import { compareWithBaseline, VisualCompareOptions } from '../utils/visualCompare';

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

  async assertVisualSnapshot(snapshotFileName: string, opts: VisualCompareOptions): Promise<void> {
    // Disable animations once per page (stabilizes diffs) [web:323]
    const anyPage = this.page as any;
    if (!anyPage.__visualStabilized) {
      await this.page.addStyleTag({
        content: `*,*::before,*::after{
        animation-duration:1ms !important;
        transition-duration:0s !important;
        caret-color: transparent !important;
      }`
      });
      anyPage.__visualStabilized = true;
    }

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');

    this.logger.info(
      'Visual config -> pixelRatio: ' +
      opts.maxDiffPixelRatio +
      ', pixels: ' +
      opts.maxDiffPixels +
      ', threshold: ' +
      opts.threshold +
      ', maxSizeDiff: ' +
      opts.maxSizeDiffPixels
    );

    const buffer = await this.page.screenshot({ fullPage: true });
    await compareWithBaseline({
      screenshotBuffer: buffer,
      snapshotFileName,
      options: opts,
    });
  }

}

