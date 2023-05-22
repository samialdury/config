import type { Linter } from 'eslint'

export const config: Linter.Config = {
    ignorePatterns: [
        '**/node_modules/**',
        '**/cache/**',
        '**/build/**',
        '**/dist/**',
        '**/coverage/**',
        '**/.husky/**',
        '**/.eslintrc.cjs',
        '**/prettier.config.cjs',
        '**/commitlint.config.cjs',
        '**/lint-staged.config.cjs',
        '**/vitest.config.ts',
        '**/tsup.config.ts',
    ],
    root: true,
    env: {
        es2022: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        // Common
        'eslint:recommended',
        'plugin:import/recommended',
        // TS
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        // Prettier
        'plugin:prettier/recommended',
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    rules: {
        'import/newline-after-import': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'object-shorthand': ['error', 'always'],
        'no-console': 'error',
        'func-style': ['error', 'declaration'],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' },
        ],
    },
}
