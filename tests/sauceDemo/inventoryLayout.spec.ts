import { test, expect } from '@playwright/test';
import { login, cartBadge } from './helpers';

// Before each test: log in as standard_user and land on the inventory page
test.beforeEach(async ({ page }) => {
  await login(page);
});

// Check the page header shows "Products"
test('shows Products title', async ({ page }) => {
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

// Check exactly 6 products are listed
test('shows 6 inventory items', async ({ page }) => {
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
});

// Loop over every product and check it has a name, description, price, image and "Add to cart" button
test('each item has name, description, price, image and add button', async ({ page }) => {
  const items = page.locator('[data-test="inventory-item"]');
  const count = await items.count();
  for (let i = 0; i < count; i++) {
    const item = items.nth(i);
    await expect(item.locator('[data-test="inventory-item-name"]')).not.toBeEmpty();
    await expect(item.locator('[data-test="inventory-item-desc"]')).not.toBeEmpty();
    await expect(item.locator('[data-test="inventory-item-price"]')).toHaveText(/^\$\d+\.\d{2}$/);
    await expect(item.locator('img.inventory_item_img')).toBeVisible();
    await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  }
});

