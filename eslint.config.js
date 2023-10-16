import { eslint } from './dist/index.js'

export default [...eslint.config({ node: true, typeScript: true })]
