import { eslint } from './dist/index.js'

export default [...eslint.config({ typeScript: true, node: true })]
