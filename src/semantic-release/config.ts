import type { Options } from 'semantic-release'

import type { SemanticReleaseConfigParams } from './types.js'

export function config(params?: SemanticReleaseConfigParams): Options {
    const {
        branches = ['main'],
        assets = ['package.json', 'CHANGELOG.md'],
        message = 'chore(release): ${nextRelease.version} [skip ci]',
    } = params ?? {}

    return {
        branches,
        plugins: [
            [
                '@semantic-release/commit-analyzer',
                {
                    preset: 'angular',
                    releaseRules: [
                        { type: 'refactor', release: 'patch' },
                        { scope: 'chore', release: 'patch' },
                    ],
                },
            ],
            '@semantic-release/release-notes-generator',
            '@semantic-release/changelog',
            '@semantic-release/npm',
            [
                '@semantic-release/git',
                {
                    assets,
                    message,
                },
            ],
            '@semantic-release/github',
        ],
    }
}
