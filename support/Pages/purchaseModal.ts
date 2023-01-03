import { BasePage } from "./base.page";
import { expect, Page, Locator } from "@playwright/test";

export class PurchaseModal extends BasePage {
  readonly creditCard: Locator;
  readonly name: Locator;
  readonly totalPrice: Locator;
  constructor(page: Page) {
    super(page);
    this.name = page.locator('//p[@id="name"]');
    this.creditCard = page.locator('//p[@id="creditCard"]');
    this.totalPrice = page.locator('//p[@id="totalPrice"]');
  }
  async verificarNombre(nombre, apellido) {
    await expect(this.name).toHaveText(
      `${nombre} ${apellido} has succesfully purchased the following items`
    );
  }
  async verificaProducto(producto) {
    let productoLocator = await this.page.locator(`//p[@id="${producto}"]`);
    await expect(productoLocator).toHaveCount(1);
  }
  async verificarCreditCard(creditCard) {
    await expect(this.creditCard).toHaveText(`${creditCard}`);
  }
  async verificarPrecioTotal(precioTotal) {
    await expect(this.totalPrice).toHaveText(`You have spent $${precioTotal}`);
  }
}
