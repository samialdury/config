/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Options } from 'semantic-release'
import type { SemanticReleaseConfigParams } from './types.js'

export function config(params?: SemanticReleaseConfigParams): Options {
    const {
        assets = ['package.json', 'jsr.json', 'CHANGELOG.md'],
        branches = ['main'],
        message = 'chore(release): v${nextRelease.version}',
        releaseRules = [],
    } = params ?? {}

    return {
        branches,
        plugins: [
            [
                '@semantic-release/commit-analyzer',
                {
                    preset: 'angular',
                    releaseRules: [
                        { release: false, scope: 'no-release' },
                        { release: 'patch', type: 'refactor' },
                        { release: 'patch', type: 'style' },
                        ...releaseRules,
                    ],
                },
            ],
            '@semantic-release/release-notes-generator',
            '@semantic-release/changelog',
            '@semantic-release/npm',
            '@sebbo2002/semantic-release-jsr',
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
