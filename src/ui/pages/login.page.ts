import { BasePage } from "./base.page";
import { credentials } from "config/env";

export class LoginPage extends BasePage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.page.locator('#signInPage');

  async fillCredentials() {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
