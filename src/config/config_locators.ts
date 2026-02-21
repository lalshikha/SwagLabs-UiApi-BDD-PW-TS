// One central place for all locator keys
// Store values as the actual data-test attribute values used in the app.

export const L = {
  // Login page
  login_username: 'username',
  login_password: 'password',
  login_loginButton: 'login-button',
  login_error: 'error',

  // Inventory page
  inventory_container: 'inventory-container',
  inventory_item: 'inventory-item',

  // If you can add stable test ids in app, prefer data-test for buttons too.
  // Otherwise keep a "selector:" entry and handle it in BasePage.getByKey().
  // inventory_firstAddToCartButton: 'add-to-cart-0',
} as const;

export type LocatorKey = keyof typeof L;
