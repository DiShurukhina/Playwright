import { IProduct } from "data/salesPortal/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewProductPage extends SalesPortalPage {
    readonly title = this.page.locator('h2.page-title-text');
    readonly productName = this.page.locator('#inputName');
    readonly manufacturer = this.page.locator('#inputManufacturer');
    readonly productPrice = this.page.locator('#inputPrice');
    readonly productAmount =  this.page.locator('#inputAmount');
    readonly productNotes = this.page.locator('#textareaNotes');
    readonly saveProductButton = this.page.locator("#save-new-product");
    readonly uniqueElement = this.title;

    async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.productName.fill(productData.name);
    if (productData.manufacturer) await this.manufacturer.selectOption(productData.manufacturer);
    if (productData.price) await this.productPrice.fill(productData.price.toString());
    if (productData.amount) await this.productAmount.fill(productData.amount.toString());
    if (productData.notes) await this.productNotes.fill(productData.notes);
  }

  async clickSave() {
    await this.saveProductButton.click();
  }
}