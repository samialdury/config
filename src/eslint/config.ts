import type { Linter } from 'eslint'

import type { ESLintConfigParams } from './types.js'

export function config(params?: ESLintConfigParams): Linter.Config {
    const {
        nextJs = false,
        astro = false,
        node = false,
        ignorePatterns = [],
        env = {},
        plugins = [],
        extends: _extends = [],
        rules = {},
        overrides = [],
    } = params ?? {}

    return {
        ignorePatterns: [
            '**/node_modules/**',
            '**/.cache/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/.husky/**',
            '**/.eslintrc.*',
            '**/prettier.config.*',
            '**/commitlint.config.*',
            '**/lint-staged.config.*',
            '**/vitest.config.*',
            '**/tsup.config.*',
            '**/release.config.*',
            ...(nextJs || astro ? ['**/tailwind.config.*'] : []),
            ...(nextJs
                ? [
                      '**/.next/**',
                      '**/out/**',
                      '**/next-env.d.ts',
                      '**/next.config.*',
                      '**/postcss.config.*',
                  ]
                : []),
            ...(astro ? ['**/.astro/**'] : []),
            ...ignorePatterns,
        ],
        root: true,
        env: {
            es2022: true,
            ...(node && { node: true }),
            ...env,
        },
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: ['./tsconfig.json'],
        },
        plugins: ['@typescript-eslint', ...plugins],
        extends: [
            // Common
            'eslint:recommended',
            'plugin:import/recommended',
            // TS
            'plugin:import/typescript',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:@typescript-eslint/strict',
            // Other
            'plugin:unicorn/recommended',
            // Next.js
            ...(nextJs ? ['next/core-web-vitals'] : []),
            // Astro
            ...(astro ? ['plugin:astro/recommended'] : []),
            ..._extends,
            // Prettier should be always last
            'prettier',
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
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                },
            ],
            'unicorn/catch-error-name': [
                'error',
                {
                    name: 'err',
                },
            ],
            'unicorn/prevent-abbreviations': [
                'error',
                {
                    replacements: {
                        err: false,
                        fn: false,
                        ref: false,
                        props: false,
                        args: false,
                        params: false,
                        prod: false,
                        dev: false,
                        env: false,
                        config: false,
                    },
                },
            ],
            ...(nextJs && {
                '@typescript-eslint/explicit-function-return-type': 'off',
                'func-style': 'off',
            }),
            ...rules,
        },
        overrides: [
            ...(astro
                ? [
                      {
                          files: ['*.astro'],
                          parser: 'astro-eslint-parser',
                          parserOptions: {
                              parser: '@typescript-eslint/parser',
                              extraFileExtensions: ['.astro'],
                          },
                          rules: {},
                      },
                  ]
                : []),
            ...overrides,
        ],
    }
}
