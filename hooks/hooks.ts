import { Before, After, AfterAll, Status, setWorldConstructor } from '@cucumber/cucumber';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';
import logger from '../utils/logger';

setWorldConstructor(CustomWorld);

let browser: Browser;

Before({ timeout: 60 * 1000 }, async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  this.logger = logger;
  this.scenarioName = pickle?.name || 'unknown';

  this.logger.info('Starting scenario: ' + this.scenarioName);

  browser = await chromium.launch({ headless: true });
  this.context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  this.page = await this.context.newPage();
  this.apiContext = this.context.request;

  this.logger.info('World test users available: ' + Object.keys(this.testData.testUsers).join(','));
  this.logger.info('Browser launched successfully');
});

After({ timeout: 30 * 1000 }, async function (this: CustomWorld, scenarioResult: ITestCaseHookParameter) {
  const safeName = (this.scenarioName || 'unknown').replace(/[^a-z0-9]/gi, '_').toLowerCase();

  if (scenarioResult?.result?.status === Status.FAILED) {
    const screenshotPath = 'screenshots/' + safeName + '.png';
    await this.page?.screenshot({ path: screenshotPath, fullPage: true });
    this.logger.error('Scenario FAILED: ' + safeName + ' Screenshot: ' + screenshotPath);
  }

  await this.page?.close();
  await this.context?.close();
  await this.apiContext?.dispose();

  this.logger.info('Scenario finished: ' + safeName);
});

AfterAll(async function () {
  await browser?.close();
});
