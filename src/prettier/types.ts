import type { Config } from 'prettier'

export interface PrettierConfigParams {
    /**
     * Additional `overrides` to be added to the config
     * @default []
     */
    overrides?: Config['overrides']
    /**
     * Additional `plugins` to be added to the config
     * @default []
     */
    plugins?: Config['plugins']
    /**
     * Whether to enable [Tailwind CSS](https://tailwindcss.com/) support
     * @default false
     */
    tailwind?: boolean
}
