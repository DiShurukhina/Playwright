import { test as base, expect } from "fixtures/pages.fixture";

export interface ILoginMethods {
  loginAsAdmin: () => Promise<void>;
}

export const test = base.extend<ILoginMethods>({
  loginAsAdmin: async ({ loginPage, homePage }, use) => {
    await use(async () => {
      await loginPage.open();
      await loginPage.waitForOpened();

      await loginPage.fillCredentials();
      await loginPage.clickLogin();

      await homePage.waitForOpened();
    });
  },
});

export { expect };