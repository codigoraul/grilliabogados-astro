import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://www.grilliabogados.cl',
  base: '/',
  vite: {
    cacheDir: '/tmp/vite-grilli-cache'
  }
});
