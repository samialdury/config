# `@samialdury/config`

[![CI status](https://github.com/samialdury/config/actions/workflows/ci.yml/badge.svg)](https://github.com/samialdury/config/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/samialdury/config)](LICENSE)
[![npm version](https://img.shields.io/npm/v/%40samialdury/config)](https://www.npmjs.com/package/@samialdury/config)

Common configuration for often used tools.

- [Prettier](src/prettier/config.ts)
- [ESLint](src/eslint/config.ts)
- [commitlint](src/commitlint/config.ts)
- [lint-staged](src/lint-staged/config.ts)
- [semantic-release](src/semantic-release/config.ts)

## Installation

```sh
pnpm i -D -E @samialdury/config prettier eslint husky @commitlint/cli lint-staged semantic-release
```

## Usage

```js
// prettier.config.cjs

const { prettier } = require('@samialdury/config')

module.exports = prettier.config(opts)
```

```js
// eslint.config.js

import { eslint } from '@samialdury/config'

export default [...eslint.config(opts)]
```

```js
// commitlint.config.cjs

const { commitlint } = require('@samialdury/config')

module.exports = commitlint.config(opts)
```

```js
// lint-staged.config.cjs

const { lintStaged } = require('@samialdury/config')

module.exports = lintStaged.config(opts)
```

```js
// release.config.cjs

const { semanticRelease } = require('@samialdury/config')

module.exports = semanticRelease.config(opts)
```

## License

[MIT](LICENSE)
