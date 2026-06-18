// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://focussan.com',
  trailingSlash: 'never',
  build: {
    // 'file' => /galeri.html (served at /galeri, no trailing-slash redirect on CF Pages).
    // Keeps canonical/sitemap/hreflang (all slash-less) consistent with the served 200 URL.
    format: 'file',
    // Inline all CSS into <style> to remove render-blocking stylesheet requests (faster FCP/LCP).
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
