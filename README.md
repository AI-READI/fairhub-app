<div align="center">

<img src="https://fairdataihub.org/_next/image?url=%2Fimages%2Fhero%2Faireadi-logo.png&w=640&q=75" alt="logo" width="200" height="auto" />

<br />

<h1>Fairhub.io</h1>

<p>
Easily manage, curate, and share FAIR clinical and biomedical research data.</p>

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
    <a href="https://fairhub.io/"> fairhub.io </a>
  <span> · </span>
    <a href="https://docs.fairhub.io/"> User Documentation</a>
  <span> · </span>
    <a href="#"> Changelog </a>
  <span> · </span>
    <a href="https://github.com/AI-READI/fairhub.io/issues/">Report Bug or Make Suggestions</a>
  </h4>
</div>

## Description
Cloud-based platform for easily preparing and sharing FAIR and AI-ready datasets.

## Getting started

### Prerequisites/Dependencies

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


#### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Installing

See [Vite Configuration Reference](https://vitejs.dev/config/).

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

#### Lint with [ESLint](https://eslint.org/)

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

## Documentation

### User documentation
Our user documentation for fairhub.io will be available at [docs.fairhub.io](https://docs.fairhub.io/) (STATUS: not active)

### Developer documentation
The basic instructions for running a local version of fairhub.io for development purposes are provided above in this README. Details about our high-level development best practices are available at [dev.aireadi.org](https://dev.aireadi.org) and details about our development practices specific to fairhub.io are available at [dev.fairhub.io](https://dev.fairhub.io/)

### Style guide
We use Storybook for documenting our design system. It is available at [style.fairhub.io](https://style.fairhub.io/). You can refer to that for design guidelines, component documentation, and resources for editing components locally. Instructions for running the storybook locally to suggest changes are provided below.

## License

This work is licensed under
[MIT](https://opensource.org/licenses/mit). See [LICENSE](https://github.com/AI-READI/template/blob/main/LICENSE) for more information.

<a href="https://aireadi.org" >
  <img src="https://www.channelfutures.com/files/2017/04/3_0.png" height="30" />
</a>

## How to cite


If you are using this fairhub.io or reusing the source code from this repository for any purpose, please cite:

```bash
    ADD Citation here
```

## Acknowledgements
This project is supported by the NIH-funded Bridge2AI program (1OT2OD032644). The content is solely the responsibility of the authors and does not necessarily represent the official views of the NIH.

<div align="center">

<a href="https://aireadi.org">
  <img src="https://raw.githubusercontent.com/AI-READI/Bridge2AI-logo/main/logo-color-upscaled.png" height="200" />
</a>

</div>
