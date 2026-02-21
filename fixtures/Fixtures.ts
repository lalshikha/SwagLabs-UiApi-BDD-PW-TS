// fixtures/Fixtures.ts
import { test as base, createBdd } from 'playwright-bdd';
import { request, type APIRequestContext } from '@playwright/test';

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
};

export const test = base.extend<AppFixtures>({
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
    const baseURL =
      process.env.API_BASE_URL ??
      process.env.APP_URL ??
      'https://www.saucedemo.com/';

    const ctx = await request.newContext({ baseURL });
    await use(ctx);
    await ctx.dispose();
  },

  apiService: async ({ apiContext }, use) => {
    await use(new ApiService(apiContext));
  },
});

export const { Given, When, Then } = createBdd(test);
