import { BasePage } from "./base.page";
import { expect, Page, Locator } from "@playwright/test";

export class ShoppingCart extends BasePage {
  readonly showTotalPrice: Locator;
  readonly goToCheckOutButton: Locator;
  readonly price: Locator;
  constructor(page: Page) {
    super(page);
    (this.showTotalPrice = page.locator(
      '//button[contains(text(),"Show total price")]'
    )),
      (this.goToCheckOutButton = page.locator(
        '//button[contains(text(),"Go to Checkout")]'
      )),
      (this.price = page.locator("#price"));
  }

  async verificarNombreProducto(nombre) {
    let productName = this.page.locator(
      `//p[@id="productName" and @name="${nombre}"]`
    );
    await expect(productName).toHaveCount(1);
    await expect(productName).toHaveText(`${nombre}`);
  }
  async verificarPrecioProducto(nombre, precio) {
    let productName = this.page.locator(
      `//p[@id="productName" and @name="${nombre}"]//following-sibling::p`
    );
    await expect(productName).toHaveText(`$${precio}`);
  }
  async verificarPrecioTotal(precio) {
    await this.showTotalPrice.click();
    await expect(this.price).toHaveText(`${precio}`);
  }
  async goToCheckoutPage() {
    await this.goToCheckOutButton.click();
  }
}
