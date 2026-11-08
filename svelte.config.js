import vercel from "@sveltejs/adapter-vercel";
import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: process.env.FIREBASE_HOSTING === "true" ? staticAdapter() : vercel(),
    alias: {
      $components: "src/lib/components",
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
