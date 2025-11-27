//import { test, expect } from "fixtures/login.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { IProductTableRow } from "data/salesPortal/types/product.types";
import { test, expect } from "fixtures";

test.describe("[Sales Management Portal] [Products]", async () => {
  let id = "";
  let token = "";
  const productData = generateProductData();
  // test.beforeEach(async ({ loginAsAdmin }) => {
  //   await loginAsAdmin();
  // });

    test("Add new product with services", async ({ loginUIService, addNewProductUIService, productsListPage }) => {
    token = await loginUIService.loginAsAdmin();
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create();
    id = createdProduct._id;
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
  });

  test.afterEach(async ({ productsApiService}) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test.skip("Add new product", async ({ homePage, productsListPage, addNewProductPage}) => {
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();

    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);

    const expectedData: IProductTableRow = {
      name: productData.name,
      price: "$" + productData.price,
      manufacturer: productData.manufacturer,
    };
    expect(await productsListPage.getFirstProductData()).toEqual(expectedData);
  });

  test.skip("[e2e] Product life cycle", async ({ homePage, productsListPage, addNewProductPage }) => {
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();

    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    await productsListPage.deleteButton(productData.name).click();
    const { deleteModal } = productsListPage;
    await deleteModal.waitForOpened();

    await deleteModal.clickConfirm();
    await deleteModal.waitForClosed();
    await productsListPage.waitForOpened();
    await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
  })
});
