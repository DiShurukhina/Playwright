import test, { expect } from "@playwright/test";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { IProductTableRow } from "data/salesPortal/types/product.types";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { loginAsAdmin } from "utils/loginAsAdmin.utils";

test.describe("[Sales Management Portal] [Products]", async () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();

    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    
    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_CREATED
    );

    const expectedData: IProductTableRow = {
      name: productData.name,
      price: "$" + productData.price,
      manufacturer: productData.manufacturer,
    };
    expect(await productsListPage.getFirstProductData()).toEqual(expectedData);
  });
});
