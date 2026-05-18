import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

/**
 * Bilingual sitemap with hreflang xhtml:link alternates.
 * Each TR↔EN pair is emitted twice (once per locale), each entry listing both alternates.
 */

const PAGE_PAIRS: Array<{ tr: string; en: string; priority: string }> = [
  { tr: '/', en: '/en', priority: '1.0' },
  { tr: '/hakkimizda', en: '/en/about', priority: '0.8' },
  { tr: '/hizmetler', en: '/en/services', priority: '0.9' },
  { tr: '/hizmetler/statik-toz-boya', en: '/en/services/powder-coating', priority: '0.9' },
  { tr: '/hizmetler/tv-aski-aparati', en: '/en/services/tv-mounts', priority: '0.9' },
  { tr: '/hizmetler/fason-montaj-hatti', en: '/en/services/contract-assembly', priority: '0.9' },
  { tr: '/iletisim', en: '/en/contact', priority: '0.8' },
  { tr: '/sss', en: '/en/faq', priority: '0.6' },
  { tr: '/gizlilik', en: '/en/privacy', priority: '0.3' },
  { tr: '/cerezler', en: '/en/cookies', priority: '0.3' },
];

function buildUrl(loc: string, alts: { tr: string; en: string }, lastmod: string, priority: string) {
  const trUrl = `${SITE.domain}${alts.tr === '/' ? '' : alts.tr}`;
  const enUrl = `${SITE.domain}${alts.en}`;
  return `  <url>
    <loc>${SITE.domain}${loc === '/' ? '' : loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${trUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${trUrl}"/>
  </url>`;
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries: string[] = [];
  for (const pair of PAGE_PAIRS) {
    entries.push(buildUrl(pair.tr, pair, lastmod, pair.priority));
    entries.push(buildUrl(pair.en, pair, lastmod, pair.priority));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
