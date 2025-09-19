import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  vue: true,
  ignores: ['.husky', '**/*.md', '**/public'],
}, {
  rules: {
    'style/semi': ['warn', 'always'],
    'style/quotes': ['warn', 'single'],
    'unused-imports/no-unused-vars': ['warn'],
    'no-console': 'error',
    'antfu/if-newline': 'off',
    'style/max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'style/object-curly-newline': [
      'warn',
      {
        multiline: true,
        minProperties: 6,
      },
    ],
    'style/array-bracket-newline': [
      'warn',
      {
        multiline: true,
        minItems: 6,
      },
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3,
        multiline: 1,
      },
    ],
  },
});
