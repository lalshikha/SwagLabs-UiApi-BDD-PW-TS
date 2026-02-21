// playwright.config.ts
import * as dotenv from 'dotenv';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Load env as early as possible (before any imports rely on process.env)
const ENV = process.env.ENV ?? 'dev';
const envFile = path.resolve(process.cwd(), 'env', `${ENV}.env`);
dotenv.config({ path: envFile });
console.log(`Loaded environment variables from ${envFile}`);

const testDir = defineBddConfig({
  paths: ['features/**/*.feature'],
  require: ['fixtures/**/*.ts', 'step-definitions/**/*.ts'],
});

export default defineConfig({
  testDir,
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['junit', { outputFile: 'reports/junit-results.xml' }]],
  use: {
    // Prefer env-driven URL; fall back to saucedemo default
    baseURL: process.env.APP_URL ?? 'https://www.saucedemo.com/',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 60 * 1000,
    navigationTimeout: 60 * 1000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
