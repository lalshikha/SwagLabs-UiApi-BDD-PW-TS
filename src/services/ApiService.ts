import { APIRequestContext, expect } from '@playwright/test';
import logger from '../utils/logger';
import { saucedemoUrl } from '../utils/testData';

export default class ApiService {
  constructor(private readonly request: APIRequestContext) {}

  async validateSiteIsReachable(): Promise<void> {
    logger.info('API check: GET ' + saucedemoUrl);
    const res = await this.request.get(saucedemoUrl);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body.length).toBeGreaterThan(100);
    logger.info('API check passed: site reachable');
  }
}
