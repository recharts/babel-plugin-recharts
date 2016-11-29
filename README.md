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

The plugin automatically compiles this :

```jsx
import { XAxis, YAxis, CartesianGrid, Area, AreaChart, Tooltip,
  ResponsiveContainer } from 'recharts';
```

into this: 

```js
'use strict';

require('recharts/lib/polyfill.js');

require('core-js/es6/math');

var _Line = require('recharts/lib/cartesian/Line.js');

var _Line2 = _interopRequireDefault(_Line);

var _Area = require('recharts/lib/cartesian/Area.js');

var _Area2 = _interopRequireDefault(_Area);

var _Treemap = require('recharts/lib/chart/Treemap.js');

var _Treemap2 = _interopRequireDefault(_Treemap);

var _Pie = require('recharts/lib/polar/Pie.js');

var _Pie2 = _interopRequireDefault(_Pie);

var _Cell = require('recharts/lib/component/Cell.js');

var _Cell2 = _interopRequireDefault(_Cell);

var _recharts = require('recharts');

var _recharts2 = _interopRequireDefault(_recharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

```

Hence you end up loading less modules.

## Usage

### .babelrc

```js
{
  "plugins": ["recharts"],
  "presets": ["es2015"]
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
      'presets': ['es2015']
    }
  }]
}
```

## Limitations

* You must use ES2015 imports to load recharts

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-2016 Recharts Group
