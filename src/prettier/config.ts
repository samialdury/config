/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Config } from 'prettier'

import type { PrettierConfigParams } from './types.js'

export function config(params?: PrettierConfigParams): Config {
    const {
        tailwind = false,
        astro = false,
        plugins = [],
        overrides = [],
    } = params ?? {}

    return {
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        semi: false,
        singleQuote: true,
        plugins: [
            'prettier-plugin-sh',
            'prettier-plugin-packagejson',
            ...(tailwind ? ['prettier-plugin-tailwindcss'] : []),
            ...(astro ? ['prettier-plugin-astro'] : []),
            ...plugins,
        ],
        overrides: [
            ...(astro
                ? [
                      {
                          files: '*.astro',
                          options: {
                              parser: 'astro',
                          },
                      },
                  ]
                : []),
            ...overrides,
        ],
    }
}
