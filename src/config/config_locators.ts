// One central place for all locator keys
// Store values as the actual data-test attribute values used in the app.

export const L = {
  // Login page
  login_username: 'username',
  login_password: 'password',
  login_loginButton: 'login-button',
  login_error: 'error',

  // Inventory page
  inventory_item: 'inventory-item',
  inventory_pageTitle: 'title',
  inventory_hamburgerMenu: 'css:#react-burger-menu-btn',
  inventory_addToCartButton: 'add-to-cart-sauce-labs-backpack',
  inventory_page: 'inventory-container',

} as const;

export type LocatorKey = keyof typeof L;
