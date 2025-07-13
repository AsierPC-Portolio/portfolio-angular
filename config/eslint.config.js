
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat();

export default [{
  ignores: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    'src/app/api/**'
  ],
}, {
  files: ['**/*.ts'],
  ignores: ['.storybook/**'],
  plugins: {
    '@angular-eslint': angularEslint,
    'prettier': prettierPlugin,
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
      sourceType: 'module',
    },
  },
  rules: {
    ...angularEslint.configs.recommended.rules,
    ...prettierPlugin.configs.recommended.rules,
  },
}, {
  files: ['.storybook/**/*.ts'],
  plugins: {
    'prettier': prettierPlugin,
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.eslint.storybook.json'],
      sourceType: 'module',
    },
  },
  rules: {
    ...prettierPlugin.configs.recommended.rules,
  },
}, {
  files: ['**/*.html'],
  plugins: {
    '@angular-eslint/template': angularEslintTemplate,
  },
  processor: '@angular-eslint/template/extract-inline-html',
  rules: {
    ...angularEslintTemplate.configs.recommended.rules,
  },
}, ...storybook.configs["flat/recommended"]];

import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
