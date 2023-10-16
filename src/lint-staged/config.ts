/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Config } from 'lint-staged'
import { relative } from 'node:path'
// eslint-disable-next-line import/no-extraneous-dependencies
import eslint from 'eslint/use-at-your-own-risk'
import type { LintStagedConfigParams } from './types.js'

const { FlatESLint: ESLint } = eslint as unknown as {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    FlatESLint: typeof import('eslint').ESLint
}

function toRelative(file: string): string {
    return relative(process.cwd(), file)
}

async function removeIgnoredFiles(files: string[]): Promise<string[]> {
    const eslint = new ESLint()
    const isIgnored = await Promise.all(
        files.map(async (file) => eslint.isPathIgnored(file)),
    )
    const filteredFiles = files.filter((_, index) => !isIgnored[index])
    return filteredFiles
}

export function config(params?: LintStagedConfigParams): Config {
    const { configFunctions = {} } = params ?? {}

    return {
        '*': (files) => {
            const filesToFormat = files
                .map((file) => toRelative(file))
                .join(' ')

            return [`prettier --check ${filesToFormat}`]
        },
        '**/*.ts': async (files) => {
            const nonIgnoredFiles = await removeIgnoredFiles(files)
            const filesToLint = nonIgnoredFiles
                .map((file) => toRelative(file))
                .join(' ')

            return [`eslint --max-warnings 0 ${filesToLint}`]
        },
        ...configFunctions,
    }
}
