/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import js from '@eslint/js'
import pluginTs from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
// @ts-expect-error: it's fine
import configPrettier from 'eslint-config-prettier'
// @ts-expect-error: it's fine
import pluginFunctional from 'eslint-plugin-functional'
// @ts-expect-error: it's fine
import pluginImport from 'eslint-plugin-import'
// @ts-expect-error: it's fine
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

import type { ESLintConfigParams } from './types.js'

export function config(params?: ESLintConfigParams): Linter.FlatConfig[] {
    const {
        node = false,
        nextJs = false,
        astro = false,
        fp = false,
        ignores = [],
        plugins = [],
        rules = {},
        settings = {},
    } = params ?? {}

    return [
        {
            files: [
                '**/*.js',
                '**/*.jsx',
                '**/*.cjs',
                '**/*.mjs',
                '**/*.ts',
                '**/*.tsx',
                '**/*.mts',
                '**/*.d.ts',
            ],
            ignores: [
                '**/node_modules/**',
                '**/.cache/**',
                '**/build/**',
                '**/dist/**',
                '**/coverage/**',
                '**/.husky/**',
                '**/eslint.config.*',
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
                ...ignores,
            ],
            languageOptions: {
                globals: {
                    ...(node || nextJs || astro ? globals.node : undefined),
                    ...(nextJs || astro ? globals.browser : undefined),
                },
                sourceType: 'module',
                ecmaVersion: 'latest',
                // @ts-expect-error: it's fine
                parser: tsParser,
                parserOptions: {
                    project: './tsconfig.json',
                },
            },
            plugins: {
                import: pluginImport,
                // @ts-expect-error: it's fine
                '@typescript-eslint': pluginTs,
                ...(fp ? { functional: pluginFunctional } : undefined),
                unicorn: pluginUnicorn,
                ...plugins,
            },
            rules: {
                ...js.configs.recommended.rules,
                ...pluginImport.configs.recommended.rules,
                ...pluginImport.configs.typescript.rules,
                // @ts-expect-error: it's fine
                ...pluginTs.configs['strict-type-checked'].rules,
                // @ts-expect-error: it's fine
                ...pluginTs.configs['stylistic-type-checked'].rules,
                ...(fp
                    ? {
                          ...pluginFunctional.configs[
                              'external-typescript-recommended'
                          ].rules,
                          ...pluginFunctional.configs.recommended.rules,
                          ...pluginFunctional.configs.strict.rules,
                          ...pluginFunctional.configs.stylistic.rules,
                      }
                    : undefined),
                ...pluginUnicorn.configs.recommended.rules,
                ...configPrettier.rules,
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
                ...(fp
                    ? {
                          'functional/type-declaration-immutability': 'off',
                          'functional/prefer-immutable-types': 'off',
                          'functional/prefer-tacit': 'off',
                      }
                    : undefined),
                ...(nextJs && {
                    '@typescript-eslint/explicit-function-return-type': 'off',
                    'func-style': 'off',
                }),
                ...rules,
            },
            settings: {
                'import/parsers': {
                    '@typescript-eslint/parser': [
                        '.js',
                        '.jsx',
                        '.cjs',
                        '.mjs',
                        '.ts',
                        '.tsx',
                        '.mts',
                        '.d.ts',
                    ],
                },
                'import/resolver': {
                    typescript: true,
                    node,
                },
                ...settings,
            },
        },
    ]
}
