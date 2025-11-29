import { ProductsApi } from "api/api/products.api";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/salesPortal/schemas/products/create.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { IProduct } from "data/salesPortal/types/product.types";
import { logStep } from "utils/reports/logStep.utils";
import { validateResponse } from "utils/validation/validateResponse.utils";

export class ProductsApiService {
    constructor(private productsApi: ProductsApi) {}

    @logStep("Create product via API")
    async create(token: string, productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    const response = await this.productsApi.create(data, token);
    validateResponse(response, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
    });
    return response.body.Product;
  }

  @logStep("Delete product via API")
  async delete(token: string, id: string) {
    const response = await this.productsApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}