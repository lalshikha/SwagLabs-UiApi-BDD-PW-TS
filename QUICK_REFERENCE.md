# Quick Reference Guide

Save this page to your browser bookmarks for quick access while testing!

---

## Common Commands

```bash
# Run all tests (headless)
npm run pw:test

# Run with browser window visible
npm run pw:headed

# Interactive debug mode
npm run pw:debug

# Run specific feature file
npm run pw:test src/features/ui/dashboard.feature

# Run matching scenario name
npm run pw:test -g "scenario name here"

# View HTML test report
npm run pw:report

# Generate BDD specs from features
npm run bddgen
```

---

## File Customization Checklist

- [ ] **Step 1**: Set `APP_URL` in `.env`
- [ ] **Step 2**: Update locators in `src/config/config_locators.ts`
- [ ] **Step 3**: Create page objects (copy `ExamplePage.ts` pattern)
- [ ] **Step 4**: Add pages to `src/fixtures/Fixtures.ts`
- [ ] **Step 5**: Write feature files in `src/features/ui/`
- [ ] **Step 6**: Create step definitions in `src/step-definitions/ui/`
- [ ] **Step 7**: Add test data to `src/test-data/dev/*.json`
- [ ] **Step 8**: Run `npm run pw:test` to validate

---

## Folder Structure - What Goes Where

```
src/
├── config/
│   └── config_locators.ts          ← YOUR: UI selectors/locators
├── pages/
│   ├── ExamplePage.ts              ← COPY: Use as template
│   ├── YourPage.ts (new)           ← YOUR: Page objects here
│   └── BasePage.ts                 ← FRAMEWORK: Don't modify
├── features/ui/
│   ├── example.feature             ← COPY: Use as template
│   └── your-feature.feature (new)  ← YOUR: Gherkin scenarios here
├── step-definitions/ui/
│   ├── exampleSteps.ts             ← COPY: Use as template
│   └── yourSteps.ts (new)          ← YOUR: Step implementation here
├── test-data/dev/
│   ├── example.json                ← COPY: Use as template
│   └── your-feature.json (new)     ← YOUR: Test data here
├── fixtures/
│   └── Fixtures.ts                 ← UPDATE: Add your page objects
└── services/
    └── ApiService.ts               ← CUSTOMIZE: Add your API endpoints
```

---

## Page Object Pattern

### Template (copy this)

```typescript
import { BasePage } from './BasePage';

export class YourPageName extends BasePage {
  
  // Action: Perform one user interaction
  async clickButton(): Promise<void> {
    // TODO: Replace 'yourpage_button' with your locator key
    await this.clickByKey('yourpage_button');
  }

  // Check: Verify element state
  async isHeaderVisible(): Promise<boolean> {
    try {
      await this.assertVisibleByKey('yourpage_header');
      return true;
    } catch {
      return false;
    }
  }

  // Composite: Combine multiple actions
  async completeForm(name: string, email: string): Promise<void> {
    await this.inputInElementByKey('yourpage_nameInput', name);
    await this.inputInElementByKey('yourpage_emailInput', email);
    await this.clickByKey('yourpage_submitButton');
  }
}
```

### Available BasePage Methods

```typescript
// Locate elements
this.getByKey('locatorKey')                    // Get Locator
this.byId('id') / this.byRole() / this.byText() // Alternative strategies

// Interact
await this.clickByKey('key')                   // Click
await this.inputInElementByKey('key', values) // Type text
await this.selectByKey('key', options)        // Dropdown

// Verify
await this.assertVisibleByKey('key')           // Element visible
await this.assertContainsTextByKey('key', text) // Text present

// Visual
await this.assertPageScreenshot()              // Full page
await this.assertElementScreenshot('key')     // Single element
```

---

## Step Definition Pattern

### Template (copy this)

```typescript
import { Given, When, Then } from '../../fixtures/Fixtures';

// Setup
Given('precondition is met', async ({ page }) => {
  // Setup state
  await page.goto('/page');
});

// Action
When('user performs action', async ({ yourPageObject, td }) => {
  // td() = test data resolver
  const value = td('testdata.field');
  await yourPageObject.performAction(value);
});

// Assertion
Then('expected outcome occurs', async ({ yourPageObject }) => {
  const result = await yourPageObject.verifyState();
  if (!result) throw new Error('Verification failed');
});
```

### Step Registration

```typescript
// Simple text matching
Given('user does something', async (...) => {

// With string parameter
When('user enters {string}', async ({ pageObject }, value: string) => {
  await pageObject.enter(value);

// Multi-parameter
When('user {string} with {int} items', async (..., action, count) => {
```

---

## Feature File Pattern

### Template (copy this)

```gherkin
@ui @myfeature
Feature: Feature name

  Background:
    # Runs before each scenario
    Given user is logged in

  @TCId-MyFeature001 @smoke
  Scenario: What the user does
    When user performs action
    Then expected result occurs

  @TCId-MyFeature002
  Scenario Outline: Multiple variations
    When user enters <value>
    Then result is <expected>

    Examples:
      | value | expected |
      | abc   | success  |
      | xyz   | error    |
```

---

## Locator Strategies (Priority Order)

### 1. data-testid (BEST)
```typescript
'[data-testid="submit-button"]'
```

### 2. ARIA Role (GOOD)
```typescript
'button:has-text("Submit")'
'role:textbox'
```

### 3. Text (FAIR)
```typescript
'text:Welcome'
'*:has-text("Click me")'
```

### 4. CSS (AVOID - too brittle)
```typescript
'#main > form > button:nth-child(3)'  // NO!
```

### 5. XPath (NEVER)
```typescript
'//button[@id="submit"]'  // Last resort only!
```

---

## Test Data Pattern

### File: `src/test-data/dev/myfeature.json`

```json
{
  "TCId-MyFeature001": {
    "username": "testuser@example.com",
    "password": "SecurePass123!",
    "expectedResult": "success"
  },

  "TCId-MyFeature002": {
    "invalidInput": "bad data",
    "expectedError": "Invalid input"
  }
}
```

### Usage in Steps

```typescript
Then('step text', async ({ td }) => {
  // Reference test data by key
  const email = td('testdata.username');
  
  // Or use directly in scenarios:
  // Then user enters "testdata.username"  // td() called automatically
});
```

---

## Debugging Tips

### Interactive Debug
```bash
npm run pw:debug
# Browser opens, use Playwright Inspector to test selectors
```

### Pause at Step
```typescript
// Add to step definition
await page.pause();  // Execution stops, browser stays open
```

### Check Selector
```bash
npm run pw:debug
# Right-click element -> Use "Inspect" to verify selector
```

### View Logs
```bash
tail -f logs/test.log
# Watch logs in real-time
```

### Screenshot
```typescript
// Manual screenshot
await page.screenshot({ path: 'debug.png' });
```

---

## CI/CD Environment Variables

```bash
# GitHub Actions / Jenkins / Azure DevOps
APP_URL=https://staging.myapp.com
ENV=staging
PW_WORKERS=4
PW_RETRIES=2
```

---

## Verification Checklist

After customization, verify:

- ✅ `.env` file configured with your `APP_URL`
- ✅ All locators updated in `config_locators.ts`
- ✅ At least one page object created
- ✅ At least one feature file written
- ✅ Test runs: `npm run pw:test`
- ✅ Report generates: `npm run pw:report`

---

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| `Module not found` | Run `npm install` |
| `Locator key not found` | Add to `config_locators.ts` |
| `Test data missing` | Add to `src/test-data/dev/` |
| `Element not found` | Check locator in debug mode |
| `Tests timeout` | Increase `navigationTimeout` in config |
| `Flaky tests` | Use `data-testid`, avoid CSS selectors |
| `CI/CD fails` | Set `APP_URL` environment variable |

---

## Links & Resources

- **Playwright Docs**: https://playwright.dev/docs/intro
- **Gherkin Syntax**: https://cucumber.io/docs/gherkin/
- **ARIA Roles**: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
- **CSS Selectors**: https://www.w3schools.com/cssref/css_selectors.asp

---

**Last Updated**: March 2026
**Framework**: Playwright + BDD (Cucumber)
