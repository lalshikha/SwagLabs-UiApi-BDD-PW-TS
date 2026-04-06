# Playwright BDD Framework - Architecture & Best Practices

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Design Principles](#core-design-principles)
3. [Layered Architecture](#layered-architecture)
4. [Key Components](#key-components)
5. [Best Practices](#best-practices)
6. [Design Patterns](#design-patterns)
7. [Dependency Injection & Fixtures](#dependency-injection--fixtures)
8. [Page Object Model](#page-object-model)
9. [BDD Feature Workflow](#bdd-feature-workflow)
10. [Test Data Strategy](#test-data-strategy)
11. [Error Handling & Logging](#error-handling--logging)
12. [Performance & Optimization](#performance--optimization)
13. [Scalability Considerations](#scalability-considerations)

---

## Architecture Overview

This framework implements a **modern, layered BDD (Behavior-Driven Development) architecture** using:

- **Playwright** for browser automation
- **playwright-bdd** for Gherkin feature file parsing and management
- **TypeScript** for type-safe, maintainable code
- **Page Object Model** for UI abstraction
- **Dependency Injection** via fixtures for loose coupling
- **Centralized Locator Management** for DRY locator definitions
- **Multi-environment Support** for dev, pp (pre-prod), and prod deployments
- **Advanced Reporting** with HTML, JUnit, and custom flaky test tracking

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    BDD Feature Files                        │
│          (*.feature in src/features/)                       │
│                  └─────────────────┘                        │
│                          │                                   │
├─────────────────────────┼────────────────────────────────────┤
│    playwright-bdd Code Generation Layer                      │
│           (features-gen/*.feature.spec.ts)                  │
│                          │                                   │
├─────────────────────────┼────────────────────────────────────┤
│              Test Execution Layer                            │
│  ┌─────────────────┬────────────────┬─────────────────┐    │
│  │   Hooks         │  Step Defs     │  Test Data      │    │
│  │ (Before/After)  │ (*.ts)         │ (*.json)        │    │
│  └─────────────────┴────────────────┴─────────────────┘    │
│                          │                                   │
├─────────────────────────┼────────────────────────────────────┤
│              Page Object Model Layer                         │
│  ┌─────────────────┬────────────────┬─────────────────┐    │
│  │  BasePage       │  LoginPage     │  InventoryPage  │    │
│  │  (Base class)   │  (Domain-spec) │  (Domain-spec)  │    │
│  └─────────────────┴────────────────┴─────────────────┘    │
│                          │                                   │
├─────────────────────────┼────────────────────────────────────┤
│              Business Logic & Services Layer                 │
│  ┌─────────────────┬────────────────┬─────────────────┐    │
│  │  ApiService     │  CommonPage    │  Utilities      │    │
│  │  (API calls)    │  (Shared UI)   │  (Helpers)      │    │
│  └─────────────────┴────────────────┴─────────────────┘    │
│                          │                                   │
├─────────────────────────┼────────────────────────────────────┤
│         Configuration & Environment Layer                    │
│  ┌─────────────────┬────────────────┬─────────────────┐    │
│  │  config_        │   env/*        │  playwright     │    │
│  │  locators.ts    │   (.env files) │  .config.ts     │    │
│  └─────────────────┴────────────────┴─────────────────┘    │
│                          │                                   │
├─────────────────────────┼────────────────────────────────────┤
│    Playwright Test Runner & Reporters                        │
│  ┌─────────────────┬────────────────┬─────────────────┐    │
│  │   HTML Report   │   JUnit XML    │  Flaky Reporter │    │
│  └─────────────────┴────────────────┴─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Design Principles

### 1. **Separation of Concerns (SoC)**

Each layer has a single responsibility:

- **Features**: Business requirements, user workflows
- **Step Definitions**: Test orchestration, BDD->Code mapping
- **Page Objects**: UI interaction and locator management
- **Services**: Business logic (API, calculations, data processing)
- **Utilities**: Cross-cutting concerns (logging, data transformation)
- **Config**: Environment and locator definitions

### 2. **DRY (Don't Repeat Yourself)**

- **Centralized Locators**: All UI selectors in `config_locators.ts`
- **Base Classes**: Common functionality in `BasePage`, avoiding duplication
- **Shared Steps**: Common test steps in `src/step-definitions/shared/`
- **Utilities**: Reusable helper functions in `src/utils/`

### 3. **Dependency Injection**

- **Fixtures**: Injected via playwright-bdd `test` fixture
- **Loose Coupling**: Page objects don't instantiate each other
- **Testability**: Easy to mock and test components independently

### 4. **Type Safety**

- **TypeScript**: Compile-time type checking prevents runtime errors
- **Locator Keys**: Type-safe locator references via `LocatorKey` enum/type
- **Fixture Types**: `AppFixtures` type ensures all injected fixtures are available

### 5. **Environment Agnostic**

- **Multi-Environment Support**: dev, pp, prod via `.env` files
- **Configurable URLs**: Base URL from environment variables
- **Environment-Specific Test Data**: Separate JSON files per environment

### 6. **Scalability**

- **Parallel Execution**: Tests run in parallel workers
- **Modular Features**: Feature files group related tests
- **Reusable Components**: Page objects and services shared across features

---

## Layered Architecture

### Layer 1: Feature Layer
**Location**: `src/features/**/*.feature`

```gherkin
Feature: User Login Scenarios

  @TCId-001 @smoke @ui @regression
  Scenario: Successful login with valid credentials
    Given User navigates to the login page
    When User enters testdata.username
    And User enters testdata.password
    Then User should see the inventory page
```

**Purpose**: Define business requirements in Gherkin syntax

**Best Practices**:
- Use descriptive scenario names
- Add tags for categorization (`@smoke`, `@regression`, `@ui`, `@api`)
- Use `@TCId-xxx` tags for test case identification
- Reference test data via `testdata.key` pattern
- One scenario per test case concept

---

### Layer 2: BDD Code Generation
**Output**: `.features-gen/**/*.feature.spec.ts` (auto-generated)

This layer is **automatically generated** by playwright-bdd:
- Parses feature files
- Maps steps to step definitions
- Creates test cases
- Handles Before/After hooks

**Do Not Modify**: Generated files are overwritten on each run.

---

### Layer 3: Fixtures & Dependency Injection
**Location**: `src/fixtures/Fixtures.ts`

```typescript
export type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  commonPage: CommonPage;
  apiContext: APIRequestContext;
  apiService: ApiService;
  resolveTestData: (value: string, testInfo: TestInfo) => unknown;
  td: (value: string) => string;
};
```

**Purpose**: Provides page objects, services, and utilities to tests

**Key Features**:
- Creates page objects lazily (on first use)
- Manages API context for HTTP requests
- Resolves test data from JSON files
- Injected into steps via `{ pageName, serviceName }`

**Best Practices**:
- Add fixtures for reusable components
- Use lazy initialization to avoid unnecessary setup
- Keep fixture logic minimal; move business logic to page objects

---

### Layer 4: Hooks
**Location**: `src/hooks/hooks.ts`

```typescript
BeforeAll(async ({ $workerInfo }) => {
  // Runs once per worker before any tests
  ensureDir(HOOKS_ARTIFACTS_DIR);
});

Before(async ({ page, $testInfo, $tags }) => {
  // Runs before each scenario
  logger.info(`=== Before Scenario === ${$testInfo.title}`);
  page.on('console', (msg) => { /* ... */ });
});

After(async ({ page, $testInfo }) => {
  // Runs after each scenario
  if ($testInfo.status !== 'passed') {
    // Capture artifacts on failure
  }
});
```

**Lifecycle Hooks**:
- `BeforeAll`: Once per worker
- `Before`: Before each scenario
- `BeforeStep`: Before each step
- `AfterStep`: After each step
- `After`: After each scenario
- `AfterAll`: Once per worker (cleanup)

**Responsibilities**:
- Browser console/error listening
- Screenshot/video capture on failure
- Test data cleanup
- Report artifact generation
- Log statements for debugging

**Best Practices**:
- Keep hooks focused and lightweight
- Use `$testInfo.status` to capture artifacts only on failure
- Log important state for debugging
- Clean up resources in `AfterAll`

---

### Layer 5: Step Definitions
**Location**: `src/step-definitions/**/*.ts`

```typescript
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/Fixtures';

const { Given, When, Then } = createBdd(test);

Given('User navigates to the login page', async ({ page, commonPage }) => {
  await page.goto('/login');
  await commonPage.verifyPageLoaded();
});

When('User enters {string}', async ({ loginPage, td }, username) => {
  await loginPage.enterUsername(td(username));
});

Then('User should see the inventory page', async ({ inventoryPage }) => {
  await inventoryPage.verifyVisibility();
});
```

**Purpose**: Connect Gherkin steps to code execution

**Best Practices**:
- Use descriptive step text matching feature files exactly
- Inject only necessary fixtures
- Delegate UI interactions to page objects
- Keep steps concise (1-3 lines ideally)
- Use parameterization: `{string}`, `{int}`, `{float}`
- Organize steps by domain: `shared/`, `ui/`, `functional/`, `api/`

**Anti-Patterns**:
- ❌ Complex business logic in steps
- ❌ Multiple assertions per step
- ❌ Direct Playwright Page API usage (use page objects)
- ❌ Mixed concerns (UI + API in one step)

---

### Layer 6: Page Object Model
**Location**: `src/pages/**/*.ts`

#### BasePage (Foundation)

```typescript
export default abstract class BasePage {
  protected readonly page: Page;

  // Locator helpers
  protected byId(id: string): Locator { }
  protected byDataTest(value: string): Locator { }
  protected byTitle(title: string | RegExp): Locator { }
  protected byRole(role, name?): Locator { }
  
  // Centralized locator resolution
  protected resolveRawLocator(raw: string): Locator { }
  protected getLocatorCandidates(key: LocatorKey): string[] { }
  
  // Visual & screenshot utilities
  async takeScreenshot(name: string, options?): Promise<Buffer> { }
  async compareWithBaseline(locator, options?): Promise<boolean> { }
  
  // Assertion helpers
  async verifyVisibility(locator): Promise<void> { }
}
```

#### Domain-Specific Pages

```typescript
import BasePage from './BasePage';
import { L } from '../config/config_locators';

export default class LoginPage extends BasePage {
  async enterUsername(username: string): Promise<void> {
    await this.page.fill(L.USERNAME_INPUT, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(L.PASSWORD_INPUT, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(L.LOGIN_BUTTON);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.page.isVisible(L.LOGIN_FORM);
  }
}
```

**Purpose**: Encapsulate UI interactions and locator management

**Best Practices**:
- One page object per distinct UI page/component
- Methods represent user actions: `login()`, `addToCart()`, `checkout()`
- Return meaningful types: `Promise<void>` for actions, `Promise<boolean>` for checks
- Use locators from config: `L.ELEMENT_KEY`
- Never expose `page` property publicly
- Inherit from `BasePage` for common functionality
- Use `protected` and `private` for encapsulation

**Locator Resolution Strategy**:

```typescript
// config_locators.ts defines candidates (fallbacks)
export const L = {
  USERNAME_INPUT: 'username-input',     // Primary: data-test
  PASSWORD_INPUT: 'password-input',
  LOGIN_BUTTON: 'css:#login-btn',      // Override: CSS
};

// BasePage resolves with fallback
protected getLocatorCandidates(key: LocatorKey): string[] {
  const def: LocatorDef = L[key];
  return Array.isArray(def) ? def : [def];
}
```

---

### Layer 7: Services
**Location**: `src/services/**/*.ts`

```typescript
export default class ApiService {
  constructor(private apiContext: APIRequestContext, baseUrl: string) {}

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.apiContext.post(`${this.baseUrl}/login`, {
      data: { username, password },
    });
    return response.json();
  }

  async getInventory(): Promise<Product[]> {
    const response = await this.apiContext.get(`${this.baseUrl}/inventory`);
    return response.json();
  }
}
```

**Purpose**: Handle business logic, API calls, and complex operations

**Best Practices**:
- Separate API operations from page interactions
- Use dependency injection (inject APIRequestContext, URLs)
- Return typed responses for type safety
- Add error handling and retry logic
- Use consistent naming: `get*()`, `create*()`, `update*()`, `delete*()`

---

### Layer 8: Configuration & Locators
**Location**: `src/config/config_locators.ts`

```typescript
import { Locator } from '@playwright/test';

export type LocatorKey = 
  | 'USERNAME_INPUT'
  | 'PASSWORD_INPUT'
  | 'LOGIN_BUTTON'
  | 'INVENTORY_CONTAINER'
  | 'PRODUCT_CARD';

export interface LocatorDef {
  [key: string]: string | string[]; // Raw locator or candidates
}

export const L: LocatorDef = {
  // Prefer data-test attributes (most stable)
  USERNAME_INPUT: 'user-name',
  PASSWORD_INPUT: 'password',
  LOGIN_BUTTON: 'login-button',
  
  // Use CSS with fallbacks
  INVENTORY_CONTAINER: ['css:.inventory_container', 'product-list'],
  
  // Use accessibility attributes
  PRODUCT_CARD: 'role:article|Product Card',
  
  // Use IDs when stable
  MENU_BUTTON: 'id:menu-toggle',
};
```

**Best Practices**:
- Centralize all locators in one file
- Use typed `LocatorKey` for compile-time checking
- Prefer stable locators: data-test > accessibility > CSS > ID
- Document locators with comments
- Add fallback candidates for flexibility
- Avoid XPath (brittle, slow)

---

### Layer 9: Test Data Management
**Location**: `src/test-data/{env}/{feature}.json`

```json
{
  "testdata": {
    "username": "standard_user",
    "password": "secret_sauce",
    "invalid_username": "locked_out_user",
    "invalid_password": "wrong_password"
  }
}
```

**Resolution Flow**:

```
Feature: login.feature
├─ Environment: dev
├─ Scenario: @TCId-001
└─ Test Data: dev/login.json → testdata.username
```

**Best Practices**:
- Organize by environment: `dev/`, `pp/`, `prod/`
- Use descriptive keys: `testdata.valid_username` not `testdata.user1`
- Separate test data by feature for clarity
- Use `td()` fixture to resolve test data in steps
- Avoid hardcoding test values in code

---

### Layer 10: Utilities
**Location**: `src/utils/**/*.ts`

#### Logger
```typescript
import logger from '../utils/logger';

logger.info('Test started');
logger.warn('Element not found, using fallback');
logger.error('Login failed', error);
```

#### Visual Comparison
```typescript
await loginPage.compareWithBaseline(locator, { 
  maxDiffPixels: 100,
  threshold: 0.2 
});
```

#### Data Utilities
```typescript
import { generateTestData } from '../utils/dataUtils';

const randomUser = generateTestData.randomUsername();
const timestamp = generateTestData.nowISO();
```

**Best Practices**:
- Create utilities for cross-cutting concerns
- Keep utilities stateless
- Document utility functions
- Use descriptive names
- Export from `index.ts` for clean imports

---

### Layer 11: Environment Configuration
**Location**: `env/{dev|pp|prod}.env`

```env
# URL Configuration
APP_URL=http://localhost:7777
API_URL=http://localhost:3000/api

# Playwright Configuration
PW_RETRIES=1
PW_TIMEOUT=30000

# Custom Hooks Configuration
HOOK_LOG_ALL_CONSOLE=false
HOOK_LOG_STEPS=true

# Feature Flags
VISUAL_REGRESSION_ENABLED=true
```

**Best Practices**:
- Never hardcode URLs or credentials in code
- Use `.env` files for environment-specific configuration
- Load via `dotenv` in `playwright.config.ts`
- Provide sensible defaults
- Document all environment variables

---

### Layer 12: Test Execution & Reporting
**Location**: `playwright.config.ts`

```typescript
export default defineConfig({
  testDir: defineBddConfig({
    features: ['src/features/**/*.feature'],
    steps: ['src/step-definitions/**/*.ts', 'src/hooks/**/*.ts'],
  }),
  
  workers: process.env.CI ? 2 : undefined, // Parallel execution
  retries: RETRIES,
  timeout: 30 * 1000,
  
  reporter: [
    ['html'],                              // HTML Report
    ['junit'],                             // JUnit XML
    ['./src/reporters/flaky-reporter.ts'], // Custom Flaky Test Report
  ],
  
  use: {
    baseURL: process.env.APP_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
```

**Reporters**:
- **HTML**: Visual report with screenshots and videos
- **JUnit**: CI/CD integration format
- **Custom Flaky Reporter**: Identifies flaky tests across runs

---

## Key Components

### 1. BasePage Inheritance Chain

```
BaseView (abstract)
    │
    ├─ LoginPage
    ├─ InventoryPage
    ├─ CommonPage (shared across pages)
    └─ CustomPage
```

**Pattern**:
- All pages extend `BasePage`
- `CommonPage` for shared UI elements (nav, header, footer)
- Domain-specific pages for unique sections

### 2. Fixture Dependencies

```
test (playwright-bdd)
    │
    ├─ page (Playwright Page object)
    ├─ loginPage (LoginPage fixture)
    ├─ inventoryPage (InventoryPage fixture)
    ├─ commonPage (CommonPage fixture)
    ├─ apiContext (APIRequestContext)
    ├─ apiService (ApiService service)
    └─ td() (test data resolver)
```

### 3. Feature Organization

```
src/features/
├─ ui/                    # UI automation tests
│  ├─ login.feature
│  └─ inventory.feature
├─ api/                   # API automation tests
│  └─ inventory-api.feature
├─ functional/            # Functional tests (cross-domain)
│  └─ end-to-end.feature
└─ visual/                # Visual regression tests
   └─ homepage.feature
```

### 4. Step Definition Organization

```
src/step-definitions/
├─ shared/               # Common steps used across tests
│  ├─ commonSteps.ts
│  └─ uiSteps.ts
├─ ui/                   # UI-specific steps
│  ├─ loginSteps.ts
│  └─ inventorySteps.ts
├─ api/                  # API-specific steps
│  └─ apiSteps.ts
└─ functional/           # Functional/integration steps
   └─ integrationSteps.ts
```

---

## Best Practices

### Naming Conventions

**Features**:
```gherkin
# Feature files
login.feature           # Primary domain
checkout.feature        # Specific functionality
```

**Scenarios**:
```gherkin
# Descriptive, not implementation-specific
✅ User successfully logs in with valid credentials
❌ User enters username and password and clicks submit
```

**Step Definitions**:
```typescript
// Use natural language matching feature text
✅ Given('User navigates to the login page', ...)
✅ When('User enters {string} and {string}', ...)
✅ Then('User should see the inventory page', ...)
```

**Page Objects**:
```typescript
// Represent user actions, not HTML elements
✅ async login(username, password): Promise<void>
✅ async addToCart(productName: string): Promise<void>
❌ async clickLoginButton(): Promise<void>
```

**Methods**:
```typescript
// Verbs represent actions; adjectives for checks
✅ login(), logout(), addToCart()          // Actions
✅ isLoginFormVisible(), isProductAdded()  // Checks
❌ clickBtnLogin(), fillUsernameInput()    // Over-specific
```

### Tagging Strategy

```gherkin
@smoke                # Critical path tests (fast, important)
@regression          # Full regression suite
@ui                  # UI automation (vs @api)
@api                 # API automation
@visual              # Visual regression tests
@flaky               # Known flaky tests
@skip                # Temporarily disabled
@integration         # End-to-end tests
@performance         # Performance-related tests
@TCId-XXX            # Unique test case ID (required)
```

**Usage**:
```bash
npm run pw:smoke              # @ Run smoke tests
npm run pw:regression         # Run full suite
npx playwright test --grep "@ui"     # Run UI tests
npx playwright test --grep "@TCId-001" # Run specific test
```

### Assertion Best Practices

```typescript
// ✅ Good: Use Playwright's built-in assertions
await expect(inventoryPage.productList).toBeVisible();
await expect(inventoryPage.cartBadge).toHaveText('1');

// ❌ Avoid: manual if/throw logic
if (!await page.isVisible(...)) {
  throw new Error('Not visible');
}

// ✅ Good: Use helper methods for complex assertions
async verifyProductsLoaded(): Promise<void> {
  await expect(this.productGrid).toBeVisible();
  await expect(this.productItems).toHaveCount(n => n > 0);
}

// ❌ Avoid: Multiple assertions in one step
Then('User should see product and price and add button', ...)
```

### Error Handling

```typescript
// ✅ Good: Meaningful error messages
async login(username: string, password: string): Promise<void> {
  try {
    await this.page.fill(L.USERNAME, username);
    await this.page.fill(L.PASSWORD, password);
    await this.page.click(L.LOGIN_BTN);
    await this.page.waitForNavigation();
  } catch (error) {
    this.logger.error(`Login failed for user ${username}`, error);
    throw new Error(`Failed to login: ${error.message}`);
  }
}

// ❌ Avoid: Silent failures or generic errors
try {
  await page.click(selector);
} catch {
  // Ignored
}
```

### Logging Best Practices

```typescript
// ✅ Good: Contextual information
logger.info(`LoginPage.login() - Starting login for user: ${username}`);
logger.info(`LoginPage.login() - Attempting to locate: ${L.LOGIN_BUTTON}`);
logger.warn(`LoginPage.login() - Fallback locator used for password input`);
logger.error(`LoginPage.login() - Failed to submit form`, error);

// ❌ Avoid: Noisy logging
logger.info('click button'); // Too generic
logger.debug('step 1 of 5'); // Implementation detail
```

---

## Design Patterns

### 1. Page Object Pattern

```typescript
// Encapsulate page structure and interactions
class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.waitForNavigation();
  }

  private async fillUsername(value: string): Promise<void> {
    await this.page.fill(L.USERNAME, value);
  }

  private async fillPassword(value: string): Promise<void> {
    await this.page.fill(L.PASSWORD, value);
  }

  private async clickLoginButton(): Promise<void> {
    await this.page.click(L.LOGIN_BUTTON);
  }

  private async waitForNavigation(): Promise<void> {
    await this.page.waitForNavigation();
  }
}
```

### 2. Factory Pattern

```typescript
// Fixtures create page objects lazily
export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});
```

### 3. Dependency Injection

```typescript
// Services receive dependencies, don't create them
class ApiService {
  constructor(
    private apiContext: APIRequestContext,
    private baseUrl: string
  ) {}
}

// Used via fixtures
apiService: async ({ apiContext }, use) => {
  const baseUrl = process.env.API_URL || 'http://localhost:3000';
  await use(new ApiService(apiContext, baseUrl));
},
```

### 4. Strategy Pattern (Locator Resolution)

```typescript
// Multiple locator strategies with fallback
protected resolveRawLocator(raw: string): Locator {
  if (raw.startsWith('css:')) return this.page.locator(raw.substring(4));
  if (raw.startsWith('id:')) return this.byId(raw.substring(3));
  if (raw.startsWith('role:')) return this.byRole(...);
  if (raw.startsWith('text:')) return this.byText(...);
  return this.byDataTest(raw); // Default
}
```

### 5. Template Method Pattern

```typescript
// BasePage defines structure; subclasses implement specifics
abstract class BasePage {
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
    await this.verifyPageLoaded();
  }

  protected async verifyPageLoaded(): Promise<void> {
    // Subclasses override
    throw new Error('Must implement verifyPageLoaded()');
  }
}

class LoginPage extends BasePage {
  protected async verifyPageLoaded(): Promise<void> {
    await expect(this.loginForm).toBeVisible();
  }
}
```

---

## Dependency Injection & Fixtures

### Fixture Lifecycle

```typescript
export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    // Setup (before each test)
    const loginPage = new LoginPage(page);
    
    // Inject into test
    await use(loginPage);
    
    // Teardown (after each test) - optional
    // cleanup code here
  },
});
```

### Fixture Composition

```typescript
// Fixtures can depend on other fixtures
apiService: async ({ apiContext }, use) => {
  // Depends on: apiContext (injected by Playwright)
  const service = new ApiService(apiContext, baseUrl);
  await use(service);
},

// Usage in steps
When('User calls API endpoint', async ({ apiService }) => {
  const result = await apiService.getInventory();
  expect(result).toBeDefined();
});
```

### Test Data Resolution

```typescript
// td() fixture resolves test data from JSON
const testdata: string = td('testdata.username');  // Resolved from JSON
const literal: string = td('user@example.com');    // Returned as-is

// Automatic resolution in feature files
When('User enters {string}', async ({ loginPage, td }, username) => {
  // If called with: "testdata.username"
  // td() resolves to actual value from JSON
  await loginPage.enterUsername(td(username));
});
```

---

## Page Object Model

### Locator Organization

```typescript
// Prefer data-test attributes
data-test="username-input"  // ✅ Stable, semantic

// Use accessibility attributes
getByRole('button', { name: 'Login' })  // ✅ User-centric

// Use CSS selectors when necessary
css:.form-container > .input  // ✅ More specific

// Avoid XPath
//div[@class='form']/input  // ❌ Brittle, slow
```

### Method Organization

```typescript
export default class LoginPage extends BasePage {
  // Action methods (async, void return or navigation)
  async login(username: string, password: string): Promise<void> { }
  async clickForgotPassword(): Promise<void> { }
  
  // Verification methods (async, boolean return)
  async isLoginFormDisplayed(): Promise<boolean> { }
  async isErrorMessageVisible(): Promise<boolean> { }
  
  // Helper methods (private, delegated work)
  private async fillUsername(value: string): Promise<void> { }
  private async fillPassword(value: string): Promise<void> { }
}
```

### Encapsulation

```typescript
export default class LoginPage extends BasePage {
  // Public: High-level user actions
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitForm();
  }

  // Private: Implementation details
  private async fillUsername(value: string): Promise<void> { }
  private async fillPassword(value: string): Promise<void> { }
  private async submitForm(): Promise<void> { }

  // Protected: Shared by subclasses
  protected async verifyPageLoaded(): Promise<void> { }
}
```

---

## BDD Feature Workflow

### Feature File Structure

```gherkin
Feature: User Login Functionality
  Background:
    Given User opens the application

  @smoke @ui @TCId-001
  Scenario: Successful login with valid credentials
    Given User navigates to the login page
    When User enters testdata.username
    And User enters testdata.password
    And User clicks the login button
    Then User should see the inventory page
    And User should see welcome message

  @regression @ui @TCId-002
  Scenario: Login fails with invalid password
    Given User navigates to the login page
    When User enters testdata.username
    And User enters testdata.invalid_password
    And User clicks the login button
    Then User should see error message
    And User should remain on login page
```

### Parameterization

```gherkin
# Scenario Outline with Examples
Scenario Outline: Login with various credentials
  When User enters <username>
  And User enters <password>
  Then Result is <status>

  Examples:
    | username  | password     | status  |
    | user1     | pass123      | success |
    | user2     | wrongpass    | failure |
    | user3     | another_pass | success |
```

**Generates 3 test cases**:
- `Login with various credentials [user1]`
- `Login with various credentials [user2]`
- `Login with various credentials [user3]`

---

## Test Data Strategy

### Environment-Based Test Data

```
src/test-data/
├─ dev/
│  ├─ login.json
│  └─ inventory.json
├─ pp/
│  ├─ login.json
│  └─ inventory.json
└─ prod/
   ├─ login.json
   └─ inventory.json
```

### Test Data Structure

```json
{
  "testdata": {
    "valid_username": "standard_user",
    "valid_password": "secret_sauce",
    "invalid_username": "invalid_user",
    "invalid_password": "wrong_password",
    "products": [
      { "name": "Sauce Labs Backpack", "price": 29.99 },
      { "name": "Sauce Labs Bolt T-shirt", "price": 15.99 }
    ]
  }
}
```

### Resolution in Steps

```typescript
// Automatic resolution
When('User enters {string}', async ({ loginPage, td }, username) => {
  const resolved = td(username); // "testdata.username" → actual value
  await loginPage.enterUsername(resolved);
});

// Manual resolution for complex data
Then('User should see products', async ({ inventoryPage, resolveTestData }, testInfo) => {
  const products = resolveTestData('testdata.products', testInfo);
  // products = [{ name: "...", price: ... }, ...]
});
```

### Best Practices

- Keep test data simple and focused
- Use environment-specific values
- Avoid duplicating test data to locators
- Document test data keys in comments
- Use semantic property names: `valid_user` not `user1`
- Rotate test data regularly to catch edge cases

---

## Error Handling & Logging

### Logger Implementation

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => 
      `${timestamp} [${level.toUpperCase()}] ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/test.log' }),
  ],
});

export default logger;
```

### Logging Levels

```typescript
logger.info('Test started');        // General information
logger.warn('Fallback used');       // Non-critical issues
logger.error('Failed to login', e); // Failures and exceptions
logger.debug('Debugging info');     // Development only
```

### Hook Error Handling

```typescript
After(async ({ page, $testInfo, $tags }) => {
  if ($testInfo.status === 'failed') {
    // Capture artifacts on failure
    await page.screenshot({ path: `screenshots/failure-${Date.now()}.png` });
    
    // Log failure details
    logger.error(`Test Failed: ${$testInfo.title}`);
    logger.error(`Error: ${$testInfo.error?.message}`);
  }
});
```

---

## Performance & Optimization

### Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 2 : undefined, // Parallel workers
  fullyParallel: true,                      // Parallelize within project
  
  webServer: {
    command: 'npm start',
    reuseExistingServer: !process.env.CI, // Reuse server in dev
  },
});
```

### Performance Best Practices

1. **Minimize Wait Times**
   ```typescript
   // ✅ Use specific waitForNavigation or waitForLoadState
   await page.click(L.LOGIN_BUTTON);
   await page.waitForNavigation();
   
   // ❌ Don't use arbitrary delays
   await page.click(L.LOGIN_BUTTON);
   await page.waitForTimeout(3000);
   ```

2. **Lazy Load Fixtures**
   ```typescript
   // ✅ Create fixtures only when needed
   loginPage: async ({ page }, use) => {
     await use(new LoginPage(page)); // Created only when injected
   },
   ```

3. **Reuse Pages**
   ```typescript
   // ✅ Reuse page across steps when possible
   Given('User logs in', async ({ page, loginPage }) => {
     await loginPage.login('user', 'pass');
     // Same page reused in next steps
   });
   ```

4. **Optimize Selectors**
   ```typescript
   // ✅ Use direct CSS selectors
   data-test="product-card"
   
   // ❌ Avoid slow XPath queries
   //div[@class='product']//button[@type='submit']
   ```

5. **Screenshot on Failure Only**
   ```typescript
   // playwright.config.ts
   use: {
     screenshot: 'only-on-failure', // Not on every test
   },
   ```

---

## Scalability Considerations

### Adding New Features

1. **Create Feature File**
   ```bash
   src/features/ui/new-feature.feature
   ```

2. **Create Steps**
   ```bash
   src/step-definitions/ui/newFeatureSteps.ts
   ```

3. **Create Page Objects**
   ```bash
   src/pages/NewFeaturePage.ts
   ```

4. **Add to Fixtures**
   ```typescript
   // src/fixtures/Fixtures.ts
   newFeaturePage: async ({ page }, use) => {
     await use(new NewFeaturePage(page));
   },
   ```

5. **Create Test Data**
   ```bash
   src/test-data/dev/new-feature.json
   src/test-data/pp/new-feature.json
   src/test-data/prod/new-feature.json
   ```

### Handling Growth

| Scale | Concern | Solution |
|-------|---------|----------|
| 10-50 tests | Organization | Feature categorization |
| 50-200 tests | Execution time | Parallel workers, selective runs |
| 200+ tests | Maintenance | Reusable step library, shared components |
| Cross-domain | Complexity | Domain-specific folders, clear boundaries |

### Scaling Guidelines

- **Feature categorization**: Organize features by functional domain
- **Step reusability**: Create shared steps for common actions
- **Fixture composition**: Build complex fixtures from simpler ones
- **Data management**: Environment-based test data organization
- **Parallel execution**: Configure appropriate worker count
- **Reporting**: Use custom reporters for insights
- **CI/CD integration**: Run smoke tests frequently, regression nightly

---

## Summary: Architecture Strengths

| Aspect | Strength |
|--------|----------|
| **Maintainability** | Clear separation of concerns, DRY principle |
| **Readability** | BDD features + type-safe code |
| **Reusability** | Shared page objects, services, utilities |
| **Scalability** | Modular design supports growth |
| **Type Safety** | TypeScript catches errors at compile time |
| **Flexibility** | Centralized config, environment-based setup |
| **Debugging** | Comprehensive logging, screenshots, videos |
| **Performance** | Parallel execution, lazy initialization |
| **Reporting** | Multiple report formats, custom analytics |

---

## Quick Reference Commands

```bash
# List all tests
npm run pw:list

# Run all tests
npm run pw:test

# Run by tag
npm run pw:smoke              # Smoke tests
npm run pw:regression         # All tests
npm run pw:ui                 # UI tests
npm run pw:api                # API tests

# Run specific test
npx playwright test --grep "@TCId-001"

# Debug mode
npx playwright test --debug

# View HTML report
npx playwright show-report
```

---

**Last Updated**: 2026-04-02
**Framework Version**: Playwright BDD v8.4.2 + playwright-bdd v8.4.2
