import { test,expect } from '@playwright/test';
test('valid Login to SauceDemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
});
test('wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
test('wrong username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
test('empty Login to SauceDemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});
test('missing password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});
test('missing username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});
test('locked out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
test('inventory page requires login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});
