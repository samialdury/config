import type { Plugin } from 'prettier'

export interface PrettierConfigParams {
    /**
     *
     * Prettier plugins
     *
     * @default []
     */
    plugins?: (string | Plugin)[]
}
