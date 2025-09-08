import { formatter } from '@lingui/format-po'

const locales = ['en', 'nl', 'zh']

if (process.env.NODE_ENV !== 'production') {
  locales.push('pseudo')
}

const linguiConfig = {
  locales: locales,
  sourceLocale: 'en',
  pseudoLocale: 'pseudo',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: '<rootDir>/src/translations/locales/{locale}/messages',
      include: ['<rootDir>/src/'],
      exclude: ['**/node_modules/**', '**/__tests__/**', '**/*.test.ts'],
    },
  ],
  format: formatter({ origins: false }),
}

export default linguiConfig
