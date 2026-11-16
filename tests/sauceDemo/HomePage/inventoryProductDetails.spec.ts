import { test, expect } from '@playwright/test';
import { login, BASE } from '../helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('clicking item name opens details with same name and price', async ({ page }) => {
  const first = page.locator('[data-test="inventory-item"]').first();// Get the first item
  const name = await first.locator('[data-test="inventory-item-name"]').textContent();// Get the name of the first item
  const price = await first.locator('[data-test="inventory-item-price"]').textContent();// Get the price of the first item
  await first.locator('[data-test="inventory-item-name"]').click();// Click the name of the first item
  await expect(page).toHaveURL(`${BASE}/inventory-item.html?id=4`); // Expect the URL to match the item details page
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(name!);// Expect the name of the item to match the name of the first item
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(price!);// Expect the price of the item to match the price of the first item
});

test('clicking item image opens details page', async ({ page }) => {
  const first = page.locator('[data-test="inventory-item"]').first();
  const name = await first.locator('[data-test="inventory-item-name"]').textContent();
  await first.locator('img.inventory_item_img').click();
  await expect(page).toHaveURL(`${BASE}/inventory-item.html?id=4`);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(name!);
});

test('Back to products returns to inventory', async ({ page }) => {
  await page.locator('[data-test="inventory-item-name"]').first().click();
  await page.click('[data-test="back-to-products"]');
  await expect(page).toHaveURL(`${BASE}/inventory.html`);
});
