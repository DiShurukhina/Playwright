import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { loginSchema } from "data/salesPortal/schemas/login.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/salesPortal/tags";

test.describe("[API] [Sales Portal] [Login]", () => {
  test("Login",  {tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.API, TAGS.AUTH],}, async ({ loginApi }) => {
      const loginResponse = await loginApi.login(credentials);
      validateResponse(loginResponse, {
        status: STATUS_CODES.OK,
        schema: loginSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });
      const headers = loginResponse.headers;
      expect(headers["authorization"]).toBeTruthy();
    }
  );
});
