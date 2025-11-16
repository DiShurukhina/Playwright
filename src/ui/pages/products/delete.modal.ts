import { expect } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class ProductDeleteModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("div[name='confirmation-modal']");
  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

  async clickClose() {
    await this.closeButton.click();
  }
  async clickCancel() {
    await this.cancelButton.click();
  }
  async clickConfirm() {
    await this.confirmButton.click();
  }
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }
}