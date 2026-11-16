import { test, expect } from '@playwright/test';
import { login } from './helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('footer social links have correct hrefs', async ({ page }) => {
  const footer = page.locator('footer');// Get the footer element
  await expect(footer.getByRole('link', { name: 'X', exact: true })).toHaveAttribute('href', 'https://x.com/saucelabs');
  await expect(footer.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
  await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
});

test('footer copyright mentions Sauce Labs', async ({ page }) => {
  await expect(page.locator('[data-test="footer-copy"]')).toHaveText('© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
});
