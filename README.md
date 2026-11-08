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

Install dependencies with pnpm (the version is pinned in `package.json`):

```bash
pnpm install --frozen-lockfile
```

To create and preview a production build:

```bash
pnpm run build
pnpm run preview
```

This app uses the `@sveltejs/adapter-static` for hosting. Static files are generated and hosted in CI with GitHub Actions to deploy to the live site.
