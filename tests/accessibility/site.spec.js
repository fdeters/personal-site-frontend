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

    for (const route of [
      '/',
      '/tools',
      '/tools/ranked-choice',
      '/design-refined',
    ]) {
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

    test('voting controls fit a narrow screen', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 });
      await gotoHydratedPage(page, '/tools/ranked-choice');
      const optionInput = page.getByRole('textbox', {
        name: 'New option name',
      });
      for (const name of ['Pizza', 'Tacos']) {
        await optionInput.fill(name);
        await page.getByRole('button', { name: 'Add option' }).click();
      }
      await page.getByRole('button', { name: 'Add ballot' }).click();
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth
        )
      ).toBe(true);
    });

    test('refined preview navigation and tool links work', async ({ page }) => {
      await gotoHydratedPage(page, '/design-refined');
      await page
        .getByRole('link', { name: 'Web development', exact: true })
        .click();
      await expect(page).toHaveURL(/#web-development$/);
      await page.getByRole('link', { name: 'Music', exact: true }).click();
      await expect(page).toHaveURL(/#music$/);
      await page.getByRole('link', { name: 'Tools', exact: true }).click();
      await expect(page).toHaveURL(/#tools$/);
      await page.getByRole('link', { name: /Ranked-choice voting/ }).click();
      await expect(page).toHaveURL(/\/tools\/ranked-choice$/);
      await expect(
        page.getByRole('heading', { name: 'Ranked Choice Voting' })
      ).toBeVisible();
    });

    test('refined preview jump links highlight their targets and support keyboard navigation', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoHydratedPage(page, '/design-refined');
      await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('link', { name: 'Skip to content' })
      ).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('#main-content')).toBeFocused();

      const musicLink = page.getByRole('link', { name: 'Music', exact: true });
      await musicLink.focus();
      await page.keyboard.press('Enter');
      const music = page.locator('#music');
      await expect(music).toBeFocused();
      await expect(page).toHaveURL(/#music$/);
      await expect(music).toHaveCSS('outline-style', 'solid');
      await expect(music).toHaveClass(/jump-highlight/);
      await expectNoAccessibilityViolations(page);

      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('link', { name: /Browse my sheet music/ })
      ).toBeFocused();
      await page.goBack();
      await expect(page).toHaveURL(/#main-content$/);
      await page.goForward();
      await expect(page).toHaveURL(/#music$/);
      await expect(music).toHaveClass(/jump-highlight/);

      await page.goto('/design-refined#tools');
      await expect(page.locator('#tools')).toHaveClass(/jump-highlight/);
      await expect(
        page.getByRole('link', { name: 'Find me on Instagram ↗' })
      ).toHaveAttribute('href', 'https://www.instagram.com/doctypeforrest');
    });

    test('jump highlighting clears and can be replayed', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoHydratedPage(page, '/design-refined');
      const link = page.getByRole('link', { name: 'Music', exact: true });
      const target = page.locator('#music');
      await link.click();
      await expect(target).toHaveClass(/jump-highlight/);
      await expect(target).not.toHaveClass(/jump-highlight/, { timeout: 5000 });
      await link.click();
      await expect(target).toHaveClass(/jump-highlight/);
      await expect(target).not.toHaveClass(/jump-highlight/, { timeout: 5000 });
    });

    test('theme follows the system and persists across routes and reloads', async ({
      page,
    }) => {
      await gotoHydratedPage(page, '/');
      const toggle = page.getByRole('button', { name: /Dark mode/ });
      const initial = colorScheme === 'dark' ? 'dark' : 'light';
      const next = initial === 'dark' ? 'light' : 'dark';
      await expect(page.locator('html')).toHaveAttribute('data-theme', initial);
      await toggle.click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', next);
      await expect(toggle).toHaveAttribute(
        'aria-pressed',
        String(next === 'dark')
      );
      await page.getByRole('link', { name: 'See all tools ↗' }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', next);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', next);
      await expectNoAccessibilityViolations(page);
      await page.getByRole('link', { name: /Ranked-choice voting/ }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', next);
      await expectNoAccessibilityViolations(page);
    });

    test('text links have visible hover, focus and active states', async ({
      page,
    }) => {
      await gotoHydratedPage(page, '/');
      const metro = page.getByRole('link', { name: 'Metro', exact: true });
      const getColors = () =>
        metro.evaluate((element) => {
          const style = getComputedStyle(element);
          return [style.color, style.backgroundColor];
        });
      const normal = await getColors();
      await metro.hover();
      const hovered = await getColors();
      expect(hovered).not.toEqual(normal);
      await expectNoAccessibilityViolations(page);
      await metro.focus();
      await expect(metro).toHaveCSS('outline-style', 'solid');
      await page.mouse.down();
      expect(await getColors()).not.toEqual(hovered);
      await expectNoAccessibilityViolations(page);
      await page.mouse.move(0, 0);
      await page.mouse.up();
    });

    test('refined preview uses smooth scrolling when motion is allowed', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await gotoHydratedPage(page, '/design-refined');
      await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
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
