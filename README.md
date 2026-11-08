# personal-site-frontend

My personal site frontend. Built with SvelteKit + Vite and integrated with Firebase.
Tailwind CSS for styling, and Prettier for code formatiing.

## To Do

- [x] Make it easier to tap on external links on mobile (buttons are very small right now)
- [x] Add a "clicks" attribute to each external link in the database, and increment every time someone uses the link
- [ ] Fix database clicks attribute not incrementing past 1

## Developing

Use the `develop` branch for development, since `main` is set up in CI with the live site.

Name new feature branches like this: `feature/<name>`. For example, `feature/dark-mode`.

## Building

Use Node.js 26 and pnpm 10.34.9 (the version specified by `packageManager`).
To install dependencies and create a production version of the app:

```bash
pnpm install --frozen-lockfile
pnpm build
```

You can preview the production build with `pnpm preview`.

The default build uses `@sveltejs/adapter-vercel`. Vercel selects Node.js 26
from the `engines.node` setting in `package.json` and uses the pinned pnpm
version from the install command in `vercel.json` (keep it in sync with
`packageManager`). The Firebase Hosting GitHub
Action remains in place until cutover and sets `FIREBASE_HOSTING=true` to build
with `@sveltejs/adapter-static` instead.
