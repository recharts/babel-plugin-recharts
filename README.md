# babel-plugin-recharts

A babel plugin help you import less Recharts modules.

[![npm version](https://badge.fury.io/js/babel-plugin-recharts.png)](https://badge.fury.io/js/babel-plugin-recharts)
[![build status](https://travis-ci.org/recharts/babel-plugin-recharts.svg)](https://travis-ci.org/recharts/babel-plugin-recharts)
[![npm downloads](https://img.shields.io/npm/dt/babel-plugin-recharts.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-recharts)

## install

```sh
$ npm i -D babel-plugin-recharts
```

## Example

The plugin automatically compiles `recharts` import, like this:

```jsx
import { Line, Area, Pie, Treemap, Cell } from 'recharts';
```

babel plugin will be parsed into:

```js
"use strict";

require("recharts/lib/polyfill.js");

var _Line = _interopRequireDefault(require("recharts/lib/cartesian/Line.js"));

var _Area = _interopRequireDefault(require("recharts/lib/cartesian/Area.js"));

var _Treemap = _interopRequireDefault(require("recharts/lib/chart/Treemap.js"));

var _Pie = _interopRequireDefault(require("recharts/lib/polar/Pie.js"));

var _Cell = _interopRequireDefault(require("recharts/lib/component/Cell.js"));

var _recharts = _interopRequireDefault(require("recharts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

Hence you end up loading less modules.

## Usage

You can choose to *either* edit your custom Babel configuration *or* your Webpack configuration. [Both options work.](https://github.com/recharts/babel-plugin-recharts/issues/7).

### .babelrc

```js
{
  "plugins": ["recharts"]
  ...
}
```

### webpack.config.js

```js
'module': {
  'loaders': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'query': {
      'plugins': ['recharts'],
      ...
    }
  }]
}
```

## Limitations

* You must use ES2015 imports to load recharts

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-2021 Recharts Group
