import { test } from "fixtures/login.fixture";

test.describe("Sales Portal Login", () => {
  test("Test Login", async ({ loginAsAdmin }) => {
    await loginAsAdmin();
  });
});
