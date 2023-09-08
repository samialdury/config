import type { Linter } from 'eslint'

export interface ESLintConfigParams {
    /**
     * Whether to enable [browser](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) support (globals).
     * @default false
     */
    browser?: boolean
    /**
     * Whether to enable [Next.js](https://nextjs.org/) support.
     * @default false
     */
    nextJs?: boolean
    /**
     * Whether to enable [Node.js](https://nodejs.org/) support (globals).
     * @default false
     */
    node?: boolean
    /**
     * Whether to enable [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist).
     * @default true
     */
    perfectionist?: boolean
    /**
     * Additional `plugins` to be added to the config.
     * @default []
     */
    plugins?: Linter.FlatConfig['plugins']
    /**
     * Additional `rules` to be added to the config.
     * @default {}
     */
    rules?: Linter.FlatConfig['rules']
    /**
     * Additional `settings` to be added to the config.
     * @default {}
     */
    settings?: Linter.FlatConfig['settings']
    /**
     * Whether to enable [TypeScript](https://www.typescriptlang.org/) support.
     * @default true
     */
    typeScript?: boolean
}
