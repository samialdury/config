export interface ESLintConfigParams {
    /**
     * Whether to enable [Node.js](https://nodejs.org/) support (globals).
     * @default false
     */
    node?: boolean
    /**
     * Whether to enable [TypeScript](https://www.typescriptlang.org/) support.
     * @default false
     */
    typeScript?: boolean
    /**
     * Whether to enable [browser](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) support (globals).
     * @default false
     */
    browser?: boolean
    /**
     * Whether to enable [React](https://react.dev/) support.
     * @default false
     */
    react?: boolean
    /**
     * Whether to enable [Next.js](https://nextjs.org/) support.
     * @default false
     */
    nextJs?: boolean
    /**
     * Whether to enable [Remix](https://remix.run/) support.
     * @default false
     */
    remix?: boolean
    /**
     * Additional ignore patterns.
     */
    ignores?: string[]
}
