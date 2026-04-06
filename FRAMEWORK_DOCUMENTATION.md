# Playwright BDD Framework - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Framework Replication Rules](#framework-replication-rules)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [Core Concepts](#core-concepts)
8. [Working with Locators](#working-with-locators)
9. [Creating Feature Files](#creating-feature-files)
10. [Step Definitions](#step-definitions)
11. [Page Objects](#page-objects)
12. [Test Data Management](#test-data-management)
13. [Fixtures & Dependency Injection](#fixtures--dependency-injection)
14. [Hooks](#hooks)
15. [Utilities](#utilities)
16. [Running Tests](#running-tests)
17. [Environment Configuration](#environment-configuration)
18. [Best Practices](#best-practices)
19. [Pre-Output Validation Checklist](#pre-output-validation-checklist)

---

## Overview

This is a **Playwright + playwright-bdd + TypeScript** automation testing framework intended for reusable UI and API automation with centralized locators, page objects, fixtures, hooks, environment-based test data, and shared utilities.

This documentation has two purposes:

1. Explain how the framework works.
2. Serve as the source template when replicating the framework for a new target website.

Important: this document contains both:
- **Generic reusable framework layers** that should usually be copied.
- **Example application-specific layers** that must be replaced for a new target project.

---

## Framework Replication Rules

### Goal

When creating a new framework from this document, preserve the reusable framework architecture and replace only the business logic that belongs to the target application.

### Golden Rule

**Copy the framework core. Replace the application layer.**

### What counts as framework core

These files, patterns, or responsibilities are considered generic and should normally be copied or adapted with minimal change:

- `src/fixtures/Fixtures.ts`
- `src/hooks/hooks.ts`
- `src/pages/BasePage.ts`
- `src/pages/CommonPage.ts`
- `src/utils/logger.ts`
- `src/utils/asLocatorKey.ts`
- test-data resolver pattern
- environment loading pattern
- centralized locator resolution pattern
- shared generic steps
- Playwright config structure
- TypeScript config structure
- generic reporters/utilities only if actually used

### What counts as application-specific

These files, values, or responsibilities must be replaced for each new website or product:

- target URLs in env files
- target URLs in utility config such as `testData.ts`
- `src/config/config_locators.ts`
- target page objects such as `LoginPage.ts`, `RegisterPage.ts`, `CheckoutPage.ts`
- feature files under `src/features/**`
- website-specific step definitions
- website-specific assertions
- target test data JSON content
- any example pages, locators, or test flows unrelated to the requested project

### Never copy blindly

Do **not** blindly carry over example modules such as:
- inventory pages
- product pages
- cart flows
- checkout flows
- SauceDemo URLs or selectors
- sample feature files unrelated to the new target site

Only include those if the target application truly requires them.

### Replication decision matrix

| Category | Action | Notes |
|---------|--------|------|
| Base framework layers | Copy | Keep imports, structure, and dependencies internally consistent |
| Shared utilities | Copy if used | Keep only utilities actually referenced by generated code |
| Visual/API/flaky modules | Optional | Include only when the new framework scope explicitly requires them |
| Locators | Replace | Must be re-analyzed for the target DOM |
| Page objects | Replace | Must reflect the target application only |
| Feature files | Replace | Must reflect requested business flows only |
| Test data | Replace | Must match target scenarios and TCIds |
| Example domain modules | Remove | Do not keep sample business logic from another site |

### Replication rules for generators and LLMs

Any generator or AI system using this document must follow these rules:

1. Reuse the **generic framework layers** from this document.
2. Replace all target-specific business logic with the new target-site logic.
3. Do not leave mixed-domain artifacts in the output.
4. Do not preserve example classes, URLs, selectors, or assertions from a different website.
5. Do not omit required support files when page objects or steps depend on them.
6. Do not generate partial scaffolds; generate complete, internally consistent files.
7. Do not hardcode selectors inside step definitions when centralized locator config is part of the architecture.

---

## Technology Stack

### Core Testing Framework

| Package | Purpose |
|---------|---------|
| `@playwright/test` | Playwright test runner |
| `playwright-bdd` | BDD integration for Playwright |
| `typescript` | TypeScript compiler |
| `ts-node` | TypeScript execution support |

### Core Utilities

| Package | Purpose |
|---------|---------|
| `dotenv` | Environment variable loading |
| `winston` | Structured logging |
| `rimraf` | Cross-platform cleanup |
| `@faker-js/faker` | Fake data generation when needed |

### Optional Utilities

Include only if required by the project scope.

| Package | Purpose |
|---------|---------|
| `pixelmatch` | Visual comparison |
| `pngjs` | PNG processing |
| `exceljs` | Excel file handling |
| `uuid` | Unique IDs |
| `cucumber-html-reporter` | HTML BDD reporting |
| `allure-commandline` | Allure reporting |

### Playwright MCP

If the framework generation process requires LLM-assisted live DOM analysis through MCP tooling, install Playwright MCP before the main dependency flow.

Recommended bootstrap command:

```bash
npm install --save-dev @playwright/mcp
```

If MCP is not used in your workflow runtime, this package can remain optional. If MCP-based page analysis is part of the framework generation flow, treat it as a required prerequisite.

---

## Architecture

### Data Flow

```text
Feature File (.feature)
  -> Step Definitions
  -> Page Objects
  -> BasePage/CommonPage reusable methods
  -> Centralized locators (config_locators.ts)
  -> Playwright actions/assertions

Test data
  -> resolved by tcid + feature + environment
  -> injected into steps through fixtures

Hooks
  -> scenario lifecycle
  -> logging
  -> screenshot on failure
```

### Separation of concerns

- **Feature files** describe business intent.
- **Step definitions** map intent to actions.
- **Page objects** hold page-specific behavior.
- **BasePage** holds generic browser and locator behavior.
- **Locators** live in one centralized config file.
- **Fixtures** provide dependency injection.
- **Hooks** provide lifecycle handling.
- **Utilities** support logging, data resolution, validation, and shared helpers.

---

## Project Structure

```text
.
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── FRAMEWORK_DOCUMENTATION.md
├── REPLICATE_FMW_PROMPT.md
├── .gitignore
├── env/
│   ├── dev.env
│   ├── pp.env
│   └── prod.env
├── src/
│   ├── config/
│   │   └── config_locators.ts
│   ├── features/
│   │   ├── functional/
│   │   ├── ui/
│   │   └── visual/
│   ├── fixtures/
│   │   └── Fixtures.ts
│   ├── hooks/
│   │   └── hooks.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── CommonPage.ts
│   │   └── <TargetPage>.ts
│   ├── reporters/
│   │   └── flaky-reporter.ts
│   ├── services/
│   │   └── ApiService.ts
│   ├── step-definitions/
│   │   ├── functional/
│   │   ├── shared/
│   │   └── ui/
│   ├── test-data/
│   │   ├── dev/
│   │   ├── pp/
│   │   └── prod/
│   └── utils/
│       ├── logger.ts
│       ├── testData.ts
│       ├── asLocatorKey.ts
│       ├── dataUtils.ts
│       ├── fallbackTracker.ts
│       └── visualCompare.ts
├── logs/
├── reports/
├── test-results/
└── screenshots/
```

### File classification

#### Always copy or preserve
- `Fixtures.ts`
- `hooks.ts`
- `BasePage.ts`
- `CommonPage.ts`
- `logger.ts`
- `asLocatorKey.ts`
- test data resolution utilities
- environment loading pattern
- generic Playwright config structure
- generic tsconfig structure

#### Always replace
- `config_locators.ts`
- target page objects
- feature files
- website-specific step definitions
- env URLs
- website-specific JSON test data
- target-specific assertions

#### Copy only if required
- `ApiService.ts`
- visual comparison utilities
- flaky reporter
- inventory or checkout examples
- any additional page objects not used by the target scope

---

## Installation & Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- Playwright browser support

### Fresh project bootstrap

Use this exact order for a brand-new machine or empty project folder.

```bash
# 0. Initialize project
npm init -y

# 1. Install Playwright MCP first if MCP-based DOM analysis/generation is part of the workflow
npm install --save-dev @playwright/mcp

# 2. Install Playwright test runner first
npm install --save-dev @playwright/test

# 3. Install framework dependencies
npm install --save-dev playwright-bdd typescript ts-node dotenv winston rimraf @faker-js/faker

# 4. Install optional packages only if the framework really uses them
npm install --save-dev pixelmatch pngjs exceljs uuid cucumber-html-reporter allure-commandline

# 5. Install Playwright browsers
npx playwright install
```

### Minimal required setup

For a minimal UI-only framework, the true minimum is:

```bash
npm init -y
npm install --save-dev @playwright/mcp
npm install --save-dev @playwright/test playwright-bdd typescript ts-node dotenv winston rimraf
npx playwright install
```

### Create directories

```bash
mkdir -p src/config
mkdir -p src/features/functional src/features/ui src/features/visual
mkdir -p src/fixtures src/hooks src/pages src/reporters src/services
mkdir -p src/step-definitions/functional src/step-definitions/shared src/step-definitions/ui
mkdir -p src/test-data/dev src/test-data/pp src/test-data/prod
mkdir -p src/utils env logs reports test-results screenshots/visual/baseline screenshots/visual/actual screenshots/visual/diff
```

### package.json guidance

The generated `package.json` must include:
- all dependencies actually referenced by the generated code
- no scripts for modules that do not exist
- BDD generation script
- run script for all tests
- run script for login-only tests if login feature exists
- cleanup script

### tsconfig.json guidance

Use strict TypeScript and include Playwright and Node types.

Recommended settings:
- `target: ES2022`
- `module: commonjs`
- `moduleResolution: node`
- `strict: true`
- `esModuleInterop: true`
- `types: ["@playwright/test", "node"]`

### playwright.config.ts guidance

The config must:
- load env from `env/<ENV>.env`
- define BDD config using real feature and step paths
- keep fixtures and step-definition paths consistent
- use target base URL from environment
- avoid leftover example URLs
- avoid referencing reporters or hooks that are not generated

Recommended BDD pattern:

```ts
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
```

### Critical setup rule

A generated framework is **not complete** unless these commands are present in documentation or README:

```bash
npm init -y
npm install --save-dev @playwright/mcp
npm install --save-dev @playwright/test
npx playwright install
```

---

## Core Concepts

### Feature files

Feature files define business-readable behavior using Gherkin.

```gherkin
@smoke @ui @login
Feature: Login

  Background:
    Given user opens "appUrl"

  @TCId-Login001
  Scenario: Valid login
    When user performs UI login with "testdata.username" and "testdata.password"
    Then "account_link" should be visible
```

### Step definitions

Step definitions connect Gherkin to implementation code.

```ts
When(
  'user performs UI login with {string} and {string}',
  async ({ loginPage, td }, username: string, password: string) => {
    await loginPage.attemptLogin(td(username), td(password));
  }
);
```

### Page objects

Page objects hold target-page actions and assertions only.

```ts
export default class LoginPage extends BasePage {
  async attemptLogin(username: string, password: string): Promise<void> {
    await this.inputInElementByKey('login_email', username);
    await this.inputInElementByKey('login_password', password);
    await this.clickByKey('login_loginButton');
  }
}
```

### Locators

All selectors must be centralized in `config_locators.ts`.

```ts
export const L = {
  login_email: 'id:Email',
  login_password: 'id:Password',
  login_loginButton: {
    primary: 'css:input.login-button',
    fallbacks: ['role:button|Log in', 'text:Log in'],
  },
};

export type LocatorKey = keyof typeof L;
```

### Fixtures

Fixtures provide page objects and helpers through dependency injection.

```ts
export type AppFixtures = {
  loginPage: LoginPage;
  commonPage: CommonPage;
  td: (value: string) => string;
};
```

---

## Working with Locators

### Rule 1: centralize everything

Do not place raw selectors in:
- feature files
- step definitions
- page-object business methods

All selectors must come from `config_locators.ts`.

### Supported locator formats

- `data-test value` as the default raw string
- `css:...`
- `id:...`
- `text:...`
- `role:<role>|<name>`
- `title:...`
- object form with `primary` and `fallbacks`

### Fallback format

```ts
login_loginButton: {
  primary: 'css:input.login-button',
  fallbacks: ['role:button|Log in', 'text:Log in'],
}
```

### BasePage responsibilities

`BasePage.ts` should provide:
- locator resolution
- fallback resolution
- fill helpers
- click helpers
- visibility assertions
- text assertions
- clickable state assertions
- reusable waits where appropriate

### Hard rule for steps

Shared steps must use **locator keys**, not raw selector strings.

Good:
```ts
await commonPage.clickByKey(asLocatorKey(key));
```

Bad:
```ts
await page.locator('#Email').fill(value);
```

---

## Creating Feature Files

### Structure

Keep feature files:
- business-readable
- concise
- scoped to the requested behavior
- tagged consistently
- free from implementation detail

### Recommended tagging

```gherkin
@smoke @regression @ui @login @TCId-Login001
```

### Scenario rules

- Use `Scenario` when only one concrete case is needed.
- Use `Scenario Outline` only when parameterization is intentional.
- Do not use examples for a scenario that must stay single-case.
- Always include a TCId tag.

### Background rules

Use `Background` only for true shared setup such as opening the app or navigating to a page.

---

## Step Definitions

### Shared steps

Keep generic steps in `src/step-definitions/shared/commonSteps.ts`, for example:
- open URL key
- enter value in locator key
- click locator key
- assert visible
- assert text
- assert clickable

### Page-specific steps

Create page-specific step files only when the behavior is domain-specific, for example:
- `loginSteps.ts`
- `checkoutSteps.ts`
- `profileSteps.ts`

### Step quality rules

- One responsibility per step
- Reuse shared steps whenever possible
- Use `td()` for `testdata.*` values
- Do not hardcode credentials inside step definitions
- Do not create near-duplicate step variants unless necessary

### BDD binding rule

Feature text and step definitions must match exactly. A framework is incomplete if any step is missing, ambiguous, or duplicated.

---

## Page Objects

### BasePage

`BasePage.ts` is the reusable engine of the framework and should be preserved across projects unless a generic improvement is needed.

It should contain:
- locator helper methods
- locator resolution from config
- fallback support
- generic fill/click/assert methods
- optional visual helper wrappers if used

### CommonPage

`CommonPage.ts` should remain a shared page object for common assertions and generic actions that do not belong to one single business page.

### Target page objects

Target page objects must:
- extend `BasePage`
- use locator keys only
- expose clean public business methods
- contain no raw selectors
- contain only target-website behavior

### Remove unrelated pages

Do not keep example page objects such as inventory or checkout if the requested framework scope is only login.

---

## Test Data Management

### Folder pattern

```text
src/test-data/<env>/<feature>.json
```

### Data resolution rules

- Use `testdata.` prefix in feature files and steps
- Resolve based on environment + feature + TCId
- Keep the same structure across environments
- Do not hardcode credentials in code
- Match JSON keys to TCId tags

### Example structure

```json
{
  "TCId-Login001": {
    "username": "user@example.com",
    "password": "password123"
  }
}
```

---

## Fixtures & Dependency Injection

### Purpose

Fixtures provide page objects, helpers, and reusable services without manual construction inside steps.

### Typical fixtures

- `page`
- `loginPage`
- `commonPage`
- `resolveTestData`
- `td`
- optional `apiContext`
- optional `apiService`

### Registration rules

If a step uses a fixture, that fixture must be declared in `Fixtures.ts`. Do not reference page objects in steps unless they are registered fixtures.

### Consistency rules

- keep fixture names stable
- export `test`, `Given`, `When`, `Then`
- ensure Playwright BDD config includes the fixtures file path consistently

---

## Hooks

### Responsibilities

Hooks can handle:
- scenario logging
- browser console logging
- page error logging
- screenshots on failure
- environment-aware setup/cleanup

### Keep hooks generic

Hooks must not contain target-site business logic unless explicitly required by the project.

### Recommended scope

Use hooks for:
- lifecycle events
- diagnostics
- failure artifacts

Use fixtures for:
- dependency injection
- reusable object creation
- data helpers

---

## Utilities

### Common utilities

Useful generic utilities include:
- `logger.ts`
- `asLocatorKey.ts`
- `testData.ts`
- `dataUtils.ts`
- `fallbackTracker.ts`

### Utility rule

Keep a utility only if generated code actually imports it. Do not generate utility files that are never referenced.

### testData.ts rule

Static URL mappings in `testData.ts` must always be updated for the target website. Do not keep example URLs from another application.

---

## Running Tests

### Standard commands

```bash
npm run bddgen
npm run pw:test
npm run pw:login
npm test
```

### Environment examples

```bash
ENV=dev npm run pw:test
ENV=pp npm run pw:test
ENV=prod npm run pw:test
```

### Login-only example

```bash
npm run pw:login
```

### Required documentation rule

Every generated framework must document:
- full install flow
- browser install flow
- BDD generation command
- full test run command
- target feature run command

---

## Environment Configuration

### Env files

Use:
- `env/dev.env`
- `env/pp.env`
- `env/prod.env`

### Recommended variables

```env
ENV=dev
APP_URL=https://target-app.example.com/
API_BASE_URL=https://target-app.example.com/api/
GOOGLE_URL=https://www.google.com/
```

### Hard rule

For a replicated framework, env values must be replaced with the target-site URLs. Do not keep example-site URLs.

---

## Best Practices

### Feature files

Do:
- use meaningful scenario names
- use TCId tags
- keep steps readable
- use Background only for shared setup

Do not:
- expose implementation detail
- mix unrelated flows in one feature
- duplicate scenario intent

### Locator management

Do:
- centralize selectors
- prefer stable selectors
- use fallback locators where useful
- name by page + purpose

Do not:
- hardcode selectors in steps
- use vague locator names
- duplicate selectors with inconsistent keys

### Step definitions

Do:
- keep steps focused
- use shared steps
- use typed locator-key validation
- resolve `testdata.*` through helper fixtures

Do not:
- bypass the locator layer
- manually construct page objects inside steps
- hardcode sensitive values

### Page objects

Do:
- inherit from BasePage
- keep actions business-focused
- use public methods for steps
- delegate generic assertions to BasePage

Do not:
- include generic utility logic in business page objects
- expose raw locators publicly
- mix unrelated page domains

### Replication

Do:
- copy the generic framework core
- replace only target-site business layers
- limit first generation to requested scope
- validate every reference path and dependency

Do not:
- keep unrelated example modules
- generate optional modules unless needed
- leave mixed-domain strings in the output
- assume a pre-initialized Node/Playwright workspace

---

## Pre-Output Validation Checklist

Before declaring a replicated framework complete, verify all of the following:

### Bootstrap
- `npm init -y` is documented
- Playwright MCP install command is documented if MCP is part of the workflow
- `npm install --save-dev @playwright/test` is documented
- `npx playwright install` is documented

### Dependency consistency
- every imported file exists
- every referenced package exists in `package.json`
- every script points to real files or tags
- no unused reporter/service/module is referenced

### BDD consistency
- fixtures file path is valid
- hooks path is valid
- feature glob is valid
- step glob is valid
- no missing steps
- no duplicate or ambiguous steps

### Framework consistency
- every fixture used in steps is registered
- every locator key used in code exists in `config_locators.ts`
- no raw selector is hardcoded in steps
- page objects extend `BasePage`

### Replication consistency
- no leftover strings from the example application remain
- env URLs match the target site
- test data matches TCIds
- generated files reflect only the requested target scope

### Runtime readiness
- install commands are documented
- login-only run command is documented if login feature exists
- framework can run on a clean machine without manual patching

---