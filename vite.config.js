import vercel from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

const config = {
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: vercel(),
      preprocess: vitePreprocess(),
    }),
    Icons({
      compiler: 'svelte',
    }),
  ],
};

export default config;
