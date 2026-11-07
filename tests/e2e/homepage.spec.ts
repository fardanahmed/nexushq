import { test, expect } from '@playwright/test';

test.describe('Homepage E2E', () => {
  test('should load without errors and render main sections', async ({
    page,
  }) => {
    // 1. Visit the homepage
    await page.goto('/');

    // 2. Verify title
    await expect(page).toHaveTitle(/NexusHQ/);

    // 3. Verify Hero section loads
    await expect(
      page.locator('h1').filter({ hasText: 'Operating System' })
    ).toBeVisible();

    // 4. Verify TrustBar is visible (use first to avoid strict mode error due to marquee loop)
    await expect(
      page.locator('span.font-heading').filter({ hasText: 'Stripe' }).first()
    ).toBeVisible();

    // 5. Verify HowItWorks section renders
    await expect(
      page.locator('h2').filter({ hasText: /coaching business/i })
    ).toBeVisible();

    // 6. Verify Join Team section waitlist form renders
    await expect(
      page.locator('h2').filter({ hasText: 'Ready to Level Up' })
    ).toBeVisible();
    await expect(
      page.locator('button', { hasText: 'Request Early Access' })
    ).toBeVisible();
  });

  test('pricing page should load and render VIP offer section', async ({
    page,
  }) => {
    await page.goto('/pricing');
    await expect(
      page.locator('h1').filter({ hasText: 'transparent' })
    ).toBeVisible();
    await expect(
      page.locator('h2').filter({ hasText: /Your Unfair Advantage/i })
    ).toBeVisible();
  });

  test('waitlist form should submit successfully', async ({ page }) => {
    await page.route('**/api/waitlist', (route) =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ok' }),
      })
    );
    await page.goto('/');

    // Wait for Astro island hydration
    await page.waitForLoadState('networkidle');

    // Fill the waitlist form
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="location"]', 'Tech Coaching');

    // Click submit
    await page.click('button:has-text("Request Early Access")');

    // Verify success state appears (the API route is mocked)
    await expect(page.getByText("You're on the list!")).toBeVisible({
      timeout: 5000,
    });
  });
});
