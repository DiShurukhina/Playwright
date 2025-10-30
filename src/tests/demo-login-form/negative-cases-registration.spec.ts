import test, { expect } from "@playwright/test";
import { invalidCredentialsCases } from "./testdata";

const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  await page.locator("#registerOnLogin").click();
});

invalidCredentialsCases.forEach(({ testName, username, password, message }) => {
  test(testName, async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(username);
    const actualUsername = await page
      .locator("#userNameOnRegister")
      .inputValue();
    expect(actualUsername).toBe(username);

    await page.locator("#passwordOnRegister").fill(password);
    const actualPassword = await page
      .locator("#passwordOnRegister")
      .inputValue();
    expect(actualPassword).toBe(password);

    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(message);
  });
});
test("Username not filled", async ({ page }) => {
  await page.locator("#passwordOnRegister").fill("Password");
  await page.locator("#register").click();
  await expect(page.locator("#errorMessageOnRegister")).toHaveText(
    "Username is required"
  );
});

test("Password not filled", async ({ page }) => {
  await page.locator("#userNameOnRegister").fill("ValidUser");
  await page.locator("#register").click();
  await expect(page.locator("#errorMessageOnRegister")).toHaveText(
    "Password is required"
  );
});

test("Username already exists", async ({ page }) => {
  const username = "ValidUser";
  const password = "Password1";
  await page.evaluate(
    ({ username, password }) => {
      localStorage.setItem(
        username,
        JSON.stringify({ name: username, password })
      );
    },
    { username, password }
  );

  await page.goto(baseUrl);
  await page.locator("#registerOnLogin").click();
  await page.locator("#userNameOnRegister").fill(username);
  await page.locator("#passwordOnRegister").fill(password);
  await page.locator("#register").click();
  await expect(page.locator("#errorMessageOnRegister")).toHaveText(
    "Username is in use"
  );
});
