import { CustomersApi } from "api/api/customers.api";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { createCustomerSchema } from "data/salesPortal/schemas/customers/create.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { ICustomer } from "data/salesPortal/types/customer.types";
import { logStep } from "utils/reports/logStep.utils";
import { validateResponse } from "utils/validation/validateResponse.utils";

export class CustomersApiService {
    constructor(private customersApi: CustomersApi) {}

    @logStep("Create customer via API")
    async create(token: string, customerData?: Partial<ICustomer>) {
        const data = generateCustomerData(customerData);
        const response = await this.customersApi.create(data, token);
        validateResponse(response, {
          status: STATUS_CODES.CREATED,
          IsSuccess: true,
          ErrorMessage: null,
          schema: createCustomerSchema,
        });
        return response.body.Customer;
      }
    
      @logStep("Delete customer via API")
      async delete(token: string, id: string) {
        const response = await this.customersApi.delete(id, token);
        validateResponse(response, {
          status: STATUS_CODES.DELETED,
        });
      }
}