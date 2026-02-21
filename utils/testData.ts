// utils/testData.ts
export interface TestUser {
  username: string;
  password: string;
}

export type TestData = {
  testUsers: Record<string, TestUser>;
  saucedemoUrl: string; // keep name for compatibility
};

export const testUsers: Record<string, TestUser> = {
  standard_user: { username: 'standard_user', password: 'secret_sauce' },
  visual_user: { username: 'visual_user', password: 'secret_sauce' },
  locked_out_user: { username: 'locked_out_user', password: 'secret_sauce' },
};

// Pull from env first, fallback to default
export const saucedemoUrl =
  process.env.APP_URL ??
  process.env.BASE_URL ??
  'https://www.saucedemo.com/';

export const testData: TestData = {
  testUsers,
  saucedemoUrl,
};
