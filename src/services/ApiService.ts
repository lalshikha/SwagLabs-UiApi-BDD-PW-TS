/**
 * API SERVICE - TEMPLATE
 * 
 * ⚠️ CUSTOMIZATION REQUIRED: Implement your application's API interactions here.
 * 
 * INSTRUCTIONS:
 * 1. The baseUrl is injected via Fixtures (from playwright.config.ts or APP_URL env var)
 * 2. Do NOT hardcode URLs in this service
 * 3. Add methods for your application's API endpoints
 * 4. This service is reusable for any application
 * 
 * PATTERN:
 * - Constructor receives baseUrl via Fixtures
 * - Each method represents one API interaction (GET, POST, etc.)
 * - Use HTTP verbs as method names (getUser, createOrder, deleteItem)
 * - Return response data for easy assertion in steps
 * - Use logger for debugging
 */

import { APIRequestContext, expect } from '@playwright/test';
import logger from '../utils/logger';

export default class ApiService {
  private baseUrl: string;

  /**
   * Constructor receives baseUrl from fixtures
   * The baseUrl comes from: process.env.APP_URL or playwright.config.ts
   * @param request - Playwright APIRequestContext
   * @param baseUrl - Application base URL
   */
  constructor(
    private readonly request: APIRequestContext,
    baseUrl: string = process.env.APP_URL || 'http://localhost:3000'
  ) {
    this.baseUrl = baseUrl;
  }

  /**
   * Example: Validate that the application is reachable
   * This validates the application specified via baseUrl, NOT hardcoded domain
   */
  async validateSiteIsReachable(): Promise<void> {
    logger.info(`API health check: GET ${this.baseUrl}`);
    try {
      const res = await this.request.get(this.baseUrl);
      expect(res.status()).toBe(200);
      const body = await res.text();
      expect(body.length).toBeGreaterThan(100);
      logger.info('✓ API health check passed: application is reachable');
    } catch (error) {
      logger.error(`✗ API health check failed for ${this.baseUrl}`);
      throw error;
    }
  }

  // TODO: ADD YOUR APPLICATION-SPECIFIC ENDPOINTS BELOW
  // PATTERN EXAMPLES:
  // 
  // async getUser(userId: number) {
  //   const res = await this.request.get(`${this.baseUrl}/api/users/${userId}`);
  //   expect(res.status()).toBe(200);
  //   return await res.json();
  // }
  //
  // async createOrder(orderData: any) {
  //   const res = await this.request.post(`${this.baseUrl}/api/orders`, {
  //     data: orderData
  //   });
  //   expect(res.status()).toBe(201);
  //   return await res.json();
  // }
  //
  // async deleteItem(itemId: string) {
  //   const res = await this.request.delete(`${this.baseUrl}/api/items/${itemId}`);
  //   expect(res.status()).toBe(204);
  // }
}
