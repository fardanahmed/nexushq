import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// axe-core on every public page. Serious and critical findings fail; moderate and minor are reported in the test output.
const pages = ['/', '/features', '/pricing', '/contact', '/privacy', '/terms'];

for (const path of pages) {
  test(`axe: ${path} has no serious or critical violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .exclude('astro-dev-toolbar')
      .analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    const lesser = results.violations.filter((v) => !blocking.includes(v));
    if (lesser.length > 0) {
      console.log(
        `[axe ${path}] lesser findings: ${lesser.map((v) => `${v.impact} ${v.id} (${v.nodes.length})`).join(', ')}`
      );
    }
    expect(
      blocking.map(
        (v) =>
          `${v.impact} ${v.id}: ${v.help} at ${v.nodes.map((n) => n.target.join(' ')).join('; ')}`
      )
    ).toEqual([]);
  });
}
