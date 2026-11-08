# personal-site-frontend

My personal site frontend. Built with SvelteKit + Vite.
Topic links are stored in `src/lib/data/topics.json`. Tailwind CSS for styling,
and Prettier for code formatting.

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

Copilot cloud-agent sessions install the same Node.js and pnpm versions using
`.github/workflows/copilot-setup-steps.yml`.
