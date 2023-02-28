<div align="center">
<br />

<a>
  <img src="https://github.com/AI-READI/fairhub.io-logo/blob/main/logo-with-text.png?raw=true"
height="80" width="250"/>
</a>

<p>
Easily manage, curate, and share FAIR and AI-ready clinical and biomedical research data.</p>

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

[//]: # '  <a href="https://doi.org/10.5281/zenodo.6407300">'
[//]: # '    <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.6407300.svg" alt="doi" />'
[//]: # "  </a>"

</p>

<h4>
    <a href="https://fairhub.io/"> fairhub.io </a>
  <span> · </span>
    <a href="https://docs.fairhub.io/"> User Documentation</a>
  <span> · </span>
    <a href="CHANGELOG.md"> Changelog </a>
  <span> · </span>
    <a href="https://github.com/AI-READI/fairhub.io/issues/">Report Bug or Make Suggestions</a>
  </h4>
</div>

## Description

As part of [AI-READI](https://aireadi.org/), a data generation project supported by the NIH-funded Bridge2AI program, we are developing FAIRhub. This is a web platform for easily managing, curating, and sharing clinical and biomedical research data such that the data is FAIR (Findable, Accessible, Interoperable, Reusable) and ready for downstream AI-based analysis. For the duration of the project, we anticipate the platform to support the mangement, curation, and sharing of data generated by the AI-READI project where we expect to collect diabetes-related multimodal data from 4,000 study participant during 2022-2026 (more details are available on the project website [aireadi.org](https://aireadi.org/)). This repository contains the source code of FAIRhub along with instructions for using the source code as well as pointers to various documentation and resources related to the platform.

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
yarn install
```

#### Compile and Hot-Reload for Development

```sh
yarn dev
```

#### Type-Check, Compile and Minify for Production

```sh
yarn build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

#### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn build
yarn test:e2e # or `npm run test:e2e:ci` for headless testing
```

#### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Deployment

### fairhub.io

This repository is automatically deployed to [Azure](https://azure.microsoft.com/en-us/products/app-service/static/) on every push to the repository. If you need to reference a specific branch or pull request, you can do so by using the following URL pattern:

- <https://brave-ground-07b6bfb10->`BRANCH_NAME`.centralus.2.azurestaticapps.net
- <https://brave-ground-07b6bfb10->`GITHUB_PR_NUMBER`.centralus.2.azurestaticapps.net

The `production` branch is automatically deployed to the following URL: [fairhub.io](https://fairhub.io).

### style.fairhub.io

The storybook for the FAIRhub UI library is automatically deployed to [Azure](https://azure.microsoft.com/en-us/products/app-service/static) on every push to the repository. If you need to reference a specific branch or pull request, you can do so by using the following URL pattern:

- <https://white-ocean-00e852610-->`BRANCH_NAME`.centralus.2.azurestaticapps.net
- <https://white-ocean-00e852610-->`GITHUB_PR_NUMBER`.centralus.2.azurestaticapps.net

The `production` branch is automatically deployed to the following URL: [style.fairhub.io](https://style.fairhub.io).

## Documentation

### User documentation

Our user documentation for FAIRhub is available at [docs.fairhub.io](https://docs.fairhub.io/) (STATUS: not active). The source code of the user documentation is maintained from its dedicated [GitHub repository](https://github.com/AI-READI/docs.fairhub.io).

### Developer documentation

The basic instructions for running a local version of FAIRhub for development purposes are provided above in this README. Details about our high-level development best practices and standards are available at [dev.aireadi.org](https://dev.aireadi.org) (the source code is maintained from its dedicated [GitHub repository](https://github.com/AI-READI/docs.fairhub.io)). Details about our development practices specific to FAIRhub are available at [dev.fairhub.io](https://github.com/AI-READI/dev.aireadi.org) (the source code is maintained from its dedicated [GitHub repository](https://github.com/AI-READI/dev.fairhub.io)).

### APIs documentation

The APIs of FAIRhub are documented at [api.fairhub.io](https://api.fairhub.io/) (STATUS: not active). The source code of the API documentation is maintained from its dedicated [GitHub repository](https://github.com/AI-READI/api.fairhub.io).

### Style guide

We use Storybook for documenting our design system. It is available at [style.fairhub.io](https://style.FAIRhub.io/). You can refer to that for design guidelines, component documentation, and resources for editing components locally. The source code of the storybook in included in this repository in the [storybook](.storybook) folder. Changes between different versions of the storybook are documented in its dedicated [CHANGELOG](CHANGELOG.stories.mdx). Instructions for running the storybook locally for editing and suggesting changes are provided below:

```sh
// You will need to be on node 16.13.0 or higher

yarn install

yarn storybook
```

### Changelog

Changes between different versions of FAIRhub are documented in the [CHANGELOG](CHANGELOG.md).

## Inputs and Outputs

The typical inputs of FAIRhub will be clinical and biomedical research related data uploaded by the users. The typical output of FAIRhub will be FAIR and AI-ready datasets shared by the users.

## Contributing

<a href="https://github.com/AI-READI/aireadi.org/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AI-READI/aireadi.org" />
</a>

Contributions are always welcome!

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](./contributing.md) for more information on what we're looking for and how to get started.

We recommend to look at the [documentation](https://dev.fairhub.io/) for more information.

## Issues and Feedback

If you have any questions or suggestions, please contact us using [GitHub issues](https://github.com/AI-READI/fairhub.io/issues/new).

## License

This work is licensed under
[MIT](https://opensource.org/licenses/mit). See [LICENSE](https://github.com/AI-READI/fairhub.io/blob/main/LICENSE) for more information.

<a href="https://aireadi.org" >
  <img src="https://www.channelfutures.com/files/2017/04/3_0.png" height="30" />
</a>

## How to cite

If you are using FAIRhub or reusing the source code from this repository for any purpose, please cite:

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
