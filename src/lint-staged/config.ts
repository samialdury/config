import { relative } from 'node:path'

import { ESLint } from 'eslint'
import { type Config } from 'lint-staged'

function toRelative(file: string): string {
    return relative(process.cwd(), file)
}

async function removeIgnoredFiles(files: string[]): Promise<string[]> {
    const eslint = new ESLint()
    const isIgnored = await Promise.all(
        files.map(async (file) => eslint.isPathIgnored(file))
    )
    const filteredFiles = files.filter((_, i) => !isIgnored[i])
    return filteredFiles
}

export const config: Config = {
    '*': (files) => {
        const filesToFormat = files.map(toRelative).join(' ')

        return [`prettier --check ${filesToFormat}`]
    },
    '**/*.ts': async (files) => {
        const filesToLint = (await removeIgnoredFiles(files))
            .map(toRelative)
            .join(' ')

        return [`eslint --max-warnings=0 ${filesToLint}`]
    },
}
