# MoostoreJS

## TOC

- [Extension lists](#extension-lists)
- [Requirement](#requirement)
- [Installation](#installation)
- [Usage](#usage)

## Extension Lists

Here is list of available extension for moostoreJS

| Repository                                                             | Version | Author                |
|------------------------------------------------------------------------|---------|-----------------------|
| [moostorejs-gofood](https://github.com/kodingworks/moostore-js-gofood) | dev     | (official) MoostoreJS |

## Requirement

> To run this library without any bugs, please use below recommended dependency

- cheerio: ^1.0.0
- puppeteer: ^8.0.0

## Installation

npm

```
npm install git+https://github.com/kodingworks/moostore-js.git
```

## Usage

Detailed version is available on extension's library

Here, we just cover basic usage

```ts
import MoostoreJS from 'moostorejs'

const moostore = new MoostoreJS
```

after init it on a constant, we can inject it to extension class