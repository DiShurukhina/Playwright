import { expect, Locator, Page } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/env";
import { IResponse } from "data/salesPortal/types/core.types";


export abstract class BasePage {
  abstract readonly uniqueElement: Locator;
  constructor(protected page: Page) {}
  async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL+ route);
  }
  // async open(route: string = "") {
  //   const base = SALES_PORTAL_URL.endsWith("/") ? SALES_PORTAL_URL : SALES_PORTAL_URL + "/";
  //   const path = route ? route.replace(/^\//, "") : "";
  //   await this.page.goto(base + path);
  // }
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
  }

  async interceptRequest<T extends unknown[]>(url: string, triggerAction: (...args: T) => Promise<void>, ...args: T) {
    const [request] = await Promise.all([
      this.page.waitForRequest((request) => request.url().includes(url)),
      triggerAction(...args),
    ]);
    return request;
  }

  async interceptResponse<U extends object | null, T extends unknown[]>(
    url: string, triggerAction: (...args: T) => Promise<void>, ...args: T): Promise<IResponse<U>> {
      const [response] = await Promise.all ([
        this.page.waitForResponse((response) => response.url().includes(url)),
        triggerAction(...args),
      ]);
      return {
        status: response.status(),
        headers: response.headers(),
        body: (await response.json()) as U,
      };
    }
}
