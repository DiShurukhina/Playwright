import { test, expect } from "fixtures/api.fixture";
import { getAllProductsResponseSchema } from "data/salesPortal/schemas/products/getAll.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [SalesPortal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Get all products without sorting", async ({ loginApiService, productsApiService, productsApi }) => {
    //TODO: Preconditions
    token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    //TODO: Action
    const getAllProductsResponse = await productsApi.getAll(token);
    validateResponse(getAllProductsResponse, {
        status: STATUS_CODES.OK,
        schema: getAllProductsResponseSchema,
        IsSuccess: true, 
        ErrorMessage: null,
    });

    const product = getAllProductsResponse.body.Products.find(({_id}: {_id: string }) => _id === id);
    expect(product).toEqual(createdProduct);
  })
});
