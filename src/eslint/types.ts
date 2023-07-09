import type { Linter } from 'eslint'

export interface ESLintConfigParams {
    /**
     * Whether to enable [Node.js](https://nodejs.org/) support
     * @default false
     */
    node?: boolean
    /**
     * Whether to enable [Next.js](https://nextjs.org/) support
     * @default false
     */
    nextJs?: boolean
    /**
     * Whether to enable [Astro](https://astro.build/) support
     * @default false
     */
    astro?: boolean
    /**
     * Additional `ignorePatterns` to be added to the config
     * @default []
     */
    ignorePatterns?: Linter.Config['ignorePatterns']
    /**
     * Additional `env` to be added to the config
     * @default {}
     */
    env?: Linter.Config['env']
    /**
     * Additional `plugins` to be added to the config
     * @default []
     */
    plugins?: Linter.Config['plugins']
    /**
     * Additional `extends` to be added to the config
     * @default []
     */
    extends?: Linter.Config['extends']
    /**
     * Additional `rules` to be added to the config
     * @default {}
     */
    rules?: Linter.Config['rules']
    /**
     * Additional `overrides` to be added to the config
     * @default []
     */
    overrides?: Linter.Config['overrides']
}
