/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Linter } from 'eslint'
import js from '@eslint/js'
import pluginTs from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
// @ts-expect-error: it's fine
import configPrettier from 'eslint-config-prettier'
// @ts-expect-error: it's fine
import pluginImport from 'eslint-plugin-import'
// @ts-expect-error: it's fine
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural'
// @ts-expect-error: it's fine
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import type { ESLintConfigParams } from './types.js'

export function config(params?: ESLintConfigParams): Linter.FlatConfig[] {
    const {
        browser = false,
        nextJs = false,
        node = false,
        perfectionist = true,
        plugins = [],
        rules = {},
        settings = {},
        typeScript = true,
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
            // @ts-expect-error: it's fine
            languageOptions: {
                ecmaVersion: 'latest',
                globals: {
                    ...((node || nextJs) && globals.node),
                    ...((browser || nextJs) && globals.browser),
                },
                sourceType: 'module',
                ...(typeScript && {
                    parser: tsParser,
                    parserOptions: {
                        project: './tsconfig.json',
                    },
                }),
            },
            plugins: {
                import: pluginImport,
                ...(typeScript && {
                    '@typescript-eslint': pluginTs,
                }),
                unicorn: pluginUnicorn,
                ...(perfectionist && {
                    ...perfectionistNatural.plugins,
                }),
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
                'func-style': ['error', 'declaration'],
                'import/newline-after-import': 'error',
                'import/no-extraneous-dependencies': [
                    'error',
                    {
                        devDependencies: false,
                        optionalDependencies: false,
                        peerDependencies: false,
                    },
                ],
                'import/order': 'off',
                'no-console': 'error',
                'object-shorthand': ['error', 'always'],
                ...(typeScript && {
                    '@typescript-eslint/consistent-type-imports': 'error',
                    '@typescript-eslint/explicit-function-return-type': 'error',
                    '@typescript-eslint/no-import-type-side-effects': 'error',
                    '@typescript-eslint/no-unused-vars': [
                        'warn',
                        { argsIgnorePattern: '^_' },
                    ],
                    '@typescript-eslint/promise-function-async': 'error',
                }),
                'unicorn/catch-error-name': [
                    'error',
                    {
                        name: 'err',
                    },
                ],
                'unicorn/filename-case': [
                    'error',
                    {
                        case: 'kebabCase',
                    },
                ],
                'unicorn/prevent-abbreviations': [
                    'error',
                    {
                        replacements: {
                            args: false,
                            auth: false,
                            config: false,
                            ctx: false,
                            db: false,
                            dev: false,
                            env: false,
                            err: false,
                            fn: false,
                            init: false,
                            params: false,
                            prod: false,
                            props: false,
                            ref: false,
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
                ...(perfectionist && {
                    ...perfectionistNatural.rules,
                    'perfectionist/sort-imports': [
                        'error',
                        {
                            'custom-groups': {
                                type: {},
                                value: {},
                            },
                            groups: [
                                'type',
                                'builtin',
                                'external',
                                'internal-type',
                                'internal',
                                ['parent-type', 'sibling-type', 'index-type'],
                                ['parent', 'sibling', 'index'],
                                'object',
                                'unknown',
                            ],
                            'internal-pattern': ['~/**'],
                            'newlines-between': 'never',
                        },
                    ],
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
                    node,
                    typescript: typeScript,
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
        {
            ignores: [
                '**/node_modules/**',
                '**/.cache/**',
                '**/build/**',
                '**/dist/**',
                '**/coverage/**',
                '**/.husky/**',
                '**/*.config.*',
            ],
        },
        browser || nextJs
            ? {
                  ignores: ['**/public/**'],
              }
            : {},
        nextJs
            ? {
                  ignores: [
                      '**/.next/**',
                      '**/out/**',
                      '**/.vercel/**',
                      '**/next-env.d.ts',
                  ],
              }
            : {},
        {
            ignores: ['!**/src/**/*config.*'],
        },
    ]
}
