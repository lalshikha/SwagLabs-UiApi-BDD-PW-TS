import { Given } from '@cucumber/cucumber';
import {CustomWorld} from '../../fixtures/world';
import { saucedemoUrl } from '../../utils/testData';

Given(
  'user opens saucedemo application',
  async function (this: CustomWorld) {
    await this.page.goto(saucedemoUrl);
    await this.page.waitForLoadState('networkidle');
  }
);
