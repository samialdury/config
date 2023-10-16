/* eslint-disable unicorn/prefer-module */
import type { Config } from 'prettier'
import type { PrettierConfigParams } from './types.js'

export function config(params?: PrettierConfigParams): Config {
    const { tailwind = false, overrides = [], plugins = [] } = params ?? {}

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
