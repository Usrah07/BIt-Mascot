import { test, expect } from '@playwright/test';

test('User can login, add product to cart, verify it, and logout', async ({ page }) => {

  // Go to site
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForTimeout(2000);

  // Add first product to cart
  const productName = await page.locator('.inventory_item_name').first().innerText();
  await page.locator('.btn_inventory').first().click();
  await page.waitForTimeout(2000);

  // Go to cart
  await page.click('.shopping_cart_link');
  await page.waitForTimeout(2000);

  // Verify product name in cart
  const cartName = await page.locator('.inventory_item_name').innerText();
  expect(cartName).toBe(productName);
  
  // Logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await page.waitForTimeout(2000);
});