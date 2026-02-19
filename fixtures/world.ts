// fixtures/world.ts
import { World, IWorldOptions, ITestCaseHookParameter } from '@cucumber/cucumber';
import type { Page, BrowserContext, APIRequestContext } from '@playwright/test';

import logger from '../utils/logger';
import { testUsers } from '../utils/testData';

export class CustomWorld extends World {
  public page?: Page;
  public context?: BrowserContext;
  public apiContext?: APIRequestContext;

  // Test data container (same as you had)
  public testData = { testUsers };

  // Logger instance (same as you had)
  public logger = logger;

  // Scenario metadata (used by hooks)
  public pickle!: ITestCaseHookParameter['pickle'];

  // Used for visual baseline naming
  public currentUserName?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
