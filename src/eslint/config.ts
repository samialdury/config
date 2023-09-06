/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import js from '@eslint/js'
import pluginTs from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
// @ts-expect-error: it's fine
import configPrettier from 'eslint-config-prettier'
// @ts-expect-error: it's fine
import pluginImport from 'eslint-plugin-import'
// @ts-expect-error: it's fine
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

import type { ESLintConfigParams } from './types.js'

export function config(params?: ESLintConfigParams): Linter.FlatConfig[] {
    const {
        typeScript = true,
        node = false,
        browser = false,
        nextJs = false,
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
                ...(typeScript
                    ? ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.d.ts']
                    : []),
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
                ...(browser || nextJs ? ['**/tailwind.config.*'] : []),
                ...(nextJs
                    ? [
                          '**/.next/**',
                          '**/out/**',
                          '**/next-env.d.ts',
                          '**/next.config.*',
                          '**/postcss.config.*',
                      ]
                    : []),
                ...ignores,
            ],
            // @ts-expect-error: it's fine
            languageOptions: {
                globals: {
                    ...((node || nextJs) && globals.node),
                    ...((browser || nextJs) && globals.browser),
                },
                sourceType: 'module',
                ecmaVersion: 'latest',
                ...(typeScript && {
                    parser: tsParser,
                    parserOptions: {
                        project: './tsconfig.json',
                    },
                }),
            },
            // @ts-expect-error: it's fine
            plugins: {
                import: pluginImport,
                ...(typeScript && {
                    '@typescript-eslint': pluginTs,
                }),
                unicorn: pluginUnicorn,
                ...plugins,
            },
            rules: {
                ...js.configs.recommended.rules,
                ...pluginImport.configs.recommended.rules,
                ...(typeScript && {
                    ...pluginImport.configs.typescript.rules,
                    // @ts-expect-error: it's fine
                    ...pluginTs.configs['eslint-recommended']?.overrides[0]
                        ?.rules,
                    // @ts-expect-error: it's fine
                    ...pluginTs.configs['strict-type-checked'].rules,
                    // @ts-expect-error: it's fine
                    ...pluginTs.configs['stylistic-type-checked'].rules,
                }),
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
                'import/no-extraneous-dependencies': [
                    'error',
                    {
                        devDependencies: false,
                        optionalDependencies: false,
                        peerDependencies: false,
                    },
                ],
                'object-shorthand': ['error', 'always'],
                'no-console': 'error',
                'func-style': ['error', 'declaration'],
                ...(typeScript && {
                    '@typescript-eslint/explicit-function-return-type': 'error',
                    '@typescript-eslint/promise-function-async': 'error',
                    '@typescript-eslint/consistent-type-imports': 'error',
                    '@typescript-eslint/no-import-type-side-effects': 'error',
                    '@typescript-eslint/no-unused-vars': [
                        'warn',
                        { argsIgnorePattern: '^_' },
                    ],
                }),
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
                ...(typeScript &&
                    nextJs && {
                        '@typescript-eslint/explicit-function-return-type':
                            'off',
                    }),
                ...(nextJs && {
                    'func-style': 'off',
                }),
                ...rules,
            },
            settings: {
                'import/parsers': {
                    ...(typeScript && {
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
                    }),
                },
                'import/resolver': {
                    typescript: typeScript,
                    node,
                },
                ...settings,
            },
        },
        {
            files: [
                '**/*.test.js',
                '**/*.test.jsx',
                '**/*.test.cjs',
                '**/*.test.mjs',
                ...(typeScript
                    ? [
                          '**/*.test.ts',
                          '**/*.test.tsx',
                          '**/*.test.mts',
                          '**/*.test.d.ts',
                      ]
                    : []),
            ],
            plugins: {
                import: pluginImport,
            },
            rules: {
                'import/no-extraneous-dependencies': [
                    'error',
                    {
                        devDependencies: true,
                        optionalDependencies: false,
                        peerDependencies: false,
                    },
                ],
            },
        },
    ]
}
