<div align="center">

<img src="https://fairdataihub.org/_next/image?url=%2Fimages%2Fhero%2Faireadi-logo.png&w=640&q=75" alt="logo" width="200" height="auto" />

<br />

<h1>Fairhub.io</h1>

<p>
Cloud-based platform for easily preparing and sharing datasets.</p>

<p>
  <a href="https://github.com/AI-READI/fairhub.io/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/AI-READI/template.svg?style=flat-square" alt="contributors" />
  </a>
  <a href="https://github.com/AI-READI/fairhub.io/stargazers">
    <img src="https://img.shields.io/github/stars/AI-READI/template.svg?style=flat-square" alt="stars" />
  </a>
  <a href="https://github.com/AI-READI/fairhub.io/issues/">
    <img src="https://img.shields.io/github/issues/AI-READI/template.svg?style=flat-square" alt="open issues" />
  </a>
  <a href="https://github.com/AI-READI/fairhub.io/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/AI-READI/template.svg?style=flat-square" alt="license" />
  </a>
  <a href="https://doi.org/10.5281/zenodo.6407300">
    <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.6407300.svg" alt="doi" />
  </a>
</p>

<h4>
    <a href="#">Sublink 1</a>
  <span> · </span>
    <a href="#">Documentation</a>
  <span> · </span>
    <a href="#">Changelog</a>
  <span> · </span>
    <a href="https://github.com/AI-READI/fairhub.io/issues/">Report Bug</a>
  <span> · </span>
    <a href="#">Request Feature</a>
  </h4>
</div>

# Description
Cloud-based platform for easily preparing and sharing FAIR and AI-ready datasets.
# Getting started
We use Storybook for documenting our design system. You can refer to that for design guidelines, component documentation, and resources for editing components locally.

## Prerequisites/Dependencies

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Installing

See [Vite Configuration Reference](https://vitejs.dev/config/).

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment

This repository is automatically deployed to [Azure](https://www.netlify.com/) on every push to the repository. If you need to reference a specific branch or pull request, you can do so by using the following URL pattern:

- https://brave-ground-07b6bfb10-<BRANCH_NAME>.centralus.2.azurestaticapps.net/
- https://brave-ground-07b6bfb10-<GITHUB_PR_NUMBER>.centralus.2.azurestaticapps.net/

The `production` branch is automatically deployed to the following URL: https://fairhub.io
 
## Inputs and Outputs
## Contributing
## Issues and Feedback
If you have any questions or suggestions, please contact us using [GitHub issues](https://github.com/AI-READI/fairhub.io/issues/new)
## How to cite
## Acknowledgements
This project is supported by the NIH-funded Bridge2AI program (1OT2OD032644). The content is solely the responsibility of the authors and does not necessarily represent the official views of the NIH.

<div align="center">

<a href="https://aireadi.org">
  <img src="https://raw.githubusercontent.com/AI-READI/Bridge2AI-logo/main/logo-color-upscaled.png" height="200" />
</a>

</div>