// fixtures/Fixtures.ts
import { test as base, createBdd } from 'playwright-bdd';
import { request, type APIRequestContext, type TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CommonPage from '../pages/CommonPage';
import ApiService from '../services/ApiService';

export type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  commonPage: CommonPage;

  apiContext: APIRequestContext;
  apiService: ApiService;

  /**
   * Low-level resolver:
   * - If value starts with "testdata.", it will be resolved from JSON using ENV + feature + TCId
   * - Otherwise returns value as-is
   */
  resolveTestData: (value: string, testInfo: TestInfo) => any;

  /**
   * Convenience helper for steps:
   * td("testdata.user1") -> "standard_user"
   * td("abc") -> "abc"
   *
   * Uses playwright-bdd $testInfo fixture internally, so steps don't need to pass it.
   */
  td: (value: string) => string;
};

function getTcIdFromTags(tags: string[]): string {
  const tag = tags.find((t) => t.startsWith('@TCId-'));
  if (!tag) throw new Error(`Missing @TCId-xxx tag. Current tags: ${tags.join(', ')}`);
  return tag.substring(1); // "TCId-001"
}

/**
 * In playwright-bdd, tests are generated into:
 *   ".features-gen/.../<feature>.feature.spec.(js|ts)"
 * testInfo.file points to that generated spec file.
 * We want base "<feature>" from "<feature>.feature.spec.js".
 */
function getFeatureBaseNameFromGeneratedSpec(testInfo: TestInfo): string {
  const file = testInfo.file;
  const specName = path.basename(file); // e.g. "login.feature.spec.js"

  const withoutSpecExt = specName.replace(/\.spec\.(js|ts)$/i, ''); // "login.feature"
  const withoutFeatureExt = withoutSpecExt.replace(/\.feature$/i, ''); // "login"

  if (!withoutFeatureExt || withoutFeatureExt === specName) {
    throw new Error(`Cannot derive feature name from testInfo.file="${file}"`);
  }

  return withoutFeatureExt;
}

function loadFeatureJson(env: string, featureBaseName: string): Record<string, any> {
  const filePath = path.resolve(process.cwd(), 'test-data', env, `${featureBaseName}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Test-data file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export const test = base.extend<AppFixtures>({
  resolveTestData: async ({}, use) => {
    // Cache per process so repeated lookups don't re-read files.
    const cache = new Map<string, Record<string, any>>();

    const resolver = (value: string, testInfo: TestInfo) => {
      if (typeof value !== 'string') return value;
      if (!value.startsWith('testdata.')) return value;

      const env = process.env.ENV ?? 'dev';
      const tcId = getTcIdFromTags(testInfo.tags ?? []);
      const feature = getFeatureBaseNameFromGeneratedSpec(testInfo); // login / inventory / etc

      const cacheKey = `${env}::${feature}`;
      const json = cache.get(cacheKey) ?? loadFeatureJson(env, feature);
      cache.set(cacheKey, json);

      const key = value.replace('testdata.', '');
      const row = json[tcId];
      if (!row) throw new Error(`No data for ${tcId} in ${feature}.json (env=${env})`);

      if (!(key in row)) {
        throw new Error(`Key "${key}" missing for ${tcId} in ${feature}.json (env=${env})`);
      }

      return row[key];
    };

    await use(resolver);
  },

  // Convenience helper used by step files
  td: async ({ resolveTestData, $testInfo }, use) => {
    await use((value: string) => String(resolveTestData(value, $testInfo)));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },

  apiContext: async ({}, use) => {
    const baseURL = process.env.API_BASE_URL ?? process.env.APP_URL ?? 'https://www.saucedemo.com/';
    const ctx = await request.newContext({ baseURL });
    await use(ctx);
    await ctx.dispose();
  },

  apiService: async ({ apiContext }, use) => {
    await use(new ApiService(apiContext));
  },
});

export const { Given, When, Then } = createBdd(test);
