import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  // Where your .feature files live (based on your screenshot)
  paths: ['features/**/*.feature'],

  // Where your step-definition files live
  require: ['step-definitions/**/*.ts'],

  // IMPORTANT: this is your central fixtures file that exports { test, Given, When, Then }
  importTestFrom: './fixtures/Fixtures',
  // optional:
  // outputDir: '.features-gen' // you can set it; otherwise default is used
});

export default defineConfig({
  testDir, // <- generated bdd tests dir from .feature files
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['junit', { outputFile: 'reports/junit-results.xml' }]],
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 60 * 1000,
    navigationTimeout: 60 * 1000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
