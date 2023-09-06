/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Options } from 'semantic-release'

export interface SemanticReleaseConfigParams {
    /**
     * Files to include in the release commit
     * @default ['package.json', 'CHANGELOG.md']
     */
    assets?: string[]
    /**
     * The branches on which releases should happen
     * @default ['main']
     */
    branches?: Options['branches']
    /**
     * The message for the release commit
     * @default 'chore(release): v${nextRelease.version}'
     */
    message?: string
    /**
     * Additional release rules for commit analyzer
     * @default
     * [
     *     ...angularPreset,
     *     { scope: 'no-release', release: false },
     * ]
     */
    releaseRules?: any[]
}
