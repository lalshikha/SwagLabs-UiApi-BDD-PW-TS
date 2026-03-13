export type LocatorDef =
  | string
  | {
      primary: string;
      fallbacks?: string[];
    };

// One central place for all locator keys.
// Plain string values are still supported for backward compatibility.
// Supported prefixes:
// - css:
// - id:
// - title:
// - text:
// - role:

export const L = {
  // Login page
  login_username: 'username',
  login_password: 'password',
  login_loginButton: {
    primary: 'login-button-old',
    fallbacks: ['login-button'],
  },
  login_error: 'error',

  // Inventory page
  inventory_item: 'inventory-item',
  inventory_pageTitle: 'text:Products',
  inventory_hamburgerMenu: 'role:button|Open Menu',
  inventory_addToCartButton: 'add-to-cart-sauce-labs-backpack',
  inventory_page: 'inventory-container',
} as const satisfies Record<string, LocatorDef>;

export type LocatorKey = keyof typeof L;
