import { BasePage } from "./base.page";
import { test, expect, Page, Locator } from "@playwright/test";

export class ProductsPage extends BasePage {
  readonly url: string;
  readonly closeAddToCartButton: Locator;
  readonly goToShoppingCartButton: Locator;
  constructor(page: Page) {
    super(page);
    this.url = "home/onlineshop";
    this.closeAddToCartButton = page.locator(
      '//button[contains(text(),"Close")]'
    );
    this.goToShoppingCartButton = page.locator(
      '//button[text()="Go to shopping cart"]'
    );
  }
  async checkUrl() {
    await expect(this.page).toHaveURL(this.url);
  }
  async clickOnAddToCart(product, precio) {
    await this.page
      .locator(
        `//button[text()='Add to cart' and @name=${precio} and @value="${product}"]`
      )
      .click();
    await this.closeAddToCartButton.click();
  }
  async clickOnGoToShoppingCart() {
    await this.goToShoppingCartButton.click();
  }
}
