import test from "@playwright/test";
import { loginAsAdmin } from "utils/loginAsAdmin.utils";

test.describe("Sales Portal Login", () => {
  test("Test Login", async ({ page }) => {
    await loginAsAdmin(page);
  });
});
