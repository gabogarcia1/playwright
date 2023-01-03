import { BasePage } from "./base.page";
import { test, expect, Page, Locator } from "@playwright/test";

export class CheckOutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly cardNumber: Locator;
  readonly goToCheckOutButton: Locator;
  readonly progressBar: Locator;
  constructor(page: Page) {
    super(page);
    (this.firstName = page.locator("[name=firstName]")),
      (this.lastName = page.locator("[name=lastName]")),
      (this.cardNumber = page.locator("[name=cardNumber]")),
      (this.goToCheckOutButton = page.locator(
        '//button[contains(text(),"Purchase")]'
      )),
      (this.progressBar = page.locator("[role='progressbar']"));
  }
  async completeFirstName(name) {
    await this.firstName.fill(name);
  }
  async completeLastName(name) {
    await this.lastName.fill(name);
  }
  async completeCreditCardNumber(number:number) {
    let cardNumber = number.toString();
    await this.cardNumber.fill(cardNumber);
  }
  async clickOnPurchase() {
    await this.goToCheckOutButton.click();
    await this.esperaBarraDeCarga();
  }
  async esperaBarraDeCarga() {
    await expect(this.progressBar).not.toBeVisible({ timeout: 15000 });
  }
}
