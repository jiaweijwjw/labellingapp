# DSOViz Toolkit

[![vue.js](https://img.shields.io/badge/vue.js-2.6.10-blue)](https://github.com/vuejs/vue)
[![quasar](https://img.shields.io/badge/quasar-1.5.4-blue)](https://github.com/quasarframework/quasar)

A fast, modern, reactive visualisation toolkit. The DSOViz Toolkit puts together a comprehensive suite of visualisation and visual analytics components.

## Getting Started

To get started follow the following steps to get a hot-reloading development server up and running. 
There's a [guide](docs/setup_dev_environment.md) to setup the pre-getting-started development environment required if you're lost at this stage.

### Check out the code
```bash
git clone https://github.com/eugenesiow/dso-viz.git
```

### Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

## Component Branches

Projects that implement rich visualisation components and visualisation full stacks that haven't yet been integrated into the master.

* [Trending/SandDance](https://github.com/eugenesiow/dso-viz/tree/nhs-test) - Visualise individual datapoints, not aggregates, all at once in 3D and transit between layouts.
* [Graph/CytoscapeJS](https://github.com/eugenesiow/dso-viz/tree/rying) - A graph visualisation that implements temporal playback on a concentric CytoscapeJS layout.

## Open Projects

Potential project options for IA students.

* [Trending/Perspective](docs/project_trending_perspective.md)
* [Trending/MillionDatapoints](docs/project_million_datapoints.md)