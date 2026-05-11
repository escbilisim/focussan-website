/**
 * Focussan — Site geneli sabitler.
 * docs/Brainstorm.md ve docs/Knowledge_DB.md ile senkron tutulur.
 */

export const SITE = {
  domain: 'https://focussan.com',
  brandName: 'Focussan',
  legalName: 'Focussan Metal Sanayi Ticaret A.Ş.',
  defaultLocale: 'tr' as const,
  locales: ['tr', 'en'] as const,
} as const;

export const CONTACT = {
  phone: '+90 212 873 07 34',
  phoneHref: 'tel:+902128730734',
  whatsapp: '+90 538 684 7373',
  whatsappHref: 'https://wa.me/905386847373',
  email: 'muhasebe@focussan.com',
  address: {
    line1: 'DESB OSB Deliklikaya Mah.',
    line2: 'GünAlan Caddesi No: 23/1',
    district: 'Arnavutköy / İstanbul',
  },
} as const;

export type Locale = (typeof SITE.locales)[number];

export const T = {
  tr: {
    nav: {
      home: 'Anasayfa',
      about: 'Hakkımızda',
      services: 'Hizmetlerimiz',
      powderCoating: 'Statik Toz Boya',
      tvMounts: 'TV Askı Aparatı',
      assembly: 'Fason Montaj Hattı',
      faq: 'SSS',
      contact: 'İletişim',
    },
    cta: {
      getQuote: 'Teklif Al',
      whatsapp: 'WhatsApp',
    },
    footer: {
      tagline: 'Endüstriyel Toz Boya ve Metal Çözümleri',
      copyright: 'Tüm hakları saklıdır.',
      quickLinks: 'Hızlı Erişim',
      contactTitle: 'İletişim',
      legalTitle: 'Hukuki',
      privacy: 'Gizlilik',
      cookies: 'Çerezler',
    },
    skipLink: 'Ana içeriğe geç',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      powderCoating: 'Powder Coating',
      tvMounts: 'TV Mounts',
      assembly: 'Contract Assembly',
      faq: 'FAQ',
      contact: 'Contact',
    },
    cta: {
      getQuote: 'Get a Quote',
      whatsapp: 'WhatsApp',
    },
    footer: {
      tagline: 'Industrial Powder Coating & Metal Solutions',
      copyright: 'All rights reserved.',
      quickLinks: 'Quick Links',
      contactTitle: 'Contact',
      legalTitle: 'Legal',
      privacy: 'Privacy',
      cookies: 'Cookies',
    },
    skipLink: 'Skip to main content',
  },
} as const;

export function getRoutes(locale: Locale) {
  if (locale === 'en') {
    return {
      home: '/en',
      about: '/en/about',
      services: '/en/services',
      powderCoating: '/en/services/powder-coating',
      tvMounts: '/en/services/tv-mounts',
      assembly: '/en/services/contract-assembly',
      faq: '/en/faq',
      contact: '/en/contact',
      privacy: '/en/privacy',
      cookies: '/en/cookies',
      altLocale: 'tr' as const,
      altHome: '/',
    };
  }
  return {
    home: '/',
    about: '/hakkimizda',
    services: '/hizmetler',
    powderCoating: '/hizmetler/statik-toz-boya',
    tvMounts: '/hizmetler/tv-aski-aparati',
    assembly: '/hizmetler/fason-montaj-hatti',
    faq: '/sss',
    contact: '/iletisim',
    privacy: '/gizlilik',
    cookies: '/cerezler',
    altLocale: 'en' as const,
    altHome: '/en',
  };
}
