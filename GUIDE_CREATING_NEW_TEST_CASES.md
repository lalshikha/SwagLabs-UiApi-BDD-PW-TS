# Complete Guide: Creating and Running BDD Test Cases

## Table of Contents
1. [Framework Overview](#framework-overview)
2. [Directory Structure](#directory-structure)
3. [Step-by-Step Process](#step-by-step-process)
4. [Available Steps and Assertions](#available-steps-and-assertions)
5. [Locator Management](#locator-management)
6. [Test Data Management](#test-data-management)
7. [Running Tests](#running-tests)
8. [Report Generation](#report-generation)
9. [Complete Example: TCId-Inv003](#complete-example-tcid-inv003)

---

## Framework Overview

This is a **Playwright + Cucumber (BDD) + TypeScript** framework for UI and API testing.

### Technology Stack
- **Test Framework:** Playwright @1.58.2
- **BDD:** playwright-bdd @8.4.2
- **Language:** TypeScript
- **Page Objects:** Custom implementation with dynamic locators
- **Reporting:** Playwright HTML Reporter + JUnit XML

### Architecture
```
Feature Files (.feature) 
    ↓
Step Definitions (TypeScript)
    ↓
Page Objects (CommonPage, LoginPage, InventoryPage)
    ↓
BasePage (core assertions & helpers)
    ↓
Locators (centralized in config_locators.ts)
```

---

## Directory Structure

```
src/
├── config/
│   └── config_locators.ts          # All page locators centralized here
├── features/
│   ├── functional/
│   ├── ui/
│   │   ├── inventory.feature       # BDD feature files
│   │   ├── login.feature
│   │   └── flaky-demo.feature
│   └── visual/
├── fixtures/
│   └── Fixtures.ts                 # Test setup & dependency injection
├── hooks/
│   └── hooks.ts                    # Before/After test hooks
├── pages/
│   ├── BasePage.ts                 # Base class with assertion methods
│   ├── CommonPage.ts               # Shared page behavior
│   ├── InventoryPage.ts            # Inventory-specific page object
│   └── LoginPage.ts                # Login-specific page object
├── reporters/
│   └── flaky-reporter.ts           # Custom flaky test reporter
├── services/
│   └── ApiService.ts               # API testing service
├── step-definitions/
│   ├── functional/
│   │   └── apiSteps.ts
│   ├── shared/
│   │   └── commonSteps.ts          # Reusable steps (Given/When/Then)
│   └── ui/
│       ├── loginSteps.ts
│       ├── uiSteps.ts
│       ├── inventorySteps.ts
│       ├── dataUtilSteps.ts
│       └── flakyDemoSteps.ts
├── test-data/
│   ├── dev/
│   │   ├── inventory.json          # Test data (username, password, etc.)
│   │   ├── login.json
│   │   └── ...
│   ├── pp/
│   └── prod/
└── utils/
    ├── asLocatorKey.ts
    ├── dataUtils.ts
    ├── logger.ts
    ├── testData.ts
    └── visualCompare.ts
```

---

## Step-by-Step Process

### Step 1: Create or Update Feature File

**File:** `src/features/ui/inventory.feature`

```gherkin
@smoke @ui @regression @inventory
Feature: UI Inventory Functionality

  @TCId-Inv003
  Scenario: Verify first product details on inventory page
    Given user opens "saucedemoUrl"
    When user performs UI login with "testdata.username" and "testdata.password"
    Then "inventory_backpackTitleLink" text should be "Sauce Labs Backpack"
    And "inventory_backpackTitleLink" should be a clickable link
    And "inventory_backpackPrice" text should be "$29.99"
    And "inventory_addToCartButton" should be visible
```

### Step 2: Add Locators (if needed)

**File:** `src/config/config_locators.ts`

Only add locators if they don't already exist. Check the file first!

```typescript
export const L = {
  // Existing inventory page locators
  inventory_backpackTitleLink: 'item-4-title-link',
  inventory_backpackPrice: 'css:[data-test="inventory-list"] > [data-test="inventory-item"]:nth-child(1) [data-test="inventory-item-price"]',
  inventory_addToCartButton: 'add-to-cart-sauce-labs-backpack',
};
```

### Step 3: Add Test Data

**File:** `src/test-data/dev/inventory.json`

```json
{
  "TCId-Inv001": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "TCId-Inv002": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "TCId-Inv003": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

**Rules:**
- Use `@TCId-XxxYYY` tag in the feature file (e.g., `@TCId-Inv003`)
- Create matching entry in `inventory.json` with same key name (`TCId-Inv003`)
- For different environments (pp, prod), add corresponding JSON files there

### Step 4: Use Existing Steps or Create New Ones

**Check if your step exists in `src/step-definitions/shared/commonSteps.ts`:**

```typescript
// EXISTING STEPS - Use these!
Given('user opens {string}', async ({ page }, urlKey: string) => {...});
When('user performs UI login with {string} and {string}', async ({ loginPage, td }, username, password) => {...});
Then('{string} text should be {string}', async ({ commonPage }, key, expectedText) => {...});
Then('{string} should be visible', async ({ commonPage }, key) => {...});
Then('{string} should be a clickable link', async ({ commonPage }, key) => {...});
Then('page title should be {string}', async ({ commonPage }, expectedText) => {...});
Then('page title should not be {string}', async ({ commonPage }, expectedText) => {...});
```

---

## Available Steps and Assertions

### Given Steps
| Step | Purpose | Example |
|------|---------|---------|
| `user opens "{string}"` | Navigate to URL from testData | `Given user opens "saucedemoUrl"` |

### When Steps
| Step | Purpose | Example |
|------|---------|---------|
| `user performs UI login with "{string}" and "{string}"` | Login with credentials from test data | `When user performs UI login with "testdata.username" and "testdata.password"` |
| `user enters "{string}" in "{string}"` | Enter text in a field | `When user enters "email" in "login_username"` |
| `user clicks "{string}"` | Click an element | `When user clicks "inventory_hamburgerMenu"` |
| `user enters random registration data` | Generate random registration data | `When user enters random registration data` |

### Then Steps (Assertions)
| Step | Purpose | Example |
|------|---------|---------|
| `"{string}" should be visible` | Verify element is visible | `Then "inventory_addToCartButton" should be visible` |
| `"{string}" text should be "{string}"` | Verify element text | `Then "inventory_backpackTitleLink" text should be "Sauce Labs Backpack"` |
| `"{string}" should be a clickable link` | Verify element is a link (`<a>` tag) | `Then "inventory_backpackTitleLink" should be a clickable link` |
| `page title should be "{string}"` | Verify page title text | `Then page title should be "Products"` |
| `page title should not be "{string}"` | Verify page title is NOT text | `Then page title should not be "Products123"` |
| `visual validation passes for "{string}" page` | Compare page screenshot | `Then visual validation passes for "inventory" page` |
| `visual validation passes for "{string}" element` | Compare element screenshot | `Then visual validation passes for "login" element` |

### API Steps
| Step | Purpose |
|------|---------|
| `API service validates {word} login` | Validate login via API |

---

## Locator Management

### Locator File Location
**File:** `src/config/config_locators.ts`

### Locator Strategies Supported

1. **data-test attribute (default)**
   ```typescript
   inventory_addToCartButton: 'add-to-cart-sauce-labs-backpack'
   // Resolves to: [data-test="add-to-cart-sauce-labs-backpack"]
   ```

2. **CSS Selector**
   ```typescript
   inventory_backpackPrice: 'css:[data-test="inventory-list"] > [data-test="inventory-item"]:nth-child(1) [data-test="inventory-item-price"]'
   ```

3. **Role-based Locator**
   ```typescript
   inventory_hamburgerMenu: 'role:button|Open Menu'
   // Resolves to: getByRole('button', { name: 'Open Menu' })
   ```

4. **Text-based Locator**
   ```typescript
   inventory_pageTitle: 'text:Products'
   // Resolves to: getByText('Products', { exact: true })
   ```

5. **ID-based Locator**
   ```typescript
   someElement: 'id:elementId'
   // Resolves to: #elementId
   ```

6. **Title-based Locator**
   ```typescript
   someElement: 'title:Tooltip Text'
   // Resolves to: getByTitle('Tooltip Text')
   ```

7. **Fallback Locators** (for elements with multiple selectors)
   ```typescript
   login_loginButton: {
     primary: 'login-button-old',
     fallbacks: ['login-button'],
   }
   // Tries primary first, falls back to alternates if not found
   ```

### Best Practices
- **Keep locators descriptive:** `inventory_backpackTitleLink` not just `backpack`
- **Group by page/component:** All inventory page locators start with `inventory_`
- **Use data-test attributes when available** (most reliable)
- **Use fallbacks for elements that might change** (e.g., login button)
- **Check existing locators before adding new ones**

---

## Test Data Management

### Structure
Test data is stored by environment and feature:

```
src/test-data/
├── dev/
│   ├── inventory.json
│   ├── login.json
│   └── ...
├── pp/
│   ├── inventory.json
│   └── ...
└── prod/
    ├── inventory.json
    └── ...
```

### Format
```json
{
  "TCId-FeatureName-###": {
    "username": "standard_user",
    "password": "secret_sauce",
    "email": "user@example.com"
  }
}
```

### Usage in Steps
- **Reference test data:** `testdata.username`, `testdata.password`, `testdata.email`
- **The `td()` helper** automatically resolves these from JSON

```typescript
// In a step:
When('user performs UI login with {string} and {string}', 
  async ({ loginPage, td }, username: string, password: string) => {
    // td("testdata.username") → resolves to JSON value
    await loginPage.attemptLogin(td(username), td(password));
  }
);
```

### Environment Selection
Set via `ENV` environment variable:
```bash
ENV=dev npm run pw:test    # Uses src/test-data/dev/
ENV=pp npm run pw:test     # Uses src/test-data/pp/
ENV=prod npm run pw:test   # Uses src/test-data/prod/
```

Default: `dev`

---

## Running Tests

### Prerequisites
```bash
npm install
npm run bddgen  # Generate test files from feature files
```

### Running All Tests
```bash
npm run pw:test
# or
npm test
```

### Running Specific Tests

**By Feature Tag:**
```bash
npm run pw:inventory    # All @inventory tests
npm run pw:smoke        # All @smoke tests
npm run pw:ui           # All @ui tests
npm run pw:regression   # All @regression tests
npm run pw:login        # All @login tests
npm run pw:api          # All @api tests
```

**By Test Case ID:**
```bash
npx playwright test --grep @TCId-Inv003
```

**By Scenario Name:**
```bash
npx playwright test --grep "Verify first product details"
```

### Running with Custom Reporter
```bash
# List reporter (detailed output)
npx playwright test --grep @TCId-Inv003 --reporter=list

# Default HTML reporter (better for CI/CD)
npx playwright test --grep @TCId-Inv003
```

### Viewing HTML Report
```bash
npm run pw:test
npx playwright show-report
# Opens: http://localhost:9323
```

### Setting Environment
```bash
ENV=pp npm run pw:test                           # Use pp environment
ENV=prod npx playwright test --grep @TCId-Inv003  # Use prod environment
```

---

## Report Generation

### Report Types Available

1. **HTML Report** (Default)
   - Located: `playwright-report/index.html`
   - View: `npx playwright show-report`
   - Shows: Test steps, attachments, timing

2. **JUnit XML** (CI/CD Integration)
   - Located: `reports/junit-results.xml`
   - Format: Standard JUnit XML for Jenkins/Azure DevOps

3. **Custom Flaky Test Report**
   - Located: `test-results/flaky-tests.json` and `.md`
   - Shows: Tests with retry history

### Report Contents

Access via HTML Report interface:
- ✅ **Passed/Failed/Flaky tests count**
- ⏱️ **Execution timing** (total, per test, per step)
- 📋 **Test steps** with execution order
- 🖼️ **Screenshots** (on failure)
- 🎬 **Trace** (on-first-retry)
- 📝 **Logs** and console output
- 🏷️ **Tags** (browser, feature, test ID)

### Example: Report for TCId-Inv003

```
Test: Verify first product details on inventory page
Status: ✅ PASSED
Duration: 4.0s
Tags: chromium, smoke, ui, regression, inventory, TCId-Inv003

Steps:
  ✅ Before Hooks (2.6s)
  ✅ Given user opens "saucedemoUrl" (2.4s)
  ✅ When user performs UI login with "testdata.username" and "testdata.password" (1.0s)
  ✅ Then "inventory_backpackTitleLink" text should be "Sauce Labs Backpack" (19ms)
  ✅ And "inventory_backpackTitleLink" should be a clickable link (48ms)
  ✅ And "inventory_backpackPrice" text should be "$29.99" (20ms)
  ✅ And "inventory_addToCartButton" should be visible (17ms)
  ✅ After Hooks (222ms)
```

---

## Complete Example: TCId-Inv003

### 1. Feature File Entry
**File:** `src/features/ui/inventory.feature`

```gherkin
@smoke @ui @regression @inventory
Feature: UI Inventory Functionality

  @TCId-Inv003
  Scenario: Verify first product details on inventory page
    Given user opens "saucedemoUrl"
    When user performs UI login with "testdata.username" and "testdata.password"
    Then "inventory_backpackTitleLink" text should be "Sauce Labs Backpack"
    And "inventory_backpackTitleLink" should be a clickable link
    And "inventory_backpackPrice" text should be "$29.99"
    And "inventory_addToCartButton" should be visible
```

### 2. Locators (in config_locators.ts)
```typescript
// Inventory page - Sauce Labs Backpack
inventory_backpackTitleLink: 'item-4-title-link',
inventory_backpackPrice: 'css:[data-test="inventory-list"] > [data-test="inventory-item"]:nth-child(1) [data-test="inventory-item-price"]',
inventory_addToCartButton: 'add-to-cart-sauce-labs-backpack',
```

### 3. Test Data (in inventory.json)
```json
{
  "TCId-Inv003": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

### 4. Steps Used (all existing, from commonSteps.ts)
```typescript
// No new steps needed! All reused:
- Given('user opens {string}', ...)
- When('user performs UI login with {string} and {string}', ...)
- Then('{string} text should be {string}', ...)  // 2x used
- Then('{string} should be a clickable link', ...)
- Then('{string} should be visible', ...)
```

### 5. Run the Test
```bash
# Generate test files from feature file
npm run bddgen

# Run only this test
npx playwright test --grep @TCId-Inv003

# View report
npx playwright show-report
```

### 6. Expected Output
```
Running 1 test using 1 worker
✓ UI Inventory Functionality › Verify first product details on inventory page (4.0s)
  1 passed (9.8s)
```

---

## Key Principles

### ✅ DO

1. **Reuse existing steps** - Check `commonSteps.ts` before creating new ones
2. **Use parameterized steps** - `{string}` placeholders for dynamic values
3. **Centralize locators** - All in `config_locators.ts`
4. **Follow naming conventions** - `inventory_*`, `login_*` prefixes for page areas
5. **Add test data** - Always create corresponding JSON entry with `@TCId-XXX` tag
6. **Name test IDs clearly** - `@TCId-Inv003` not just `@TC003`
7. **Run bddgen before tests** - Feature files → compiled specs
8. **Use tags for filtering** - `@smoke`, `@regression`, `@ui`, `@api`

### ❌ DON'T

1. **Don't hardcode selectors** in steps - Use config_locators.ts
2. **Don't create duplicate steps** - Reuse existing ones
3. **Don't mix concerns** - Steps should call page objects, not browser directly
4. **Don't skip test data** - Every test needs a TCId entry in JSON
5. **Don't use weak selectors** - Avoid `.click()` on generic elements
6. **Don't assume locators exist** - Always verify in config_locators.ts first
7. **Don't forget bddgen** - Run before every test execution
8. **Don't hardcode test data** - Use `testdata.key` pattern

---

## Troubleshooting

### "No tests found" Error
```bash
# Solution: Run bddgen first
npm run bddgen
npx playwright test --grep @TCId-Inv003
```

### "No data for TCId-Inv003 in inventory.json"
```
✓ Check: inventory.json has entry for TCId-Inv003
✓ Check: JSON syntax is valid (no trailing commas)
✓ Check: Environment matches (ENV=dev)
```

### "Unknown url key 'saucedemoUrl'"
```
✓ Check: src/utils/testData.ts has saucedemoUrl export
✓ Check: Spelling matches exactly
```

### "No locator matched for key 'inventory_backpackTitleLink'"
```
✓ Check: config_locators.ts has inventory_backpackTitleLink key
✓ Check: Element exists on page with correct data-test attribute
✓ Run bddgen: npm run bddgen
```

### Test Timeout
```bash
# Increase timeout in playwright.config.ts
timeout: 120 * 1000  # 120 seconds instead of 60

# Or skip flaky test
@skip
Scenario: Flaky test name
```

---

## Additional Resources

### Files to Know
- **Feature Files:** `src/features/ui/*.feature`
- **Step Definitions:** `src/step-definitions/shared/commonSteps.ts`
- **Locators:** `src/config/config_locators.ts`
- **Test Data:** `src/test-data/{env}/inventory.json`
- **Page Objects:** `src/pages/CommonPage.ts`, `BasePage.ts`
- **Configuration:** `playwright.config.ts`
- **Test Setup:** `src/fixtures/Fixtures.ts`

### Commands Reference
```bash
npm run bddgen              # Generate test files
npm run pw:test             # Run all tests
npm run pw:inventory        # Run @inventory tests
npm run pw:smoke            # Run @smoke tests
npm run clean:bdd           # Clean generated files
npx playwright show-report  # View HTML report
```

---

## Summary Checklist for New Test Case

- [ ] **Create scenario** in `.feature` file with `@TCId-XXX` tag
- [ ] **Add locators** to `config_locators.ts` (if not already present)
- [ ] **Add test data** to `src/test-data/dev/*.json`
- [ ] **Use only existing steps** from `commonSteps.ts`
- [ ] **Run `npm run bddgen`** to generate specs
- [ ] **Run `npx playwright test --grep @TCId-XXX`**
- [ ] **View report:** `npx playwright show-report`
- [ ] **Verify:** All steps pass ✅
- [ ] **Verify:** No duplicate locators added
- [ ] **Verify:** Test data matches tag name

