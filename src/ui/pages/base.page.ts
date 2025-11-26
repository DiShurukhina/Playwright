import { expect, Locator, Page } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/env";


export abstract class BasePage {
  abstract readonly uniqueElement: Locator;
  constructor(protected page: Page) {}
  async open() {
    await this.page.goto(SALES_PORTAL_URL!);
  }
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
  }

  async interceptRequest<T extends unknown[]>(url: string, triggerAction: (...args: T) => Promise<void>, ...args: T) {
    const [request] = await Promise.all([
      this.page.waitForRequest((request) => request.url().includes(url)),
      triggerAction(...args),
    ]);
    return request;
  }
}
