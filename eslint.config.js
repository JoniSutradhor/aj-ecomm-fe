import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores([
        '**/package-lock.json',
        '**/dist',
        '**/public',
        '**/node_modules',
    ]),
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        extends: [
            eslintConfigPrettier,
            js.configs.recommended,
            tseslint.configs.recommended,
            reactRefresh.configs.vite,
            reactHooks.configs.flat.recommended,
            pluginReact.configs.flat.recommended,
            pluginReact.configs.flat['jsx-runtime'],
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            jsxA11y.flatConfigs.recommended,
        ],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
        settings: {
            react: { version: '19' },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            'no-alert': 'error',
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'error',
            'no-script-url': 'error',
            'no-await-in-loop': 'error',
            'consistent-return': 'error',
            'no-cond-assign': ['error', 'always'],
            camelcase: ['error', { properties: 'never' }],
            'no-param-reassign': ['error', { props: true }],
            'no-nested-ternary': 'error',
            'max-classes-per-file': 'error',
            'no-underscore-dangle': 'error',
            'no-restricted-globals': 'error',
            'no-template-curly-in-string': 'error',
            'react/jsx-pascal-case': 'error',
            'react/no-array-index-key': 'error',
            'react/jsx-no-useless-fragment': 'error',
            'react/destructuring-assignment': 'error',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/require-default-props': 'off',
            // Import resolution / named exports are already checked by tsc (aliases live in tsconfig.app.json)
            'import/no-unresolved': 'off',
            'import/named': 'off',
            'import/namespace': 'off',
            'import/default': 'off',
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',
            'react-refresh/only-export-components': 'off',
        },
    },
    {
        // Test files: module-level mocks and render helpers are allowed to reassign / shadow
        files: ['**/__tests__/**', '**/test_utils/**'],
        rules: {
            'no-param-reassign': 'off',
            '@typescript-eslint/no-shadow': 'off',
        },
    },
]);
