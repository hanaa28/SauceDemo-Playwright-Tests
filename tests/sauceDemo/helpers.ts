import { expect, Page } from '@playwright/test';

export const BASE = 'https://www.saucedemo.com';

export async function login(page: Page, username = 'standard_user') {
  await page.goto(`${BASE}/`);
  await page.fill('#user-name', username);
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(`${BASE}/inventory.html`);
}
// Get the cart badge element
export const cartBadge = (page: Page) => page.getByTestId('shopping-cart-badge');
