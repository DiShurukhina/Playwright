import { expect} from "@playwright/test";
import { BasePage } from "./base.page";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  
  override async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }
}