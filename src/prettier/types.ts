import type { Config } from 'prettier'

export interface PrettierConfigParams {
    /**
     * Whether to enable [Tailwind CSS](https://tailwindcss.com/) support
     * @default false
     */
    tailwind?: boolean
    /**
     * Whether to enable [Astro](https://astro.build/) support
     * @default false
     */
    astro?: boolean
    /**
     * Additional `plugins` to be added to the config
     * @default []
     */
    plugins?: Config['plugins']
    /**
     * Additional `overrides` to be added to the config
     * @default []
     */
    overrides: Config['overrides']
}
