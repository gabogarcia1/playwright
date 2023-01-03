import { test, expect, Page } from "@playwright/test";

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(`/`);
  }
}