/* eslint-disable @typescript-eslint/no-var-requires */
const NextI18Next = require('next-i18next').default
const path = require('path')

module.exports = new NextI18Next({
  defaultLanguage: 'vi',
  otherLanguages: ['en', 'vi'],
  localeSubpaths: true,
  localePath: path.resolve('./public/static/locales'),
})
