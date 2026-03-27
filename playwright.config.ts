import * as dotenv from 'dotenv';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const ENV = process.env.ENV ?? 'dev';
const envFile = path.resolve(process.cwd(), 'env', `${ENV}.env`);
dotenv.config({ path: envFile });
console.log(`Loaded environment variables from ${envFile}`);

const RETRIES = Number(process.env.PW_RETRIES ?? (process.env.CI ? 2 : 2));

const testDir = defineBddConfig({
  features: ['src/features/**/*.feature'],
  steps: [
    'src/fixtures/Fixtures.ts',
    'src/step-definitions/**/*.{ts,js}',
    'src/hooks/**/*.{ts,js}',
  ],
  outputDir: '.features-gen',
  missingSteps: 'fail-on-gen',
});

export default defineConfig({
  testDir,
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: RETRIES,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['./src/reporters/flaky-reporter.ts'],
  ],
  use: {
    // ⚠️ CUSTOMIZATION REQUIRED: Set APP_URL environment variable
    // Example: export APP_URL=https://your-app.com
    // Set in: .env file (local) or CI/CD secrets (pipeline)
    baseURL: process.env.APP_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 60 * 1000,
    navigationTimeout: 60 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
