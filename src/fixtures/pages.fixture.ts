import { test as base, expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service";
import { HomeUIService } from "ui/service/home.ui-service";
import { LoginUIService } from "ui/service/login.ui-service";
import { ProductsListUIService } from "ui/service/productsList.ui-service";

export interface IPages {
  homePage: HomePage;
  loginPage: LoginPage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
}

export const test = base.extend<IPages>({
  //pages
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },
  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },
  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },
  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
});

export { expect };
