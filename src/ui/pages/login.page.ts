import { ICredentials } from "data/salesPortal/types/credentials.types";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.page.locator('#signInPage');

  async fillCredentials(credentials: ICredentials) {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
