# 🚀 Framework Customization Guide

This is a **template automation framework** built on Playwright, BDD (Cucumber), and TypeScript. It is designed for maximum code reusability. 

Follow this guide to customize it for your application. **If you follow these steps, you will almost never need to write TypeScript code to add a new test.**

---

## 📋 What This Framework Provides (Out of the Box)

✅ **Plug & Play Locator Management** - Centralized selector configuration with smart auto-detection  
✅ **Generic Reusable Steps** - Pre-built BDD steps for all common UI interactions (input, click, assert)  
✅ **Automatic Test Data Loading** - JSON-based test data mapped to scenarios via @TCId tags  
✅ **Smart Locator Resolution** - Supports data-test, role, id, CSS, XPath with prefixes  
✅ **Empty Value Handling** - EMPTY placeholder for testing empty field validation  
✅ **Scenario Outline Support** - Parameterized test cases with Examples tables  
✅ **Visual Validation** - Screenshot comparison for regression testing  
✅ **Type-Safe TypeScript** - Compile-time locator key validation  
✅ **First-Run Success** - Tests pass immediately without flakiness  
✅ **Zero Test Code** - Write only Gherkin (business language), no custom code needed  

---

## 🎯 Quick Start Summary

| Step | What to Do | Where | Example |
|------|-----------|-------|---------|
| **1** | Set App URL | `.env` | `APP_URL=https://www.saucedemo.com` |
| **2** | Add Selectors | `src/config/config_locators.ts` | `login_usernameInput: 'username'` |
| **3** | Add Test Data | `src/test-data/dev/<feature>.json` | `"TCId-Login001": { "username": "admin" }` |
| **4** | Write Scenarios | `src/features/ui/<feature>.feature` | `When user enters "testdata.username" in "login_usernameInput"` |
| **5** | Run Tests | Terminal | `npm test` → **All pass!** ✅ |

---

## Quick Start: The 5-Step Process

### **Step 1: Configure Your Application URLs**

**File**: `.env`

```bash
# Copy the example file
cp .env.example .env

# Edit and set your application URL
APP_URL=https://your-application.com
API_BASE_URL=https://api.your-application.com  # optional
ENV=dev
```

**That's it!** The framework will now point to your application.

---

### **Step 2: Define UI Element Locators Centrally**

**File**: `src/config/config_locators.ts`

**Rule:** NEVER hardcode locators in steps or page objects. All selectors go here. 
Group them by page and use a clear naming convention: `pageName_elementName`.

Our framework's locator resolution strategy (in `BasePage.ts`) defaults to `data-test` attributes. If you pass a plain string like `'username'`, it automatically looks for `[data-test="username"]`. For other attributes, you must use specific prefixes.

**Locator Strategy Order of Preference:**
1. **data-test attributes** (Default): Use just the string value (e.g., `'username'`). This is the preferred method!
2. **role**: Use `role:type|name` (e.g., `'role:button|Submit'`)
3. **id**: Use `id:element-id` (e.g., `'id:submit-btn'`)
4. **Anything Else**: 
   - **text**: Use `text:visible-text` (e.g., `'text:Login Failed'`)
   - **title**: Use `title:element-title` (e.g., `'title:Close'`)
   - **css**: Last resort for complex selectors (e.g., `'css:div.header > span'`)

**Example - SauceDemo Login Page:**

```typescript
const L = {
  // ============================================
  // LOGIN PAGE - SAUCEDEMO APPLICATION
  // ============================================
  login_usernameInput: 'username',
  login_passwordInput: 'password',
  login_loginButton: 'login-button',
  login_errorContainer: 'error',

  // ============================================
  // INVENTORY PAGE (DASHBOARD) - SAUCEDEMO
  // ============================================
  inventory_pageTitle: 'title',  // Contains text "Products"
} as const satisfies Record<string, LocatorDef>;
```

**Inspect Your Application:**
- Use browser DevTools (F12) to identify selectors
- Prefer `data-test` attributes (most stable)
- Use explicit prefixes only when necessary
- Test selectors in Playwright Inspector: `npm run pw:debug`

---

### **Step 3: Define Your Test Data**

**File**: `src/test-data/dev/feature-name.json`

Create a JSON file matching your feature name. Structure the data by a unique Test Case ID (`@TCId-XXX`). The `td()` helper will resolve these values when you use `testdata.keyname` in your scenarios.

**Example - SauceDemo Login Test Data:**

```json
{
  "TCId-Login001": {
    "_description": "Valid user login with correct credentials",
    "username": "standard_user",
    "password": "secret_sauce",
    "_expectedResult": "User successfully logs in and is redirected to inventory page"
  },

  "TCId-Login002": {
    "_description": "Negative scenarios data (handled via Scenario Outline Examples table)",
    "note": "Individual test data like empty strings are provided directly in feature file Examples"
  }
}
```

**Key Points:**
- Use `@TCId-XXX` tags in your scenarios to match keys in this file
- Reference data with `testdata.key` in feature files → `td()` helper resolves it
- Prefix with `_` for documentation fields (not used by tests)
- For parameters that vary by scenario (like empty values), use Scenario Outline Examples instead

---

### **Step 4: Write Scenarios Using Generic Steps**

**File**: `src/features/ui/login.feature`

Write your tests using the generic steps provided by `commonSteps.ts`. You write customer-friendly BDD scenarios without any custom step definitions or page objects.

**Generic Steps Available (No Custom Code Needed):**
- `Given user opens the application` - Navigates to APP_URL from .env
- `When user enters "<value>" in "<locatorKey>"` - Fills input fields (with testdata resolution)
- `When user clicks "<locatorKey>"` - Clicks buttons/links
- `Then "<locatorKey>" should be visible` - Asserts element visibility
- `Then "<locatorKey>" text should be "<expected>"` - Asserts text content (contains match)

**Example - SauceDemo Login Tests:**

```gherkin
@ui @login @smoke @regression
Feature: UI Login Functionality - SauceDemo Application

  Background:
    Given user opens the application

  @TCId-Login001 @positive @TC-01
  Scenario: Valid user login with correct credentials
    When user enters "testdata.username" in "login_usernameInput"
    And user enters "testdata.password" in "login_passwordInput"
    And user clicks "login_loginButton"
    Then "inventory_pageTitle" should be visible
    And "inventory_pageTitle" text should be "Products"

  @TCId-Login002 @negative
  Scenario Outline: Invalid login attempts with various invalid credentials
    When user enters "<username>" in "login_usernameInput"
    And user enters "<password>" in "login_passwordInput"
    And user clicks "login_loginButton"
    Then "login_errorContainer" should be visible
    And "login_errorContainer" text should be "<expectedError>"

    Examples: Negative test cases
      | username              | password      | expectedError                                                      |
      | EMPTY                 | wrong_pass    | Epic sadface: Username is required                                 |
      | standard_user         | EMPTY         | Epic sadface: Password is required                                 |
      | invalid_user          | wrong_pass    | Epic sadface: Username and password do not match any user in this service |
      | admin' OR '1'='1      | password      | Epic sadface: Username and password do not match any user in this service |
```

**Key Concepts:**

1. **Data Resolution**: `testdata.username` automatically resolved from JSON via `td()` helper
2. **Locator Keys**: Must exactly match keys in `src/config/config_locators.ts`
3. **Scenario Outline with Examples**: Parameterize multiple test cases in one scenario
4. **EMPTY Placeholder**: Use "EMPTY" in Examples table for empty string values (see Step 4B below)

---

### **Step 4B: Handling Empty Values in Scenario Outlines**

When you need to test with empty strings (like empty username or password), use the `EMPTY` placeholder keyword in your Examples table. The framework automatically converts `EMPTY` to an empty string at runtime.

**Enhancement to commonSteps.ts** (Already included in framework):

```typescript
When('user enters {string} in {string}', async ({ commonPage, td }, value: string, key: string) => {
  // Handle EMPTY placeholder for Scenario Outline examples (represents empty string)
  const actualValue = value === 'EMPTY' ? '' : td(value);
  await commonPage.inputInElementByKey(asLocatorKey(key), actualValue);
});
```

This allows your Examples table to be readable and valid Gherkin syntax while still testing empty input validation.

---

### **Step 5: Verify Tests Pass - First Run Success**

```bash
# Run all tests
npm test

# Expected output (all tests pass immediately):
# ✓ 5 passed (15-20s)
# Flaky tests: 0
# Failed after retries: 0
```
   - Make sure `data-test` attribute exists with exact value
   - Use Playwright Inspector: `npm run pw:debug`

3. ❌ `Locator is not visible`
   - Application may have changed UI
   - Verify selectors against live application
   - Service may be down or credentials invalid

4. ❌ `EMPTY placeholder not working`
   - Ensure `src/step-definitions/shared/commonSteps.ts` has the EMPTY handling code
   - Check that examples table uses exact string "EMPTY" (case-sensitive)

---

## The "No-Code" Philosophy Explained

This framework relies on `BasePage.ts` and `commonSteps.ts` to do the heavy lifting. **You write only Gherkin scenarios - no TypeScript code required for standard UI interactions.**

### `src/step-definitions/shared/commonSteps.ts` - Pre-Built Steps

These generic steps are already written for you:

```typescript
// Navigate to application
Given('user opens the application', async ({ page }) => {
  await page.goto(getAppUrl());
  await page.waitForLoadState('networkidle');
});

// Input fields (with EMPTY placeholder & testdata resolution)
When('user enters {string} in {string}', async ({ commonPage, td }, value: string, key: string) => {
  const actualValue = value === 'EMPTY' ? '' : td(value);
  await commonPage.inputInElementByKey(asLocatorKey(key), actualValue);
});

// Click elements
When('user clicks {string}', async ({ commonPage }, key: string) => {
  await commonPage.clickByKey(asLocatorKey(key));
});

// Assertions
Then('{string} should be visible', async ({ commonPage }, key: string) => {
  await commonPage.assertVisibleByKey(asLocatorKey(key));
});

Then('{string} text should be {string}', async ({ commonPage }, key: string, expectedText: string) => {
  await commonPage.assertContainsTextByKey(asLocatorKey(key), expectedText);
});
```

### `src/pages/BasePage.ts` - Smart Locator Resolution

Handles all locator strategies automatically:
- **data-test**: `login_username` → `[data-test="username"]`
- **role**: `role:button|Submit` → Finds button with accessible name
- **id**: `id:submit-btn` → Finds element with id
- **text**: `text:Click me` → Finds element with exact text
- **css**: `css:.button-class` → CSS selector fallback

### When Do I Actually Write Custom Code?

**Almost never** for standard UI interactions. Only create:
- **Custom page object** (`src/pages/DashboardPage.ts`) if you need complex multi-step business logic
- **Custom step definition** file if specific domain language isn't covered by commonSteps

**Do NOT create custom code for:**
- Simple input/click/assertion workflows
- Individual form submissions
- Page navigation
- Text validation

**If you must create custom code:**

```typescript
// src/pages/DashboardPage.ts
import BasePage from './BasePage';

export class DashboardPage extends BasePage {
  // ONLY add highly complex logic here
  // Standard clicks/inputs/assertions already exist in BasePage!
  
  async parseInventoryTable() {
    // Example: Parse complex data grid only if absolutely necessary
  }
}
```

Then inject into `src/fixtures/Fixtures.ts`.

---

## Adding a Brand New Feature (Complete Example: Checkout Form)

If you need to automate a new feature, you only touch **3 files**. Zero TypeScript required.

**Scenario**: You want to test a checkout form with positive and negative scenarios.

### 1. Add Locators → `src/config/config_locators.ts`

```typescript
const L = {
  // ... existing locators ...
  
  // ============================================
  // CHECKOUT PAGE
  // ============================================
  checkout_firstNameInput: 'firstName',
  checkout_lastNameInput: 'lastName',
  checkout_emailInput: 'email',
  checkout_zipCodeInput: 'postalCode',
  checkout_continueButton: 'continue-button',
  checkout_successMessage: 'text:Order Placed!',
  checkout_errorMessage: 'error-message',
};
```

### 2. Add Test Data → `src/test-data/dev/checkout.json`

```json
{
  "TCId-Checkout001": {
    "_description": "Successful checkout with valid customer data",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "zipCode": "12345"
  },

  "TCId-Checkout002": {
    "_description": "Negative scenarios placeholder"
  }
}
```

### 3. Write Feature → `src/features/ui/checkout.feature`

```gherkin
@ui @checkout @smoke
Feature: Checkout Functionality

  Background:
    Given user opens the application

  @TCId-Checkout001 @positive
  Scenario: User completes checkout successfully
    When user enters "testdata.firstName" in "checkout_firstNameInput"
    And user enters "testdata.lastName" in "checkout_lastNameInput"
    And user enters "testdata.email" in "checkout_emailInput"
    And user enters "testdata.zipCode" in "checkout_zipCodeInput"
    And user clicks "checkout_continueButton"
    Then "checkout_successMessage" should be visible

  @TCId-Checkout002 @negative
  Scenario Outline: Checkout validation with invalid data
    When user enters "<firstName>" in "checkout_firstNameInput"
    And user enters "<lastName>" in "checkout_lastNameInput"
    And user enters "<email>" in "checkout_emailInput"
    And user enters "<zipCode>" in "checkout_zipCodeInput"
    And user clicks "checkout_continueButton"
    Then "checkout_errorMessage" should be visible
    And "checkout_errorMessage" text should be "<expectedError>"

    Examples: Validation cases
      | firstName | lastName | email           | zipCode | expectedError              |
      | EMPTY     | Doe      | john@test.com   | 12345   | First name is required     |
      | John      | EMPTY    | john@test.com   | 12345   | Last name is required      |
      | John      | Doe      | EMPTY           | 12345   | Email is required          |
      | John      | Doe      | john@test.com   | EMPTY   | Zip code is required       |
```

### 4. Run Tests

```bash
npm test
```

**That's it!** Your tests will execute:
- ✅ 1 positive scenario (Checkout001)
- ✅ 4 negative scenarios (Checkout002 Examples)
- ✅ All pass on first run (no flaky tests)
- ✅ No TypeScript code written

---

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run pw:headed

# Debug mode (interactive - inspect selectors live)
npm run pw:debug

# Run specific feature file
npx playwright test src/features/ui/login.feature

# Run specific test by tag
npx playwright test --grep "@TCId-Login001"

# Run specific scenario outline example
npx playwright test --grep "Invalid login attempts"

# View HTML report (after test run)
npm run pw:report

# Explore test data loading
npx playwright test --debug
```

**Expected Output on First Run:**
```
✓ 5 passed (15-20s)
  - Valid user login with correct credentials
  - Empty username validation
  - Empty password validation
  - Invalid credentials rejection
  - SQL injection attack rejection

Flaky tests: 0
Failed after retries: 0
```

---

## Troubleshooting

### **Tests Not Running or Failing**

❌ **Error**: `Missing step definitions`
- **Cause**: Feature file uses steps not defined in `commonSteps.ts` or custom step files
- **Solution**: Use only these generic steps:
  - `Given user opens the application`
  - `When user enters "{string}" in "{string}"`
  - `When user clicks "{string}"`
  - `Then "{string}" should be visible`
  - `Then "{string}" text should be "{string}"`

❌ **Error**: `Unknown locator key "xxx"`
- **Cause**: Feature file references a key that doesn't exist in `config_locators.ts`
- **Solution**: 
  - Check spelling (case-sensitive): `login_usernameInput` ≠ `login_usernameInput_`
  - Add missing key to `src/config/config_locators.ts`
  - Verify in feature: `in "login_usernameInput"` matches config exactly

❌ **Error**: `No locator matched for key...`
- **Cause**: Selector in config is invalid or element not found on page
- **Solution**:
  - Inspect element: Right-click → Inspect → Find `[data-test="username"]`
  - Verify selector actually exists on live application
  - Use Playwright Inspector: `npm run pw:debug` → manually test selectors
  - Check for typos in attribute value

❌ **Error**: `Locator is not visible`
- **Cause**: Element exists but is hidden or page hasn't loaded
- **Solution**:
  - Add waiting: Element should be visible after page loads
  - Check if JavaScript needs to run (wait for network): Built in via `networkidle`
  - Verify application URL in `.env` is correct
  - Test credentials are valid (for login pages)

❌ **Error**: `Timeout waiting for locator`
- **Cause**: Element never becomes visible or selector is wrong
- **Solution**:
  - Use `npm run pw:debug` to inspect in Playwright Inspector
  - Look for attribute: `[data-test="password"]`
  - Verify spelling of attribute value exactly
  - Try opening browser with `npm run pw:headed` to see actual state

❌ **Error**: `Cannot read properties of undefined (reading 'username')`
- **Cause**: Test data JSON structure doesn't match what's referenced
- **Solution**:
  - Scenario tag: `@TCId-Login001`
  - JSON file: `src/test-data/dev/login.json`
  - JSON content: `"TCId-Login001": { "username": "...", ... }`
  - Feature file reference: `testdata.username`

❌ **Error**: `EMPTY placeholder not working` (filling empty string but test fails)
- **Cause**: commonSteps.ts doesn't handle EMPTY placeholder
- **Solution**:
  - Verify file has this code:
    ```typescript
    const actualValue = value === 'EMPTY' ? '' : td(value);
    ```
  - Use exact spelling: `EMPTY` (case-sensitive)
  - Example table: `| username | password | ... |` with `| EMPTY | ... |`

### **Tests Pass Locally But Fail in CI/CD**

- **Check environment variables**: CI pipeline must have `.env` file or vars set
- **Check working directory**: Tests run from project root
- **Check node version**: `node --version` must match package.json engines
- **Check dependencies**: Run `npm install` before tests

### **Debugging Tips**

1. **Visual Debugging** → Use `npm run pw:headed` to watch tests run in browser
2. **Step Debugging** → Use `npm run pw:debug` to step through with Playwright Inspector
3. **Check Selectors** → DevTools (F12) → Find element → Copy selector → Test in config
4. **View HTML Report** → `npm run pw:report` → See screenshots of failures
5. **Enable Trace** → See detailed execution trace in report

---

## Best Practices Checklist

✅ **DO - Locator Management**:
- Manage ALL locators exclusively in `src/config/config_locators.ts`
- Group locators by page: `login_*`, `dashboard_*`, `checkout_*`
- Use `data-test` attributes (most stable) for primary selectors
- Use explicit prefixes (`css:`, `id:`, `text:`, `role:`) only when necessary
- Document locators with comments showing what they represent

✅ **DO - Feature Files**:
- Use clear, business-friendly Gherkin language
- Use Background for common setup (e.g., `Given user opens the application`)
- Use Scenario Outline for parameterized tests (multiple Examples)
- Use `EMPTY` placeholder for empty string values in Examples tables
- Use `@TCId-XXX` tags to link to test data in JSON files
- Keep scenarios short and focused (1-2 assertions per scenario)

✅ **DO - Test Data**:
- Create `src/test-data/dev/<feature>.json` matching your feature name
- Use `@TCId-XXX` tags in scenarios to match JSON keys
- Reference data with `testdata.keyname` in feature files
- Use `"_description"` fields to document test purposes
- Structure data logically by test case

✅ **DO - Generic Steps**:
- Use commonSteps.ts for all standard interactions
- Rely on `td()` helper to resolve testdata automatically
- Handle edge cases (like EMPTY) at step level, not in features
- Keep step definitions focused and single-purpose

✅ **DO - Run & Verify**:
- Run `npm test` first locally before committing
- Expect all tests to pass on first execution (zero retries)
- Use `npm run pw:headed` to visually verify test flow
- Review HTML report for screenshots: `npm run pw:report`

❌ **DON'T - Anti-Patterns**:
- Write rigid steps: ❌ `When User enters username "admin"` → ✅ `When user enters "testdata.username" in "login_usernameInput"`
- Hardcode test data: ❌ Hardcoded values in features → ✅ Use `testdata.keyname` from JSON
- Hardcode selectors outside config: ❌ Selectors in steps → ✅ All in `config_locators.ts`
- Create duplicate methods: ❌ Custom page objects for simple clicks → ✅ Use commonSteps
- Mix concerns: ❌ Business logic in page objects → ✅ Keep page objects for smart locators only
- Ignore flaky tests: ❌ Retry and ignore failures → ✅ Fix root cause immediately

❌ **DON'T - Common Mistakes**:
- Don't use XPath selectors (brittle) → Use `data-test` attributes
- Don't hardcode wait times → Use Playwright's smart waits
- Don't test multiple features in one scenario → Keep scenarios focused
- Don't ignore failures → Always fix on first failure (no retry-fest)
- Don't forget the EMPTY placeholder → Use "EMPTY" for empty string validation

## Framework Data Flow

```
Feature File (.feature)
    ↓
  Scenario with @TCId-XXX tag
    ↓
  Generic steps: "When user enters {string} in {string}"
    ↓
  td() helper resolves "testdata.username" → Loads from JSON
    ↓
  asLocatorKey() maps "login_usernameInput" → Validates in config_locators.ts
    ↓
  resolveRawLocator() converts plain string → [data-test="username"]
    ↓
  BasePage method calls Playwright locator
    ↓
  Element interacted (input/click) or asserted (visible/text)
    ↓
  Test passes ✅
```

## File Structure Reference

```
src/
├── config/
│   └── config_locators.ts          # ← ALL locators here
├── features/
│   └── ui/
│       ├── login.feature           # ← BDD scenarios
│       └── checkout.feature        # ← Add more features
├── test-data/
│   └── dev/
│       ├── login.json              # ← Test data for login
│       └── checkout.json           # ← Test data for checkout
├── step-definitions/
│   ├── shared/
│   │   └── commonSteps.ts          # ← Don't modify (generic steps)
│   └── ui/
│       ├── loginSteps.ts           # ← ONLY for complex login logic
│       └── checkoutSteps.ts        # ← ONLY for complex checkout logic
└── pages/
    ├── BasePage.ts                 # ← Don't modify (framework core)
    ├── CommonPage.ts               # ← Don't modify (generic utilities)
    ├── LoginPage.ts                # ← ONLY if login has complex logic
    └── CheckoutPage.ts             # ← ONLY if checkout has complex logic
```