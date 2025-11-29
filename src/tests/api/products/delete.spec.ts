import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { TAGS } from "data/salesPortal/tags";


test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", {tag: [TAGS.API, TAGS.PRODUCTS, TAGS.REGRESSION, TAGS.SMOKE]}, async ({ loginApiService, productsApiService, productsApi }) => {
    const token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    const id = createdProduct._id;
    //act
    const response = await productsApi.delete(id, token);
    //assert
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});