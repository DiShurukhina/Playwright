import {  test as base,  expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

export interface IPages {
  homePage: HomePage;
  loginPage: LoginPage
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
}

export const test = base.extend<IPages>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    }, 
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    productsListPage: async ({page}, use) => {
        await use(new ProductsListPage(page));
    },
    addNewProductPage: async ({page}, use) => {
        await use(new AddNewProductPage(page));
    },
})

export { expect };