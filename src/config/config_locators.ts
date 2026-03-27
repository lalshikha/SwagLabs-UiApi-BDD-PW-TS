/**
 * APPLICATION LOCATORS TEMPLATE
 * 
 * ⚠️ CUSTOMIZATION REQUIRED: This file defines all UI element locators for your application.
 * 
 * INSTRUCTIONS:
 * 1. Replace all locators below with your APPLICATION'S element selectors
 * 2. Add locators for every element your tests interact with
 * 3. Maintain the structure: pageName_elementDescription pattern
 * 4. Use descriptive names so developers know what each locator refers to
 * 
 * NAMING CONVENTION:
 * Pattern: {pageArea}_{elementDescription}
 * Examples:
 *   - login_usernameInput
 *   - login_passwordInput
 *   - login_submitButton
 *   - dashboard_welcomeHeading
 *   - products_filterButton
 * 
 * LOCATOR STRATEGIES (in recommended priority order):
 * 1. data-testid    : Best for maintainability (dev-friendly, stable)
 * 2. Roles/ARIA     : Accessibility-first (aria-label, role)
 * 3. Text matching  : User-centric (buttons/labels)
 * 4. CSS selectors  : Generic fallback
 * 5. XPath          : Avoid unless absolutely necessary (brittle)
 * 
 * EXAMPLES:
 * - data-testid: '[data-testid="username-field"]'
 * - role: 'button:has-text("Sign In")'
 * - text: 'text:Welcome User'
 * - role: 'role:button|Submit'
 * 
 * FALLBACK SUPPORT:
 * You can specify primary + fallback locators for resilience:
 * {
 *   primary: '[data-testid="login-btn"]',
 *   fallbacks: ['#loginButton', 'button:has-text("Login")']
 * }
 */

export type LocatorDef =
  | string
  | {
      primary: string;
      fallbacks?: string[];
    };

const L = {
  // ============================================
  // LOGIN PAGE EXAMPLES - Replace with your app
  // ============================================
  // TODO: Replace with YOUR application's login page locators
  login_usernameInput: '[data-testid="username-field"]',  // TODO: Your selector
  login_passwordInput: '[data-testid="password-field"]',  // TODO: Your selector
  login_submitButton: 'button:has-text("Sign In")',       // TODO: Your selector
  login_errorMessage: '[role="alert"]',                  // TODO: Your selector
  login_forgotPasswordLink: 'text:Forgot Password?',     // TODO: Your selector

  // ============================================
  // DASHBOARD PAGE EXAMPLES - Create similar sections for your pages
  // ============================================
  // TODO: Add YOUR application's dashboard/home page locators
  dashboard_heading: 'h1:has-text("Dashboard")',          // TODO: Your selector
  dashboard_welcomeMessage: '[data-testid="welcome"]',     // TODO: Your selector
  dashboard_logoutButton: '[data-testid="logout-btn"]',    // TODO: Your selector
  dashboard_userMenu: '[aria-label="User menu"]',          // TODO: Your selector

  // ============================================
  // ADD MORE PAGES HERE AS YOU EXPAND THE FRAMEWORK
  // ============================================
  // PATTERN: Copy the section above for each new page
  // Example: CHECKOUT_PAGE, PRODUCTS_PAGE, SETTINGS_PAGE, etc.
  //
  // products_filterButton: '[data-testid="filter"]',
  // products_searchInput: '[data-testid="search"]',
  // products_itemCard: '[data-testid="product-item"]',
  //
  // cart_itemRow: '.cart-item',
  // cart_checkoutButton: '[data-testid="checkout"]',
  //
  // settings_saveButton: '[data-testid="save"]',
  // settings_cancelButton: '[data-testid="cancel"]',
} as const satisfies Record<string, LocatorDef>;

/**
 * Type-safe locator key extraction
 * Prevents typos at compile-time; steps can't reference non-existent keys
 */
export type LocatorKey = keyof typeof L;

/**
 * Validate that all locator keys follow naming convention
 * Logs warnings for keys that don't follow {pageName}_{elementDescription}
 */
export const validateLocatorConfiguration = () => {
  Object.entries(L).forEach(([key]) => {
    if (!key.includes('_')) {
      console.warn(
        `⚠️ Locator key "${key}" should follow pattern: pageName_elementDescription`
      );
    }
  });
};

// Export for use in page objects and type validation
export { L };
