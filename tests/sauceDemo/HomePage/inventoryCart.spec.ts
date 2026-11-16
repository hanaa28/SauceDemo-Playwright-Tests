import { test, expect } from '@playwright/test';
import { login, cartBadge, BASE } from '../helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('add one item changes button to Remove and badge shows 1', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
  await expect(cartBadge(page)).toHaveText('1');
});

test('add multiple items updates badge count', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
  await expect(cartBadge(page)).toHaveText('3');
});

test('remove item decrements badge and hides it at 0', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await expect(cartBadge(page)).toHaveText('2');
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await expect(cartBadge(page)).toHaveText('1');
  await page.click('[data-test="remove-sauce-labs-bike-light"]');
  await expect(cartBadge(page)).toHaveCount(0);
  await expect (cartBadge(page)).toBeHidden();
});


