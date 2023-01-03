import { BasePage } from "./base.page";
import {  Page, Locator } from "@playwright/test";

export class HomePage extends BasePage {
  readonly todolistlink: Locator;
  readonly waislink: Locator;
  readonly alertslink: Locator;
  readonly formUtilsLink: Locator;
  readonly onlineshoplink: Locator;
  readonly fileuploadlink: Locator;
  constructor(page: Page) {
    super(page);
    this.todolistlink = page.locator("#todolistlink");
    this.waislink = page.locator("#waitslink");
    this.alertslink = page.locator("#waitslink");
    this.formUtilsLink = page.locator("#formutilslink");
    this.onlineshoplink = page.locator("#onlineshoplink");
    this.fileuploadlink = page.locator("#fileuploadlink");
  }

  async clickTodoListLink() {
    await this.todolistlink.click();
  }
  async clickOnlineShop() {
    await this.onlineshoplink.click();
  }
}
