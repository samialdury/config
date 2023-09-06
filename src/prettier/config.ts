/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Config } from 'prettier'

import type { PrettierConfigParams } from './types.js'

export function config(params?: PrettierConfigParams): Config {
    const { tailwind = false, plugins = [], overrides = [] } = params ?? {}

    return {
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        semi: false,
        singleQuote: true,
        plugins: [
            require.resolve('prettier-plugin-sh'),
            require.resolve('prettier-plugin-packagejson'),
            ...(tailwind
                ? [require.resolve('prettier-plugin-tailwindcss')]
                : []),
            ...plugins,
        ],
        overrides,
    }
}
