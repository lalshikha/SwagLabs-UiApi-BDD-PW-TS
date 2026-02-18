export interface TestUser {
  username: string;
  password: string;
}

export const testUsers: Record<string, TestUser> = {
  standard_user: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  visual_user: {
    username: 'visual_user',
    password: 'secret_sauce'
  }
};

export const saucedemoUrl = 'https://www.saucedemo.com/';
