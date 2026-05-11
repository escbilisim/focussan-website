// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://focussan.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
