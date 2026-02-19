// fixtures/world.ts
// In Cucumber, “World” is the name of the per-scenario state container that Cucumber exposes 
// to your step definitions as this. Cucumber’s docs literally call it World: an isolated 
// scope created new for each scenario, where you can set something in one step and read it 
// in later steps, and it’s discarded after the scenario ends.

// Your fixtures/world.ts defines a CustomWorld class that extends Cucumber’s built-in w
// orld, so Cucumber will instantiate it for every scenario and pass it as this into steps/hooks.

// That’s why we store things like:
// page, context, apiContext (so every step can use the same Playwright objects for that scenario),
// testData (so steps can read user/passwords),
// currentUserName (so your visual step can build the correct baseline filename)

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
