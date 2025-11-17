import test, { expect } from "@playwright/test";

// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

test.describe("[Demo login form]", () => {
  test("Login via LocalStorage", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";

    const testUser = {
      username: "test@gmail.com",
      password: "SecretPw123!@#",
    };
    await page.goto(url);
    await page.evaluate((testUser) => {
      localStorage.setItem(
        testUser.username,
        JSON.stringify({ name: testUser.username, password: testUser.password })
      );
    }, testUser);

    await page.reload();
    await page.locator("#userName").fill(testUser.username);
    await page.locator("#password").fill(testUser.password);
    await page.locator("#submit").click();
    await expect(page.locator("#successMessage")).toHaveText(
      `Hello, ${testUser.username}!`
    );
  });
});
