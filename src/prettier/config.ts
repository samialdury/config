import type { Config } from 'prettier'

import type { PrettierConfigParams } from './types.js'

export function config(params?: PrettierConfigParams): Config {
    const { plugins = [] } = params ?? {}

    return {
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        semi: false,
        singleQuote: true,
        plugins,
    }
}
