import type { Commands, ConfigFn } from 'lint-staged'

export interface LintStagedConfigParams {
    /**
     * Additional config functions to be added to the config
     * @default {}
     */
    configFunctions?: Record<string, Commands | ConfigFn>
}
