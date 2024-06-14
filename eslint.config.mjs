import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      'android/',
      'ios/',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      '*.config.ts',
      '*.config.json',
      '*.log',
      '.env',
      '*.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      '*.html',
      '*.md',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.gif',
      '*.svg',
      '*.lock',
      '*.zip',
      '*.tar.gz',
      'scripts/'
    ]
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'prettier/prettier': ['error', { 'singleQuote': true }],
      'no-console': 'warn',
      // Avoid Bugs
      'no-undef': 'warn',
      'semi': ['error', 'always'],
      'semi-spacing': 'error',
      // Best Practices
      'eqeqeq': 'warn',
      'no-invalid-this': 'error',
      'no-return-assign': 'error',
      'no-unused-expressions': ['error', { 'allowTernary': true }],
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-constant-condition': 'warn',
      'no-unused-vars': 'off',
      // Enhance Readability
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-mixed-spaces-and-tabs': 'warn',
      'space-before-blocks': 'error',
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'quotes': ['error', 'single'],
      'max-len': ['error', { 'code': 200 }],
      'max-lines': ['error', { 'max': 500 }],
      'keyword-spacing': 'error',
      'no-mixed-operators': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
      'no-whitespace-before-property': 'error',
      'nonblock-statement-body-position': 'error',
      'object-property-newline': [
        'error',
        { 'allowAllPropertiesOnSameLine': true }
      ],
      // ES6
      'arrow-spacing': 'error',
      'no-confusing-arrow': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'object-shorthand': 'off',
      'prefer-const': 'error',
      'prefer-template': 'warn',
      'no-prototype-builtins': 'off',
      'multiline-ternary': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
            'vars': 'all',
            'varsIgnorePattern': '^_',
            'args': 'after-used',
            'argsIgnorePattern': '^_',
        },
      ]
    }
  }
];
