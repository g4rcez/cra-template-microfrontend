# Create React App Microfrontend

<!-- at least one paragraph -->

Project short description

## Table of Contents

- [Config](#config)
- [Development](#development)
- [Deploy](#deploy)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

## Config

After `create-react app`, you need to configure your `package.json` to define project scope. To do this, change the name on `scope` in `package.json`.
To grant render cache techniques, check all scopes in all projects.

**This name must be equal for all microfrontends under the same orchestrator**

```json
{
  "scope": "mfscope" // micro-frontend-scope
}
```

## Development

To start development server, run:

```bash
yarn start
```

If you need to check css dev errors, run in two different terminals:

```bash
# on first terminal
yarn css
# on second terminal
yarn react
```

Hard to find bugs? Try this debugging methods:

- [VsCode](https://code.visualstudio.com/docs/typescript/typescript-debugging#_clientside-debugging)
- Manual debugging: add `debugger` on your code and open browser Dev Tools

## Deploy

Just run this command:

```bash
yarn build #apply GENERATE_SOURCEMAP=false INLINE_RUNTIME_CHUNK=false to react-scripts
```

## Scripts

All available scripts

### `yarn css`

Start postcss in watch mode to observe all mutation on `src/styles/css/index.css` file or nested imports. Generate a new stylesheet in `src/styles/css/dist.css`.

### `yarn css:prod`

Build all css to production mode, using postcss and flag `NODE_ENV=production`.

### `yarn react`

Starts react development server with fast refresh.

### `yarn start`

Apply `yarn css` and runs `yarn react` with `concurrently`.

### `yarn build`

Compile CSS and JS in production mode, using a custom webpack config to work with render. _This script doesn't generate SOURCE_MAP files and inline javascripts_.

### `yarn build:source-map`

Build only Javascript and current CSS stylesheet, but generate sourcemaps to analyze bundle size.

## Troubleshooting

### My bundle size is too big. Help Me!!!:

First, this project already use code splitting by default. Check your imports on `src/routes/index.tsx` and remember, all components loaded by `React.lazy` must be **export as default**. If your bundle size is still large even with code splitting, try using analyze to identify large libraries in your project.

```bash
yarn build:source-map
yarn analyze
```

### I don't like fast refresh, how to disable?

Assign `FAST_REFRESH=false` before run `start` or `react`: `FAST_REFRESH=false yarn start`
