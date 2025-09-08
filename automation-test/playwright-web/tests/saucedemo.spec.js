// tests/saucedemo.spec.js
const { test, expect } = require('@playwright/test');

test('SauceDemo E2E Flow', async ({ page }) => {
  console.log('Starting SauceDemo E2E Test');

  // 1. Login
  console.log('Step 1: Login');
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory/);
  console.log('Login URL check passed');
  await expect(page.locator('.title')).toHaveText('Products');
  console.log('Login Products title check passed');

  // 2. Add single product
  console.log('Step 2: Add single product');
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  console.log('Cart badge shows 1');
  await expect(page.locator('button[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  console.log('Remove button visible');

  // 3. Remove single product
  console.log('Step 3: Remove single product');
  await page.click('button[data-test="remove-sauce-labs-backpack"]');

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  console.log('Cart badge removed');
  await expect(page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  console.log('Add to cart button back');

  // 4. Add multiple products
  console.log('Step 4: Add multiple products');
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  console.log('Cart badge shows 3');
  await expect(page.locator('button[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  console.log('Remove button visible for bike light');

  // 5. Remove multiple products
  console.log('Step 5: Remove multiple products');
  await page.click('button[data-test="remove-sauce-labs-bike-light"]');
  await page.click('button[data-test="remove-sauce-labs-bolt-t-shirt"]');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  console.log('Cart badge reduced to 1');
  await expect(page.locator('button[data-test="remove-sauce-labs-fleece-jacket"]')).toBeVisible();
  console.log('Fleece jacket still in cart');

  // 6. Remove all
  console.log('Step 6: Remove all products');
  await page.click('button[data-test="remove-sauce-labs-fleece-jacket"]');

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  console.log('Cart is empty');
  await expect(page.locator('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]')).toBeVisible();
  console.log('Add to cart button visible again');

  // 7. Checkout
  console.log('Step 7: Checkout flow');
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('button[data-test="checkout"]');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('input[data-test="continue"]');
  await page.click('button[data-test="finish"]');

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  console.log('Order completed message shown');
  await expect(page).toHaveURL(/checkout-complete/);
  console.log('Redirected to checkout complete page');

  // 8. Logout
  console.log('Step 8: Logout');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  console.log('Back to login page');
  await expect(page.locator('#login-button')).toBeVisible();
  console.log('Login button visible again');

  console.log('All E2E steps passed');
});
