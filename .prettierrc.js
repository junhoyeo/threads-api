module.exports = {
  singleQuote: true,
  bracketSameLine: false,
  trailingComma: 'all',
  bracketSpacing: true,
  semi: true,
  printWidth: 110,

  // @ianvs/prettier-plugin-sort-imports
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '@/(assets|components|hooks|pages|jotai|styles|utils)/(.*)$',
    '@/(.*)$',
    '^[./](.*)$',
  ],
  plugins: [require('@ianvs/prettier-plugin-sort-imports')],
};
