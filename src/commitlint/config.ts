import type { UserConfig } from '@commitlint/types'

import type { CommitlintConfigParams } from './types.js'

export function config(params?: CommitlintConfigParams): UserConfig {
    const { extends: _extends = [] } = params ?? {}

    return {
        extends: ['@commitlint/config-conventional', ..._extends],
    }
}
