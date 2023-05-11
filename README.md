# Config

This repository contains common configuration files for often used tools.

-   [Prettier](src/prettier/config.ts)
-   [ESLint](src/eslint/config.ts)
-   [lint-staged](src/lint-staged/config.ts)
-   [commitlint](src/commitlint/config.ts)

## Example usage

```sh
pnpm i -D -E @samialdury/config
```

```js
// prettier.config.cjs

const { prettier } = require('@samialdury/config')

module.exports = prettier.config
```

## Dependencies

### Prettier, ESLint

```sh
pnpm i -D -E eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prettier
```

### Husky, lint-staged, commitlint

```sh
pnpm i -D -E husky lint-staged @commitlint/cli @commitlint/config-conventional
```

## License

[MIT](LICENSE)
