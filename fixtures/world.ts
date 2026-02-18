import { World, IWorldOptions } from '@cucumber/cucumber';
import { Page, BrowserContext, APIRequestContext } from '@playwright/test';
import logger from '../utils/logger';
import { testUsers } from '../utils/testData';

export type TestData = {
  testUsers: typeof testUsers;
};

export class CustomWorld extends World {
  page?: Page;
  context?: BrowserContext;
  apiContext?: APIRequestContext;

  testData: TestData;
  logger = logger;

  // Add this
  scenarioName: string = 'unknown';

  constructor(options: IWorldOptions) {
    super(options);
    this.testData = { testUsers };
  }
}
