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

var _XAxis = require('recharts/lib/cartesian/XAxis');

var _XAxis2 = _interopRequireDefault(_XAxis);

var _YAxis = require('recharts/lib/cartesian/YAxis');

var _YAxis2 = _interopRequireDefault(_YAxis);

var _CartesianGrid = require('recharts/lib/cartesian/CartesianGrid');

var _CartesianGrid2 = _interopRequireDefault(_CartesianGrid);

var _Area = require('recharts/lib/cartesian/Area');

var _Area2 = _interopRequireDefault(_Area);

var _AreaChart = require('recharts/lib/chart/AreaChart');

var _AreaChart2 = _interopRequireDefault(_AreaChart);

var _Tooltip = require('recharts/lib/component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ResponsiveContainer = require('recharts/lib/component/ResponsiveContainer');

var _ResponsiveContainer2 = _interopRequireDefault(_ResponsiveContainer);

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
'use strict';

require('core-js/es6/math');

require('recharts/lib/polyfill.js');

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

## Limitations

* You must use ES2015 imports to load recharts

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-2016 Recharts Group
