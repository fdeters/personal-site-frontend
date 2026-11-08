import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

async function expectNoAccessibilityViolations(page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}

async function gotoHydratedPage(page, route) {
  await page.goto(route);
  await page.locator('#svelte-announcer').waitFor({ state: 'attached' });
}

for (const colorScheme of ['light', 'dark']) {
  test.describe(`${colorScheme} mode`, () => {
    test.use({ colorScheme });

    for (const route of ['/', '/tools', '/tools/ranked-choice']) {
      test(`${route} has no detectable accessibility violations`, async ({
        page,
      }) => {
        await gotoHydratedPage(page, route);
        await expectNoAccessibilityViolations(page);
      });
    }

    test('a completed ranked-choice ballot and history are accessible', async ({
      page,
    }) => {
      await gotoHydratedPage(page, '/tools/ranked-choice');
      const optionInput = page.getByRole('textbox', {
        name: 'New option name',
      });
      for (const name of ['Pizza', 'Tacos']) {
        await optionInput.fill(name);
        await page.getByRole('button', { name: 'Add option' }).click();
      }
      await page.getByRole('button', { name: 'Add ballot' }).click();
      await page.getByRole('combobox', { name: '#1' }).selectOption('Pizza');
      await page.getByRole('button', { name: 'Tally votes' }).click();
      await expect(
        page.getByRole('heading', { name: 'Results' })
      ).toBeVisible();
      await page.getByRole('button', { name: /Show election history/ }).click();
      await expect(page.getByText('Options: Pizza, Tacos')).toBeVisible();
      await expectNoAccessibilityViolations(page);
    });

    test('each design preview is accessible and links to the voting tool', async ({
      page,
    }) => {
      await gotoHydratedPage(page, '/design-previews');
      for (const name of [
        'The Personal Index',
        'The Creative Studio',
        'The Field Notes',
        'The Digital Commons',
      ]) {
        const button = page.getByRole('button', { name: new RegExp(name) });
        await button.click();
        await expect(button).toHaveAttribute('aria-pressed', 'true');
        await expect(
          page.locator('.concept a[href="/tools/ranked-choice"]')
        ).toBeVisible();
        await expectNoAccessibilityViolations(page);
      }
    });
  });
}
