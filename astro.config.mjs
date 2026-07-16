import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://carer.edu.pk',
  integrations: [react(), sitemap()],
  output: 'static',
  adapter: vercel(),
});
