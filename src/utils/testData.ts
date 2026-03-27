/**
 * TEST DATA CONFIGURATION
 * 
 * This file should NOT contain hardcoded values.
 * All application-specific configuration is provided via environment variables.
 * 
 * Configuration Sources (in order of priority):
 * 1. Environment variables (set in CI/CD or .env file)
 * 2. playwright.config.ts baseURL setting
 * 3. Runtime test data loaded from src/test-data/dev/*.json
 */

// Example: Access base URL from environment
export function getAppUrl(): string {
  const url = process.env.APP_URL;
  if (!url) {
    throw new Error(
      'APP_URL environment variable is not set. ' +
      'Set it in .env file or CI/CD pipeline. ' +
      'Example: APP_URL=https://myapp.com'
    );
  }
  return url;
}

/**
 * Test data structure template
 * 
 * Each test file should have a corresponding JSON file in src/test-data/dev/
 * identified by TestCaseId (TCId)
 */
export type TestData = Record<string, Record<string, string>>;
