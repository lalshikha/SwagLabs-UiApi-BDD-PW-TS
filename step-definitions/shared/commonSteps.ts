import { Given } from '@cucumber/cucumber';
import {Fixtures} from '../../fixtures/Fixtures';
import { saucedemoUrl } from '../../utils/testData';

Given(
  'user opens saucedemo application',
  async function (this: Fixtures) {
    await this.page.goto(saucedemoUrl);
    await this.page.waitForLoadState('networkidle');
  }
);
