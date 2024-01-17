/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Linter } from 'eslint'
import js from '@eslint/js'
// @ts-expect-error
import pluginNext from '@next/eslint-plugin-next'
import * as pluginTanStackQuery from '@tanstack/eslint-plugin-query'
import pluginTs from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
// @ts-expect-error
import configPrettier from 'eslint-config-prettier'
// @ts-expect-error
import pluginImport from 'eslint-plugin-import'
// @ts-expect-error
import pluginReactA11y from 'eslint-plugin-jsx-a11y'
// @ts-expect-error
import pluginMarkdown from 'eslint-plugin-markdown'
// @ts-expect-error
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural'
// @ts-expect-error
import pluginReact from 'eslint-plugin-react'
// @ts-expect-error
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginRemixReactRoutes from 'eslint-plugin-remix-react-routes'
// @ts-expect-error
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import type { ESLintConfigParams } from './types.js'

const jsxFiles = ['**/*.jsx']
const jsxTsFiles = ['**/*.tsx']

const jsTestFiles = [
    '**/*.test.js',
    '**/*.test.cjs',
    '**/*.test.mjs',
    '**/*.test.jsx',
]
const tsTestFiles = [
    '**/*.test.ts',
    '**/*.test.mts',
    '**/*.test.d.ts',
    '**/*.test.tsx',
]

const jsFiles = ['**/*.js', '**/*.cjs', '**/*.mjs', ...jsxFiles]
const tsFiles = ['**/*.ts', '**/*.mts', '**/*.d.ts', ...jsxTsFiles]

const testFiles = [...jsTestFiles, ...tsTestFiles]

const allFiles = [...jsFiles, ...tsFiles, ...testFiles]

export function config(params?: ESLintConfigParams): Linter.FlatConfig[] {
    const {
        node = false,
        typeScript = false,
        browser = false,
        react = false,
        nextJs = false,
        remix = false,
    } = params ?? {}

    const reactFramework = nextJs || remix

    return [
        {
            files: allFiles,
            linterOptions: {
                reportUnusedDisableDirectives: true,
            },
            languageOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                globals: {
                    ...((node || reactFramework) && globals.node),
                    ...((browser || react || reactFramework) &&
                        globals.browser),
                },
                parserOptions: {
                    ecmaVersion: 'latest',
                    sourceType: 'module',
                },
            },
            plugins: {
                import: pluginImport,
                unicorn: pluginUnicorn,
                ...perfectionistNatural.plugins,
            },
            rules: {
                ...js.configs.recommended.rules,
                ...pluginImport.configs.recommended.rules,
                ...pluginUnicorn.configs.recommended.rules,
                ...perfectionistNatural.rules,
                ...configPrettier.rules,

                /**
                 * core
                 */
                'func-style': ['error', 'declaration'],
                'no-console': 'error',
                'object-shorthand': ['error', 'always'],
                /**
                 * import
                 */
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
                /**
                 * unicorn
                 */
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
                            docs: false,
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
                /**
                 * perfectionist
                 */
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
                'perfectionist/sort-objects': 'off',
                'perfectionist/sort-object-types': 'off',
                'perfectionist/sort-interfaces': 'off',
                'perfectionist/sort-enums': 'off',
                'perfectionist/sort-classes': 'off',
                'perfectionist/sort-array-includes': 'off',
                'perfectionist/sort-maps': 'off',
                'perfectionist/sort-jsx-props': 'off',
                'perfectionist/sort-astro-attributes': 'off',
                'perfectionist/sort-vue-attributes': 'off',
                'perfectionist/sort-svelte-attributes': 'off',
            },
            settings: {
                'import/parsers': {
                    espree: ['.js', '.cjs', '.mjs', '.jsx'],
                },
                'import/resolver': {
                    node,
                },
            },
        },

        // @ts-expect-error
        typeScript
            ? {
                  files: tsFiles,
                  languageOptions: {
                      ecmaVersion: 'latest',
                      sourceType: 'module',
                      parser: tsParser,
                      parserOptions: {
                          project: './tsconfig.json',
                          ecmaVersion: 'latest',
                          sourceType: 'module',
                      },
                  },
                  plugins: {
                      '@typescript-eslint': pluginTs,
                  },
                  rules: {
                      ...pluginImport.configs.typescript.rules,
                      // @ts-expect-error
                      ...pluginTs.configs['eslint-recommended']?.overrides[0]
                          ?.rules,
                      // @ts-expect-error
                      ...pluginTs.configs['strict-type-checked'].rules,
                      // @ts-expect-error
                      ...pluginTs.configs['stylistic-type-checked'].rules,

                      /**
                       * typescript
                       */
                      '@typescript-eslint/consistent-type-imports': 'error',
                      '@typescript-eslint/explicit-function-return-type':
                          'error',
                      '@typescript-eslint/no-import-type-side-effects': 'error',
                      '@typescript-eslint/no-unused-vars': [
                          'warn',
                          { argsIgnorePattern: '^_' },
                      ],
                      '@typescript-eslint/promise-function-async': 'error',
                  },
                  settings: {
                      'import/parsers': {
                          '@typescript-eslint/parser': [
                              '.ts',
                              '.mts',
                              '.d.ts',
                              '.tsx',
                          ],
                      },
                      'import/resolver': {
                          node,
                          typescript: true,
                      },
                  },
              }
            : {},
        //   @ts-expect-error
        react || reactFramework
            ? {
                  files: [jsxFiles, jsxTsFiles],
                  languageOptions: {
                      globals: {
                          ...globals.browser,
                      },
                      parserOptions: {
                          ecmaFeatures: {
                              jsx: true,
                          },
                      },
                  },
                  settings: {
                      react: {
                          version: 'detect',
                      },
                      ...(remix && {
                          formComponents: ['Form'],
                          linkComponents: [
                              { name: 'Link', linkAttribute: 'to' },
                              { name: 'NavLink', linkAttribute: 'to' },
                          ],
                      }),
                  },
                  plugins: {
                      react: pluginReact,
                      'jsx-a11y': pluginReactA11y,
                      'react-hooks': pluginReactHooks,
                      '@tanstack/query': pluginTanStackQuery,
                  },
                  rules: {
                      ...pluginReact.configs.recommended.rules,
                      ...pluginReact.configs['jsx-runtime'].rules,
                      ...pluginReactA11y.configs.recommended.rules,
                      ...pluginReactHooks.configs.recommended.rules,
                      ...pluginTanStackQuery.configs.recommended.rules,

                      /**
                       * core
                       */
                      'func-style': 'off',
                      /**
                       *
                       * typescript
                       */
                      '@typescript-eslint/explicit-function-return-type': 'off',
                      /**
                       * React
                       */
                      'react/jsx-no-leaked-render': [
                          'warn',
                          { validStrategies: ['ternary'] },
                      ],
                  },
              }
            : {},
        nextJs
            ? {
                  files: [jsxFiles, jsxTsFiles],
                  plugins: {
                      '@next/next': pluginNext,
                  },
                  rules: {
                      ...pluginNext.configs.recommended.rules,
                      ...pluginNext.configs['core-web-vitals'].rules,
                  },
              }
            : {},
        remix
            ? ({
                  files: [jsxFiles, jsxTsFiles],
                  plugins: {
                      'remix-react-routes': pluginRemixReactRoutes,
                  },
                  settings: pluginRemixReactRoutes.configs.strict.settings,
                  rules: {
                      ...pluginRemixReactRoutes.configs.strict.rules,
                  },
              } as never)
            : {},
        {
            files: testFiles,
            rules: {
                /**
                 * import
                 */
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
            files: ['*.md'],
            plugins: {
                markdown: pluginMarkdown,
            },
            processor: 'markdown/markdown',
        },
        {
            files: ['**/*.md/**'],
            plugins: {
                markdown: pluginMarkdown,
            },
            languageOptions: {
                parserOptions:
                    pluginMarkdown.configs.recommended.overrides[1]
                        .parserOptions,
            },
            rules: {
                ...pluginMarkdown.configs.recommended.overrides[1].rules,
                'import/no-unresolved': 'off',
                'unicorn/filename-case': 'off',
                'unicorn/prefer-module': 'off',
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
        browser || react || reactFramework
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
    ]
}
