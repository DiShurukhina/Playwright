import { Page } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";

export async function loginAsAdmin(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.waitForOpened();

  await loginPage.fillCredentials();
  await loginPage.clickLogin();
  
  const homePage = new HomePage(page);
  await homePage.waitForOpened();
}
