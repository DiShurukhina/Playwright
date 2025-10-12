import test, { expect } from "@playwright/test";

interface ICases {
  testName: string;
  username?: string;
  password?: string;
  message: string;
}

test.describe("Register on [demo-login-form]", () => {
  const validCredentialsCases: ICases[] = [
    {
      testName: "Valid credentials without spaces",
      username: "ValidUser",
      password: "ValidPassword",
      message: "Successfully registered! Please, click Back to return on login page",
    },
    {
      testName: "Valid credentials with spaces",
      username: "Valid User",
      password: "Valid Password",
      message: "Successfully registered! Please, click Back to return on login page",
    },
  ];

  const invalidCredentialsCases: ICases[] = [
    {
      testName: "Username too short",
      username: "Di",
      password: "Password",
      message: "Username should contain at least 3 characters",
    },
    {
      testName: "Username too long",
      username: "u".repeat(41),
      password: "Password1",
      message: "Successfully registered! Please, click Back to return on login page",
    },
    {
      testName: "Username with spaces at the beginning",
      username: " user",
      password: "Password",
      message: "Prefix and postfix spaces are not allowed is username",
    },
    {
      testName: "Username with spaces at the end",
      username: "user ",
      password: "Password1",
      message: "Prefix and postfix spaces are not allowed is username",
    },
    {
      testName: "Username only spaces",
      username: "   ",
      password: "Password",
      message: "Prefix and postfix spaces are not allowed is username",
    },
    {
      testName: "Username not filled",
      password: "Password",
      message: "Username is required",
    },
    {
      testName: "Password too short",
      username: "ValidUser",
      password: "Pwd1",
      message: "Password should contain at least 8 characters",
    },
    {
      testName: "Password too long",
      username: "ValidUser",
      password: "A".repeat(21),
      message: "Successfully registered! Please, click Back to return on login page",
    },
    {
      testName: "Password without uppercase",
      username: "ValidUser",
      password: "password",
      message: "Password should contain at least one character in upper case",
    },
    {
      testName: "Password without lowercase",
      username: "ValidUser",
      password: "PASSWORD",
      message: "Password should contain at least one character in lower case",
    },
    {
      testName: "Password only spaces",
      username: "ValidUser",
      password: "        ",
      message: "Password is required",
    },
    {
      testName: "Password not filled",
      username: "ValidUser",
      message: "Password is required",
    },
  ];

  const baseUrl = "https://anatoly-karpovich.github.io/demo-login-form/";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator("#registerOnLogin").click();
  });

  validCredentialsCases.forEach(({ testName, username, password, message }) => {
    test(testName, async ({ page }) => {
      await page.locator("#userNameOnRegister").fill(username!);
      await page.locator("#passwordOnRegister").fill(password!);
      await page.locator("#register").click();
      await expect(page.locator("#errorMessageOnRegister")).toHaveText(message);
    });
  });

  invalidCredentialsCases.forEach(({ testName, username, password, message }) => {
    test(testName, async ({ page }) => {
      if (username !== undefined) {
        await page.locator("#userNameOnRegister").fill(username);
        const actualUsername = await page.locator("#userNameOnRegister").inputValue();
        expect(actualUsername).toBe(username);
      }

      if (password !== undefined) {
        await page.locator("#passwordOnRegister").fill(password);
        const actualPassword = await page.locator("#passwordOnRegister").inputValue();
        expect(actualPassword).toBe(password);
      }

      await page.locator("#register").click();
      await expect(page.locator("#errorMessageOnRegister")).toHaveText(message);
    });
  });

  test("Username already exists", async ({ page }) => {
    const username = "ValidUser";
    const password = "Password1";
    await page.evaluate(({ username, password }) => {
      localStorage.setItem(
        username,
        JSON.stringify({ name: username, password })
      );
    },{ username, password });

    await page.goto(baseUrl);
    await page.locator("#registerOnLogin").click();
    await page.locator("#userNameOnRegister").fill(username);
    await page.locator("#passwordOnRegister").fill(password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText("Username is in use");
  });
});
