<div align="center">
<br />


<a href="https://aireadi.org">
  <img src="https://github.com/AI-READI/fairhub.io-logo/blob/main/logo-with-text.png?raw=true" 
height="80" width="250"/>
</a>


<p>
Easily manage, curate, and share FAIR and AI-ready clinical and biomedical research data.</p>

<p>
  <a href="https://github.com/AI-READI/FAIRhub.io/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/AI-READI/template.svg?style=flat-square" alt="contributors" />
  </a>
  <a href="https://github.com/AI-READI/FAIRhub.io/stargazers">
    <img src="https://img.shields.io/github/stars/AI-READI/template.svg?style=flat-square" alt="stars" />
  </a>
  <a href="https://github.com/AI-READI/FAIRhub.io/issues/">
    <img src="https://img.shields.io/github/issues/AI-READI/template.svg?style=flat-square" alt="open issues" />
  </a>
  <a href="https://github.com/AI-READI/FAIRhub.io/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/AI-READI/template.svg?style=flat-square" alt="license" />
  </a>
  <a href="https://doi.org/10.5281/zenodo.6407300">
    <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.6407300.svg" alt="doi" />
  </a>
</p>

<h4>
    <a href="https://FAIRhub.io/"> FAIRhub.io </a>
  
  <span> · </span>
    <a href="https://docs.FAIRhub.io/"> User Documentation</a>
  <span> · </span>
    <a href="CHANGELOG.md"> Changelog </a> 
  <span> · </span>
    <a href="https://github.com/AI-READI/FAIRhub.io/issues/">Report Bug or Make Suggestions</a>
  </h4>
</div>

## Description

As part of [AI-READI](https://aireadi.org/), a data generation project supported by the NIH-funded Bridge2AI program, we are developing FAIRhub This is a web platform for easily managing, curating, and sharing clinical and biomedical research data such that the data is FAIR (Findable, Accessible, Interoperable, Reusable) and ready for downstream AI-based analysis. For the duration of the project, we anticipate the platform to support the mangement, curation, and sharing of data generated by the AI-READI project where we expect to collect diabetes-related multimodal data from 4,000 study participant during 2022-2026 (more details are available on the project website [aireadi.org](https://aireadi.org/)). This repository contains the source code of FAIRhub along with instructions for using the source code as well as pointers to various documentation and resources related to the platform.

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

- <https://brave-ground-07b6bfb10-<BRANCH_NAME>.centralus.2.azurestaticapps.net/>
- <https://brave-ground-07b6bfb10-<GITHUB_PR_NUMBER>.centralus.2.azurestaticapps.net/>

The `production` branch is automatically deployed to the following URL: <https://FAIRhub.io>.

## Documentation

### User documentation

Our user documentation for FAIRhub will be available at [docs.FAIRhub.io](https://docs.FAIRhub.io/) (STATUS: not active).

### Developer documentation

The basic instructions for running a local version of FAIRhub for development purposes are provided above in this README. Details about our high-level development best practices are available at [dev.aireadi.org](https://dev.aireadi.org) and details about our development practices specific to FAIRhub are available at [dev.FAIRhub.io](https://dev.FAIRhub.io/).

### APIs documentation

The APIs of FAIRhub are documented at [api.FAIRhub.io](https://api.FAIRhub.io/) (STATUS: not active).

### Style guide

We use Storybook for documenting our design system. It is available at [style.FAIRhub.io](https://style.FAIRhub.io/). You can refer to that for design guidelines, component documentation, and resources for editing components locally. Instructions for running the storybook locally to suggest changes are provided below:

```sh
yarn install

yarn storybook
```

## Inputs and Outputs

The typical inputs out FAIRhub will be clinical and biomedical research related data uploaded by the users. The typical output of FAIRhub will be FAIR and AI-ready datasets shared by the users.

## Contributing

<a href="https://github.com/AI-READI/aireadi.org/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AI-READI/aireadi.org" />
</a>

Contributions are always welcome!

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](./contributing.md) for more information on what we're looking for and how to get started.

We recommend to look at the [documentation](https://dev.FAIRhub.io/) for more information.

## Issues and Feedback

If you have any questions or suggestions, please contact us using [GitHub issues](https://github.com/AI-READI/FAIRhub.io/issues/new).

## License

This work is licensed under
[MIT](https://opensource.org/licenses/mit). See [LICENSE](https://github.com/AI-READI/FAIRhub.io/blob/main/LICENSE) for more information.

<a href="https://aireadi.org" >
  <img src="https://www.channelfutures.com/files/2017/04/3_0.png" height="30" />
</a>

## How to cite

If you are using this FAIRhub or reusing the source code from this repository for any purpose, please cite:

```bash
    ADD Citation here
```

## Acknowledgements

This project is supported by the NIH-funded Bridge2AI program (1OT2OD032644). The content is solely the responsibility of the authors and does not necessarily represent the official views of the NIH.

<div align="center">

<a href="https://aireadi.org">
  <img src="https://github.com/AI-READI/AI-READI-logo/raw/main/logo/png/option2.png" height="200" />
</a>
</div>
