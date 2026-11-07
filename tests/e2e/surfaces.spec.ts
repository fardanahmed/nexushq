import { test, expect } from '@playwright/test';

test.describe('Beta surfaces', () => {
  test('privacy page carries its paragraph', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('main h1')).toHaveText('Privacy');
    await expect(page.locator('main')).toContainText(
      'NexusHQ is in private beta. This page will carry the full privacy policy before launch.'
    );
  });

  test('terms page carries its paragraph', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('main h1')).toHaveText('Terms');
    await expect(page.locator('main')).toContainText(
      'NexusHQ is in private beta. This page will carry the full terms of service before launch.'
    );
  });

  test('waitlist form shows the success state against a mocked API', async ({
    page,
  }) => {
    let calls = 0;
    await page.route('**/api/waitlist', (route) => {
      calls += 1;
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ok' }),
      });
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button:has-text("Join the waitlist")');
    await expect(page.getByText('You are on the list.')).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText('test@example.com')).toBeVisible();
    expect(calls).toBe(1);
  });

  test('home shows the hero final frame on first paint under reduced motion', async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    // The intro keyframes collapse to 0.001s under the global reduced-motion rule, so the object is at its final frame at once.
    const state = await page.locator('.hero-object').evaluate((el) => {
      const cs = getComputedStyle(el);
      return { duration: cs.animationDuration, opacity: cs.opacity };
    });
    expect(state.duration).toBe('0.001s');
    expect(state.opacity).toBe('1');
    await expect(page.locator('.hero-object')).toBeVisible();
    await expect(page.locator('main h1')).toBeVisible();
    await context.close();
  });
});
