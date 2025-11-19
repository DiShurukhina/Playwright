import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { loginSchema } from "data/salesPortal/schemas/login.schema";
import { createProductSchema } from "data/salesPortal/schemas/products/create.schema";
import { getAllProductsResponseSchema } from "data/salesPortal/schemas/products/getAll.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [SalesPortal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`,{
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test("Get all products without sorting", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
        data: credentials,
        headers: {
            "content-type": "application/json",
        },
    });
    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect(token).toBeTruthy();

    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
        data: productData,
        headers: {
           "content-type": "application/json",
            Authorization: `Bearer ${token}`, 
        },
    });

    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true, 
        ErrorMessage: null,
    });

    const actualProductData = createProductBody.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    id = actualProductData._id;

    const getAllProductsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
        headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await validateResponse(getAllProductsResponse, {
        status: STATUS_CODES.OK,
        schema: getAllProductsResponseSchema,
        IsSuccess: true, 
        ErrorMessage: null,
    });

    const getAllProductsBody = await getAllProductsResponse.json();
    const product = getAllProductsBody.Products.find(({_id}: {_id: string }) => _id === id);
    expect(_.omit(product, ["createdOn"])).toMatchObject({
      _id: id,
      ...productData
    });
  })
});
