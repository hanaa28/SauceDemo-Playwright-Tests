import { test, expect } from '@playwright/test';
import { login, cartBadge, BASE } from './helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('burger menu shows all links', async ({ page }) => {
  await page.click('#react-burger-menu-btn');// Click the burger menu button
  await expect(page.getByTestId('inventory-sidebar-link')).toBeVisible();
  await expect(page.getByTestId('about-sidebar-link')).toBeVisible();
  await expect(page.getByTestId('logout-sidebar-link')).toBeVisible();
  await expect(page.getByTestId('reset-sidebar-link')).toBeVisible();
});

test('logout returns to login and blocks inventory', async ({ page }) => {
  await page.click('#react-burger-menu-btn');
  await page.click('[data-test="logout-sidebar-link"]');
  await expect(page).toHaveURL(`${BASE}/`);
});

test('Reset App State clears cart badge', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');// Click the add to cart button for the first item
  await expect(cartBadge(page)).toHaveText('1');// Expect the cart badge to show 1 item
  await page.click('#react-burger-menu-btn');
  await page.click('[data-test="reset-sidebar-link"]');
  await expect(cartBadge(page)).toHaveCount(0);
});

test('About links to saucelabs.com', async ({ page }) => {
  await page.click('#react-burger-menu-btn');
  await page.click('[data-test="about-sidebar-link"]');
  await expect(page).toHaveURL('https://saucelabs.com/');
});

test('close button hides the menu', async ({ page }) => {
  await page.click('#react-burger-menu-btn');
  await expect(page.getByTestId('logout-sidebar-link')).toBeVisible();
  await page.click('#react-burger-cross-btn');
  await expect(page.getByTestId('logout-sidebar-link')).toBeHidden();
});
