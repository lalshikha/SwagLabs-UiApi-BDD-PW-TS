import { Before, After, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, type Browser, request } from '@playwright/test';
import type { Fixtures } from '../fixtures/Fixtures';

let browser: Browser;

Before({ timeout: 60 * 1000 }, async function (this: Fixtures, { pickle }) {
  this.logger.info('Starting test');

  // store scenario name for screenshots/logging
  this.scenarioName = pickle.name; // pickle is provided to hooks [web:136]

  browser = await chromium.launch({ headless: true });

  this.context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  this.page = await this.context.newPage();

  // Recommended: create APIRequestContext via request.newContext() for API testing [web:119]
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || process.env.APP_URL,
  });
});

After({ timeout: 30 * 1000 }, async function (this: Fixtures, { result }) {
  if (result?.status === Status.FAILED) {
    const name = (this.scenarioName || 'test').replace(/[^a-z0-9]/gi, '_');
    await this.page?.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  await this.apiContext?.dispose();
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async () => {
  await browser?.close();
});
