import { Before, After, AfterAll, Status, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from '../fixtures/world';

setWorldConstructor(CustomWorld);

let browser: Browser;

Before({ timeout: 60 * 1000 }, async function (this: CustomWorld) {
  this.logger.info('Starting test');
  browser = await chromium.launch({ headless: true });
  this.context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  this.page = await this.context.newPage();
  this.apiContext = this.context.request;
});

After({ timeout: 30 * 1000 }, async function (this: CustomWorld, { result }: any) {
  if (result?.status === Status.FAILED) {
    const name = (this.pickle?.name || 'test').replace(/[^a-z0-9]/gi, '_');
    await this.page?.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async () => {
  await browser?.close();
});