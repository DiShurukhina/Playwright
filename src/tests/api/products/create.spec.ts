import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/salesPortal/schemas/products/create.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProduct } from "data/salesPortal/types/product.types";
import { positiveCases, negativeCases } from "data/salesPortal/products/createProductCases";
import { TAGS } from "data/salesPortal/tags";


test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Create product", {tag: [TAGS.API, TAGS.PRODUCTS, TAGS.REGRESSION, TAGS.SMOKE]},  async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
  });

  for(const {testName, productData} of positiveCases) {
    test(testName, {tag: [TAGS.API, TAGS.PRODUCTS, TAGS.REGRESSION, TAGS.SMOKE]}, async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    })
  }
});

  test.describe("[API] [Sales Portal] [Negative cases]", () => {
  for(const {testName, productData} of negativeCases) {
    test(testName, {tag: [TAGS.API, TAGS.PRODUCTS, TAGS.REGRESSION, TAGS.SMOKE]}, async ({ loginApiService, productsApi }) => {
    let token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApi.create(productData as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: "Incorrect request body",
      });
    });
  }
});