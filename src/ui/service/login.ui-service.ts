import { Page } from "@playwright/test";
import { ICredentials } from "data/salesPortal/types/credentials.types";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { credentials } from "config/env";

export class LoginUIService {
    homePage: HomePage;
    loginPage: LoginPage;

    constructor(private page: Page) {
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
    }

    async login(credentials: ICredentials) {
        await this.loginPage.open();
        await this.loginPage.fillCredentials(credentials);
        await this.loginPage.clickLogin();
        await this.homePage.waitForOpened();

        
        const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
        console.log(token);
        return token;
    }

    async loginAsAdmin() {
        return await this.login(credentials);
    }
}