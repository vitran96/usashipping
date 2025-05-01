const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
    {
        ignores: ['node_modules', 'dist', 'coverage'],
    },
    {
        files: ['**/*.ts'],
        plugins: {
            '@typescript-eslint': tseslint,
            'prettier': prettierPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        rules: {
            // Custom rules
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
    },
    prettierConfig,
];