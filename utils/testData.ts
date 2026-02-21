export interface TestUser {
  username: string;
  password: string;
}

export type TestData = {
  testUsers: Record<string, TestUser>;
  saucedemoUrl: string;
};

export const testUsers: Record<string, TestUser> = {
  standard_user: { username: 'standard_user', password: 'secret_sauce' },
  visual_user: { username: 'visual_user', password: 'secret_sauce' },
};

export const saucedemoUrl = 'https://www.saucedemo.com/';

export const testData: TestData = {
  testUsers,
  saucedemoUrl,
};
