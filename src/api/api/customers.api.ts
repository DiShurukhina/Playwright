import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/salesPortal/types/core.types";
import { ICustomer, ICustomerResponse } from "data/salesPortal/types/customer.types";
import { logStep } from "utils/reports/logStep.utils";

export class CustomersApi {
    constructor(private apiClient: IApiClient) {}

    @logStep("POST /api/customers")
    async create(customer: ICustomer, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customers,
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: customer,
        };
        return await this.apiClient.send<ICustomerResponse>(options);
    }

    @logStep("PUT /api/customers")
    async update(_id: string, newProduct: ICustomer, token: string) {
        const options: IRequestOptions = {
          baseURL: apiConfig.baseURL,
          url: apiConfig.endpoints.customerById(_id),
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: newProduct,
        };
    
        return await this.apiClient.send<ICustomerResponse>(options);
      }
    
      @logStep("GET /api/customers/{id}")
      async getById(_id: string, token: string) {
        const options: IRequestOptions = {
          baseURL: apiConfig.baseURL,
          url: apiConfig.endpoints.customerById(_id),
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        return await this.apiClient.send<ICustomerResponse>(options);
      }
    
      @logStep("GET /api/customers/all")
      async getAll(token: string) {
        const options: IRequestOptions = {
          baseURL: apiConfig.baseURL,
          url: apiConfig.endpoints.customersAll,
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        return await this.apiClient.send<ICustomerResponse>(options);
      }
    
      @logStep("DELETE /api/customers/{id}")
      async delete(_id: string, token: string) {
        const options: IRequestOptions = {
          baseURL: apiConfig.baseURL,
          url: apiConfig.endpoints.customerById(_id),
          method: "delete",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        return await this.apiClient.send<null>(options);
      }
}