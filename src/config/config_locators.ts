// One central place for all locator keys
// Store values as the actual data-test attribute values used in the app.

export const L = {
  // Login page
  login_username_dt: 'username',
  login_password_dt: 'password',
  login_loginButton_dt: 'login-button',
  login_error_dt: 'error',

  // Inventory page
  inventory_item_dt: 'inventory-item',
  inventory_pageTitle_dt: 'title',
  inventory_hamburgerMenu_id: 'react-burger-menu-btn',
  inventory_addToCartButton_dt: 'add-to-cart-sauce-labs-backpack',
  inventory_page_dt: 'inventory-container',

} as const;

export type LocatorKey = keyof typeof L;
