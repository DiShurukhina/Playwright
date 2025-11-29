import _ from "lodash";
import { test } from "fixtures";
import { TAGS } from "data/salesPortal/tags";

test.describe("[Sales Management Portal] [Products]", () => {
  let id = "";
  let token = "";

  test("Product Details with services", {tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],}, async ({
    homeUIService,
    productsListUIService,
    productsApiService,
    productsListPage,
  }) => {
    token = await productsListPage.getAuthToken();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIService.homePage.open();
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
