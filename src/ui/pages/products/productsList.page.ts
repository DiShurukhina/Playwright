import { IProductTableRow } from "data/salesPortal/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export class ProductsListPage extends SalesPortalPage {
  readonly productPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) => this.page.locator("td", { hasText: productName }).locator("xpath=parent::tr");
  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getFirstProductData(): Promise<IProductTableRow> {
    const [name, price, manufacturer] = await this.page.locator("#table-products tbody :nth-child(1) td").allInnerTexts();

    return {
        name: name!,
        price: price!,
        manufacturer: manufacturer! as MANUFACTURERS
    }
  }
}
