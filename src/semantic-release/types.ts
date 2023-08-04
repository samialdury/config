export interface SemanticReleaseConfigParams {
    /**
     * The branches on which releases should happen
     * @default ['main']
     */
    branches?: string[]
    /**
     * Files to include in the release commit
     * @default ['package.json', 'CHANGELOG.md']
     */
    assets?: string[]
    /**
     * The message for the release commit
     * @default 'chore(release): ${nextRelease.version} [skip ci]'
     */
    message?: string
}
