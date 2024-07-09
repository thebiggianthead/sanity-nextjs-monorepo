# sanity-nextjs-monorepo

This is an example Next.js and Sanity monorepo.

The Next.js application is a simple blog with Visual Editing / Presentation enabled.

## Monorepo

This codebase is structured as a monorepo to enable using the Sanity Studio
config as both a standalone Studio as well as an embedded Studio. It's using
pnpm workspaces and turbo.

```
├─ apps
│  ├─ studio ............ Sanity studio for the admin studio
│  └─ web ............... Next.js app for the marketing website
└─ packages
   ├─ eslint-config ..... shared ESLint config
   └─ sanity-config ..... admin studio Sanity config
```

## Opinions

This codebase has some of my own opinions which you might wanna change. It uses:

- [Tailwind](https://tailwindcss.com/) in the Next.js app
- [ESLint](https://eslint.org/) with the [Prettier plugin](https://github.com/prettier/eslint-plugin-prettier)
- Husky to enchance commits by:
  - Enforcing [convential commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) messages
  - Running linting on staged files
  - Checking consistency of dependency versions across packages pre-commit using Syncpack
- [Renovatebot](https://docs.renovatebot.com/) to keep dependencies up to date

## Sanity Typegen

This repo has a `pnpm typegen` command in the root, which will run `sanity schema extract` and `sanity typegen generate` in the `studio` package. This is configured to find GROQ queries from the `web` and `sanity-config` packages and compile a `sanity.types.ts` in the root folder.

## Development

To run the website and studio together:

```sh
pnpm run dev
```

To run only the website:

```sh
pnpm run dev --filter=web
```

To run only the admin studio:

```sh
pnpm run dev --filter=studio
```