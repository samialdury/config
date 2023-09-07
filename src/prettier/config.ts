/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Config } from 'prettier'
import type { PrettierConfigParams } from './types.js'

export function config(params?: PrettierConfigParams): Config {
    const { overrides = [], plugins = [], tailwind = false } = params ?? {}

    return {
        overrides,
        plugins: [
            require.resolve('prettier-plugin-sh'),
            require.resolve('prettier-plugin-packagejson'),
            ...(tailwind
                ? [require.resolve('prettier-plugin-tailwindcss')]
                : []),
            ...plugins,
        ],
        printWidth: 80,
        semi: false,
        singleQuote: true,
        tabWidth: 4,
        useTabs: false,
    }
}
