# Config

[![NPM version](https://img.shields.io/npm/v/@samialdury/config)](https://www.npmjs.com/package/@samialdury/config)
[![CI status](https://github.com/samialdury/config/actions/workflows/ci.yaml/badge.svg)](https://github.com/samialdury/config/actions/workflows/ci.yaml)

This repository contains common configuration files for often used tools.

- [Prettier](src/prettier/config.ts)
- [ESLint](src/eslint/config.ts)
- [lint-staged](src/lint-staged/config.ts)
- [commitlint](src/commitlint/config.ts)

## Example usage

```sh
pnpm i -D -E @samialdury/config
```

```js
// .prettierrc.cjs

const { prettier } = require('@samialdury/config')

module.exports = prettier.config(options)
```

```js
// .eslintrc.cjs

const { eslint } = require('@samialdury/config')

module.exports = eslint.config(options)
```

## Required dependencies

### Prettier, ESLint

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [typescript-eslint](https://typescript-eslint.io/)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript)
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

```sh
pnpm i -D -E prettier@2 eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-unicorn prettier-plugin-sh prettier-plugin-packagejson
```

#### Usage with Tailwind CSS

Additional dependencies for [Tailwind CSS](https://tailwindcss.com/) projects:

- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```sh
pnpm i -D -E prettier-plugin-tailwindcss
```

#### Usage with Astro

Additional dependencies for [Astro](https://astro.build/) projects:

- [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)
- [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)

```sh
pnpm i -D -E eslint-plugin-astro prettier-plugin-astro
```

### Husky, lint-staged, commitlint

- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://commitlint.js.org/)

```sh
pnpm i -D -E husky lint-staged @commitlint/cli @commitlint/config-conventional
```

## License

[MIT](LICENSE)
