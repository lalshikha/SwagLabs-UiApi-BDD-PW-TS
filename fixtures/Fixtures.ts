import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page, APIRequestContext } from '@playwright/test';
import logger from '../utils/logger';

export class Fixtures extends World {
  // shared utils
  logger = logger;
  scenarioName?: string;

  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  apiContext?: APIRequestContext;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(Fixtures);
