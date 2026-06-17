/**
 * OG image generator — runs at prebuild.
 * Produces 1200×630 PNGs in public/og/ for every configured page.
 *
 * Design: brand-primary background (#0E1E2B), accent stripe (#FF6A00),
 * "FOCUSSAN" wordmark top-left, eyebrow + title bottom-left.
 *
 * Inter Variable .woff2 is loaded from public/fonts/. Satori v0.26+
 * handles woff2 natively.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OG_DIR = path.join(PUBLIC_DIR, 'og');
const FONT_DIR = path.join(ROOT, 'node_modules', '@fontsource', 'inter', 'files');
const FONT_400 = path.join(FONT_DIR, 'inter-latin-400-normal.woff');
const FONT_700 = path.join(FONT_DIR, 'inter-latin-700-normal.woff');
const FONT_800 = path.join(FONT_DIR, 'inter-latin-800-normal.woff');

const PAGES = [
  {
    slug: 'default',
    eyebrow: 'FOCUSSAN',
    title: 'Endüstriyel Toz Boya · VESA TV Askı · Fason Montaj',
  },
  { slug: 'hakkimizda', eyebrow: 'HAKKIMIZDA', title: 'Focussan Metal Sanayi · Arnavutköy DESB OSB' },
  { slug: 'about', eyebrow: 'ABOUT', title: 'Focussan Metal Manufacturing · Istanbul DESB OSB' },
  { slug: 'hizmetler', eyebrow: 'HİZMETLER', title: '3 Hizmet Kolu · Toz Boya, TV Askı, Fason Montaj' },
  { slug: 'services', eyebrow: 'SERVICES', title: 'Three Lines · Powder Coating, TV Mounts, Assembly' },
  { slug: 'statik-toz-boya', eyebrow: 'STATİK TOZ BOYA', title: '8 metreye kadar parça · RAL palet · 2-5 gün' },
  { slug: 'powder-coating', eyebrow: 'POWDER COATING', title: 'Up to 8 metres · Full RAL · 2-5 day turnaround' },
  { slug: 'tv-aski-aparati', eyebrow: 'VESA TV ASKI APARATI', title: 'Galvaniz çelik · Matt siyah · 4 ürün ailesi' },
  { slug: 'tv-mounts', eyebrow: 'VESA TV MOUNTS', title: 'Galvanised steel · Matte black · 4 product families' },
  { slug: 'fason-montaj-hatti', eyebrow: 'FASON MONTAJ HATTI', title: 'Boya + montaj + paketleme · tek çatı altında' },
  { slug: 'contract-assembly', eyebrow: 'CONTRACT ASSEMBLY', title: 'Coating + assembly + packaging · one facility' },
  { slug: 'iletisim', eyebrow: 'İLETİŞİM', title: '0 212 873 07 34 · WhatsApp: +90 538 684 7373' },
  { slug: 'contact', eyebrow: 'CONTACT', title: '+90 212 873 07 34 · WhatsApp: +90 538 684 7373' },
  { slug: 'sss', eyebrow: 'SIKÇA SORULAN SORULAR', title: 'Toz boya, fiyatlandırma, teslim süresi' },
  { slug: 'faq', eyebrow: 'FREQUENTLY ASKED QUESTIONS', title: 'Powder coating, pricing, lead times' },
  { slug: 'galeri', eyebrow: 'GALERİ', title: 'Üretimden fotoğraflar ve videolar' },
  { slug: 'gallery', eyebrow: 'GALLERY', title: 'Photos and videos from our facility' },
];

function buildTree(eyebrow, title) {
  return {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0E1E2B',
        color: '#F7F4ED',
        padding: '64px',
        fontFamily: 'Inter',
        position: 'relative',
      },
      children: [
        // Accent stripe right edge
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '12px',
              backgroundColor: '#FF6A00',
            },
          },
        },
        // Top — wordmark
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color: '#F7F4ED',
            },
            children: 'FOCUSSAN',
          },
        },
        // Bottom — eyebrow + title
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '20px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: '#FF6A00',
                  },
                  children: eyebrow,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '60px',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    maxWidth: '1000px',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: '22px', color: '#B7BCC2', marginTop: '8px' },
                  children: 'focussan.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function generate() {
  const [font400, font700, font800] = await Promise.all([
    fs.readFile(FONT_400),
    fs.readFile(FONT_700),
    fs.readFile(FONT_800),
  ]);
  await fs.mkdir(OG_DIR, { recursive: true });

  for (const page of PAGES) {
    const svg = await satori(buildTree(page.eyebrow, page.title), {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: font400, weight: 400, style: 'normal' },
        { name: 'Inter', data: font700, weight: 700, style: 'normal' },
        { name: 'Inter', data: font800, weight: 800, style: 'normal' },
      ],
    });

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    const outPath = path.join(OG_DIR, `${page.slug}.png`);
    await fs.writeFile(outPath, png);
    console.log(`  ✓ og/${page.slug}.png (${(png.length / 1024).toFixed(1)} KB)`);
  }
  console.log(`Generated ${PAGES.length} OG images.`);
}

generate().catch((err) => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
