import type { Linter } from 'eslint'

export interface ESLintConfigParams {
    /**
     * Whether to enable [TypeScript](https://www.typescriptlang.org/) support
     * @default true
     */
    typeScript?: boolean
    /**
     * Whether to enable [Node.js](https://nodejs.org/) support
     * @default false
     */
    node?: boolean
    /**
     * Whether to enable [browser](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) support
     * @default false
     */
    browser?: boolean
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
    fp?: boolean
    /**
     * Additional `ignores` to be added to the config
     * @default []
     */
    ignores?: Linter.FlatConfig['ignores']
    /**
     * Additional `plugins` to be added to the config
     * @default []
     */
    plugins?: Linter.FlatConfig['plugins']
    /**
     * Additional `rules` to be added to the config
     * @default {}
     */
    rules?: Linter.FlatConfig['rules']
    /**
     * Additional `settings` to be added to the config
     * @default {}
     */
    settings?: Linter.FlatConfig['settings']
}
