import { test, expect, request, chromium } from "@playwright/test";
import * as loginData from "../fixtures/loginFixtures.json";
import * as productData from "../fixtures/products.json";
import * as fs from "fs";

import { HomePage } from "../support/Pages/homePage";
import { CheckOutPage } from "../support/Pages/checkoutPage";
import { ProductsPage } from "../support/Pages/productsPage";
import { PurchaseModal } from "../support/Pages/purchaseModal";
import { ShoppingCart } from "../support/Pages/shoppingCart";

test.describe("Pre Entrega", () => {
  test.beforeEach(async ({ request, page }) => {
    const reqRegister = await request.post(
      `https://pushing-it.onrender.com/api/register`,
      {
        data: {
          username: loginData.usuario,
          password: loginData.password,
          gender: loginData.gender,
          day: loginData.day,
          month: loginData.month,
          year: loginData.year,
        },
      }
    );
    // await expect(reqRegister).toBeOK();

    const otrafuncion1 = await reqRegister.json();

    const reqLogin = await request.post(
      `https://pushing-it.onrender.com/api/login`,
      {
        data: {
          username: loginData.usuario,
          password: loginData.password,
        },
      }
    );
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await page.goto("/");
    const otrafuncion = await reqLogin.json();
    await page.evaluate((otrafuncion) => {
      window.localStorage.setItem("token", otrafuncion.token);
    }, otrafuncion);

    await page.evaluate((otrafuncion) => {
      window.localStorage.setItem("user", otrafuncion.user.username);
    }, otrafuncion);

    await page.goto("/");
    //await browser.close();
  });
  test("homepage has title and links to intro page", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductsPage(page);
    const shoppingCart = new ShoppingCart(page);
    const checkOutPage = new CheckOutPage(page);
    const purchaseModal = new PurchaseModal(page);
    // await page.waitForTimeout(5000);
    await homePage.clickOnlineShop();
    await productPage.checkUrl();
    await productPage.clickOnAddToCart(
      productData.PrimerProducto.nombre,
      productData.PrimerProducto.precio
    );
    await productPage.clickOnAddToCart(
      productData.SegundoProducto.nombre,
      productData.SegundoProducto.precio
    );
    await productPage.clickOnGoToShoppingCart();
    await shoppingCart.verificarNombreProducto(
      productData.PrimerProducto.nombre
    );
    await shoppingCart.verificarNombreProducto(
      productData.SegundoProducto.nombre
    );
    await shoppingCart.verificarPrecioProducto(
      productData.PrimerProducto.nombre,
      productData.PrimerProducto.precio
    );
    await shoppingCart.verificarPrecioProducto(
      productData.SegundoProducto.nombre,
      productData.SegundoProducto.precio
    );
    await shoppingCart.verificarPrecioTotal(
      `${
        productData.PrimerProducto.precio + productData.SegundoProducto.precio
      }`
    );
    await shoppingCart.goToCheckoutPage();
    await checkOutPage.completeFirstName(loginData.nombre);
    await checkOutPage.completeLastName(loginData.apellido);
    await checkOutPage.completeCreditCardNumber(loginData.creditCardNumber);
    await checkOutPage.clickOnPurchase();
    await purchaseModal.verificarNombre(loginData.nombre, loginData.apellido);
    await purchaseModal.verificaProducto(productData.PrimerProducto.nombre);
    await purchaseModal.verificaProducto(productData.SegundoProducto.nombre);
    await purchaseModal.verificarCreditCard(loginData.creditCardNumber);
    await purchaseModal.verificarPrecioTotal(
      `${
        productData.PrimerProducto.precio + productData.SegundoProducto.precio
      }`
    );
  });

  test.afterEach(async ({ request }) => {
    const deleteReq = await request.delete(
      `https://pushing-it.onrender.com/api/deleteuser/${loginData.usuario.toLowerCase()}`
    );
  });
});
