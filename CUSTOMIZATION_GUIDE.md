# 🚀 Framework Customization Guide

This is a **template automation framework**. Follow this guide to customize it for your application.

---

## Quick Start: 5 Steps to Get Running

### **Step 1: Configure Your ApplicationURL**

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

### **Step 2: Define UI Element Locators**

**File**: `src/config/config_locators.ts`

Replace the example locators with YOUR application's element selectors:

```typescript
// Example: Before
login_usernameInput: '[data-testid="username-field"]',
login_passwordInput: '[data-testid="password-field"]',

// Update to your app's selectors:
login_usernameInput: '#email',  // Your actual selector
login_passwordInput: '#password', // Your actual selector
dashboard_heading: 'h1:contains("Dashboard")', // Your heading
```

**Locator Strategies** (recommended order):
1. **data-testid**: Best (dev-friendly, stable)
2. **ARIA roles**: Good (accessibility-first)
3. **Text matching**: Fair (user-centric)
4. **CSS selectors**: Last resort (brittle)
5. **XPath**: Avoid (very brittle)

---

### **Step 3: Create Page Objects for Your Pages**

**File**: `src/pages/YourPageName.ts`

**Pattern**: Copy `ExamplePage.ts` as a template for each page

```typescript
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Replace method names with your app's user actions
  
  async clickUserMenu(): Promise<void> {
    await this.clickByKey('dashboard_userMenu');
  }

  async logout(): Promise<void> {
    await this.clickByKey('dashboard_logoutButton');
  }

  async isWelcomeMessageVisible(): Promise<boolean> {
    try {
      await this.assertVisibleByKey('dashboard_heading');
      return true;
    } catch {
      return false;
    }
  }
}
```

**Key Rules**:
- ✅ Each file represents one page
- ✅ Each method represents ONE user action
- ✅ Use `this.getByKey()`, `this.clickByKey()`, `this.inputInElementByKey()`
- ✅ Return `this` for method chaining (optional)
- ❌ Don't add business logic or assertions (leave to steps)

---

### **Step 4: Update Fixtures to Inject Your Page Objects**

**File**: `src/fixtures/Fixtures.ts`

Add your page objects to the fixture type and provider:

```typescript
// 1. Import your page
import { DashboardPage } from '../pages/DashboardPage';

// 2. Add to AppFixtures type
export type AppFixtures = {
  examplePage: ExamplePage;
  dashboardPage: DashboardPage;  // ADD THIS
  // ...
};

// 3. Add fixture provider
export const test = base.extend<AppFixtures>({
  // ...
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});
```

---

### **Step 5: Write Scenarios & Implement Steps**

**Feature File**: `src/features/ui/dashboard.feature`

```gherkin
@ui @dashboard
Feature: Dashboard Navigation

  @TCId-Dashboard001
  Scenario: User can see welcome message
    Given user navigates to dashboard
    Then welcome message should be visible
```

**Step Definitions**: `src/step-definitions/ui/dashboardSteps.ts`

```typescript
import { Given, Then } from '../../fixtures/Fixtures';

Given('user navigates to dashboard', async ({ page }) => {
  await page.goto('/dashboard');
});

Then('welcome message should be visible', async ({ dashboardPage }) => {
  const isVisible = await dashboardPage.isWelcomeMessageVisible();
  if (!isVisible) {
    throw new Error('Welcome message not visible');
  }
});
```

---

## Directory-by-Directory Customization

### `src/config/config_locators.ts`

**What**: All UI element selectors for your application

**Customize**:
- Replace ALL example locators with your app's selectors
- Add new page sections (products, checkout, etc.)
- Keep naming consistent: `pageName_elementDescription`

**Example**:
```typescript
// Product listing page
products_filterButton: '[data-testid="filter-btn"]',
products_searchInput: '#search-box',
products_itemPrice: '[data-test*="price"]',
```

---

### `src/pages/`

**What**: Page Object Model - one file per page in your app

**Customize**:
- Copy `ExamplePage.ts` for each new page
- Create: `LoginPage.ts`, `DashboardPage.ts`, `ProductsPage.ts`, etc.
- Each method = one user action (login, search, addToCart)
- Use locators from `config_locators.ts`

**Example**:
```typescript
export class ProductsPage extends BasePage {
  async searchFor(query: string): Promise<void> {
    await this.inputInElementByKey('products_searchInput', query);
  }

  async getProductPrice(): Promise<string> {
    const locator = this.getByKey('products_itemPrice');
    return await locator.textContent() || '';
  }
}
```

---

### `src/features/`

**What**: Gherkin scenarios - business-readable test definitions

**Customize**:
- Rename `example.feature` to match your feature areas
- Create features for each major user workflow
- Keep scenario names simple and user-focused
- Use `@TCId-XXX` tags to link to test data

**Example**:
```gherkin
@ui @products @smoke
Feature: Product Search

  @TCId-ProductSearch001
  Scenario: User can search for products
    When user searches for "laptop"
    Then search results should display
    And first result should contain "laptop"
```

---

### `src/step-definitions/`

**What**: Implementation of Gherkin steps

**Customize**:
- Copy `exampleSteps.ts` pattern for each feature
- Map Gherkin steps to page object methods
- Use `td()` helper to access test data
- Keep steps simple - call page objects

**Example**:
```typescript
import { When, Then } from '../../fixtures/Fixtures';

When('user searches for {string}', async ({ productsPage }, query: string) => {
  await productsPage.searchFor(query);
});

Then('search results should display', async ({ productsPage }) => {
  const resultsVisible = await productsPage.areResultsVisible();
  if (!resultsVisible) throw new Error('No search results found');
});
```

---

### `src/test-data/dev/`

**What**: Test input data organized by test scenario

**Customize**:
- Update `example.json` with your test data
- Create new JSON files for each feature (login.json, products.json, etc.)
- Use `@TCId-XXX` tag to load specific test case data
- Structure: `{ "TCId-XXX": { "field1": "value1", ... } }`

**Example**:
```json
{
  "TCId-SearchProducts001": {
    "searchQuery": "laptop",
    "expectedMinResults": 5
  },

  "TCId-SearchProducts002": {
    "searchQuery": "nonexistent",
    "expectedResult": "No results found"
  }
}
```

---

## Common Workflows

### Adding a New Test Scenario

1. **Create feature file** or add scenario to existing feature:
   ```bash
   src/features/ui/new-feature.feature
   ```

2. **Write Gherkin scenario** with @TCId- tag

3. **Add test data** to `src/test-data/dev/new-feature.json`

4. **Create step definitions** in `src/step-definitions/ui/newFeatureSteps.ts`:
   ```typescript
   import { When, Then } from '../../fixtures/Fixtures';

   When('step text here', async ({ page }) => {
     // implementation
   });
   ```

5. **Run tests**:
   ```bash
   npm run pw:test
   ```

---

### Adding a New Page Object

1. **Create file**: `src/pages/NewPage.ts`

2. **Copy template** from `ExamplePage.ts`

3. **Add methods** for user actions:
   ```typescript
   export class NewPage extends BasePage {
     async action1() { ... }
     async action2() { ... }
   }
   ```

4. **Add locators** to `src/config/config_locators.ts`:
   ```typescript
   newpage_element1: '[selector]',
   newpage_element2: '[selector]',
   ```

5. **Inject in fixtures** (`src/fixtures/Fixtures.ts`):
   ```typescript
   export type AppFixtures = {
     newPage: NewPage;
   };
   ```

---

### Running Tests

```bash
# Run all tests (headless)
npm run pw:test

# Run with browser visible
npm run pw:headed

# Debug mode (interactive)
npm run pw:debug

# Run specific file
npm run pw:test dashboard.feature

# Run specific test
npm run pw:test -g "scenario name"

# View HTML report
npm run pw:report
```

---

## Environment Configuration

### Local Development

Edit `.env` file:
```bash
APP_URL=http://localhost:3000
ENV=dev
PW_WORKERS=4
HOOK_LOG_STEPS=true
```

### Continuous Integration

Set environment variables in your CI/CD pipeline (GitHub Actions, Jenkins, etc.):
```bash
APP_URL=https://staging.myapp.com
ENV=staging
PW_RETRIES=2
```

### Production ReadOnly Tests

```bash
APP_URL=https://production.myapp.com
ENV=prod
```

---

## Troubleshooting

### **Tests Not Running**

❌ **Error**: `TCId tag missing`
- **Solution**: Add `@TCId-XXX` tag to your scenario

❌ **Error**: `Locator key "xxx" not found`
- **Solution**: Add the locator to `src/config/config_locators.ts`

❌ **Error**: `Test data not found`
- **Solution**: Add data to `src/test-data/dev/feature-name.json`

### **Locator Not Finding Element**

❌ **Try these strategies** (in order):
1. Use data-testid if available
2. Use role selector (accessibility)
3. Use text matching
4. Use CSS but make it specific
5. Avoid XPath if possible

❌ **Debug**:
```bash
npm run pw:debug
# Use Playwright Inspector to find/test selectors interactively
```

---

## Best Practices

✅ **DO**:
- Keep features focused on user behavior
- Name tests after expected outcomes
- Use descriptive step names
- Keep page objects simple and reusable
- Version control your test code
- Review test results regularly

❌ **DON'T**:
- Hardcode credentials in features (use test data)
- Put business logic in page objects
- Use hardcoded waits (framework auto-waits)
- Write complex locators (use data-testid)
- Create too many steps (composite steps are OK)

---

## Getting Help

- **Playwright docs**: https://playwright.dev
- **Cucumber/BDD**: https://cucumber.io
- **Check examples**: `src/pages/ExamplePage.ts`, `src/features/ui/example.feature`
- **Review base helpers**: `src/pages/BasePage.ts` for available methods

---

## Maintenance

### Regular Tasks

- **Update test data** when application changes
- **Update locators** if UI changes
- **Review flaky tests** report (test-results/flaky-tests.md)
- **Clean up obsolete** test cases

### Performance Optimization

- Parallel execution already enabled (PW_WORKERS=4)
- Visual testing baselines generated automatically
- Test data cached in memory for performance

---

## Next Steps

1. ✅ Set APP_URL in .env
2. ✅ Update config_locators.ts with your app's selectors
3. ✅ Create your first page object
4. ✅ Write your first feature +steps
5. ✅ Run: `npm run pw:test`
6. ✅ View report: `npm run pw:report`

**Happy testing! 🎉**
