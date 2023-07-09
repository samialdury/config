import type { UserConfig } from '@commitlint/types'

export interface CommitlintConfigParams {
    /**
     * Additional `extends` to be added to the config
     * @default []
     */
    extends?: UserConfig['extends']
}
