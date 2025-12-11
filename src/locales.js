// Centralized localization data for the Longshan amulet helper
// You can edit this file to provide translations for all supported languages.

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇹🇼' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

// UI text organized by language code.
// Currently most keys are filled with English text as a base.
// You can replace the values per language without touching React components.
export const translations = {
  en: {
    nav: {
      blessings: 'Blessings',
      souvenirs: 'Souvenirs',
      templeGuide: 'Temple Guide',
      about: 'About',
    },
    hero: {
      tagline: "Taiwan's Most Sacred Temple",
      primaryCta: 'Explore Blessings',
      secondaryCta: 'View Souvenirs',
      reading: 'Mengjia Longshan Temple',
      readingSegments: ['Meng', 'jia', 'Long', 'shan', 'Temple'],
    },
  },
  zh: {
    nav: {
      blessings: 'Blessings',
      souvenirs: 'Souvenirs',
      templeGuide: 'Temple Guide',
      about: 'About',
    },
    hero: {
      tagline: "Taiwan's Most Sacred Temple",
      primaryCta: 'Explore Blessings',
      secondaryCta: 'View Souvenirs',
      reading: '艋舺龍山寺 · Měngjiǎ Lóngshān Sì',
      readingSegments: ['Měng', 'jiǎ', 'Lóng', 'shān', 'sì'],
    },
  },
  th: {
    nav: {
      blessings: 'Blessings',
      souvenirs: 'Souvenirs',
      templeGuide: 'Temple Guide',
      about: 'About',
    },
    hero: {
      tagline: "Taiwan's Most Sacred Temple",
      primaryCta: 'Explore Blessings',
      secondaryCta: 'View Souvenirs',
      reading: 'เหมิงเจีย หลงซานซื่อ',
      readingSegments: ['เหมิง', 'เจีย', 'หลง', 'ซาน', 'ซื่อ'],
    },
  },
  ja: {
    nav: {
      blessings: 'Blessings',
      souvenirs: 'Souvenirs',
      templeGuide: 'Temple Guide',
      about: 'About',
    },
    hero: {
      tagline: "Taiwan's Most Sacred Temple",
      primaryCta: 'Explore Blessings',
      secondaryCta: 'View Souvenirs',
      reading: 'メンジャー・ロンシャン スー',
      readingSegments: ['メン', 'ジャー', 'ロン', 'シャン', 'スー'],
    },
  },
  ko: {
    nav: {
      blessings: 'Blessings',
      souvenirs: 'Souvenirs',
      templeGuide: 'Temple Guide',
      about: 'About',
    },
    hero: {
      tagline: "Taiwan's Most Sacred Temple",
      primaryCta: 'Explore Blessings',
      secondaryCta: 'View Souvenirs',
      reading: '멍자 룽산 스',
      readingSegments: ['멍', '자', '룽', '산', '스'],
    },
  },
};

export const getTranslation = (langCode) => {
  return translations[langCode] || translations.en;
};
