import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/salesPortal/tags";
import { test, expect } from "fixtures";
import _ from "lodash";

test.describe("[e2e] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test("Update product with services", {tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],}, async ({
    productsApiService,
    productsListUIService,
    productsListPage,
    editProductPage
  }) => {
    token = await productsListPage.getAuthToken();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    await productsListUIService.open();
    await productsListPage.clickAction(createdProduct.name, "edit");
    await editProductPage.waitForOpened();

    const updatedProductData = generateProductData();
    await editProductPage.fillForm(updatedProductData);
    await editProductPage.clickSaveChanges();

    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_UPDATED
    );
    await expect(
      productsListPage.tableRowByName(updatedProductData.name)
    ).toBeVisible();

    const updatedTableRow = _.omit(
      await productsListPage.getProductData(updatedProductData.name),
      ["createdOn"]
    );
    expect(updatedTableRow).toEqual(
      _.omit(updatedProductData, ["amount", "notes"])
    );

    await productsListUIService.openDetailsModal(updatedProductData.name);
    await productsListPage.detailsModal.waitForOpened();
    const actualDetails = _.omit(
      await productsListPage.detailsModal.getData(),
      ["createdOn"]
    );
    expect(actualDetails).toEqual(updatedProductData);
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
});
