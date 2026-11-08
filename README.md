# personal-site-frontend

My personal site frontend. Built with SvelteKit + Vite.
Topic links are stored in `src/lib/data/topics.json`. Tailwind CSS for styling,
and Prettier for code formatting.

## Design exploration

Visit `/design-previews` to compare four proposed homepage directions. These
are standalone concepts, not changes to the existing homepage or tools; their
tool links lead to the current working tools. The refined direction, informed
by feedback on the first two concepts, is available at `/design-refined`.

The refined preview uses `src/lib/styles/in-page-navigation.css` for native
anchor scrolling and target highlighting. Add `jump-navigation` to a page
wrapper and `jump-target` to focusable anchor targets to reuse it; smooth
scrolling is disabled when reduced motion is requested.

## To Do

- [x] Make it easier to tap on external links on mobile (buttons are very small right now)

## Developing

Use the `develop` branch for development, since `main` is set up in CI with the live site.

Name new feature branches like this: `feature/<name>`. For example, `feature/dark-mode`.

## Building

Use Node.js 26 and pnpm 12.18.0 (the version specified by `packageManager`).
To install dependencies and create a production version of the app:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm format:check
pnpm build
```

You can preview the production build with `pnpm preview`.

The default build uses `@sveltejs/adapter-vercel`. Vercel selects Node.js 26
from the `engines.node` setting in `package.json` and uses the pinned pnpm
version from the install command in `vercel.json` (keep it in sync with
`packageManager`).

## Testing

Run the formatting and unit test checks with `pnpm lint` and `pnpm test`.
For browser-based accessibility checks,
install Chromium once with `pnpm exec playwright install chromium`, then run
`pnpm test:a11y`. The accessibility suite starts its own local server and scans
each route and the ranked-choice voting flow in both light and dark modes.
These automated checks do not replace manual accessibility testing.

Copilot cloud-agent sessions install the same Node.js and pnpm versions using
`.github/workflows/copilot-setup-steps.yml`.
