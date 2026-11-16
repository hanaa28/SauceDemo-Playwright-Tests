import { test, expect, Page } from '@playwright/test';
import { login } from '../helpers';

// Locator for the sort dropdown
const SORT = '[data-test="product-sort-container"]';

// Return all product names in the order they appear on the page
async function getNames(page: Page) {
  return page.locator('[data-test="inventory-item-name"]').allTextContents();
}

// Return all product prices in page order
async function getPrices(page: Page) {
  const texts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  return texts.map(t => parseFloat(t.replace('$', '')));
}

// Before each test: log in as standard_user and land on the inventory page
test.beforeEach(async ({ page }) => {
  await login(page);
});

test('default sort is Name (A to Z)', async ({ page }) => {
  await expect(page.locator(SORT)).toHaveValue('az');
  const names = await getNames(page);
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
});

test('sort Name (Z to A)', async ({ page }) => {
  await page.selectOption(SORT, 'za');
  const names = await getNames(page);
  expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
});

test('sort Price (low to high)', async ({ page }) => {
  await page.selectOption(SORT, 'lohi');
  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

// Pick high to low and check prices go from most expensive to cheapest
test('sort Price (high to low)', async ({ page }) => {
  await page.selectOption(SORT, 'hilo');
  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});
