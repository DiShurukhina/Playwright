import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { test, expect } from "fixtures";

test.describe("[Sales Management Portal] [Products]", () => {
  let id = "";
  let token = "";
  const productData = generateProductData();
  test("Product Details", async ({loginAsAdmin, homePage, productsListPage, addNewProductPage }) => {
    await loginAsAdmin();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  });

  test("Product Details with services", async ({
    loginUIService,
    homeUIService,
    productsListUIService,
    productsApiService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIService.openModule("Products");
    await productsListUIService.openDetailsModal(createdProduct.name);
    const actual = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsData(actual, createdProduct);
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
});
