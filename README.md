# babel-plugin-recharts

A babel plugin help you import less Recharts modules.

[![npm version](https://badge.fury.io/js/babel-plugin-recharts.png)](https://badge.fury.io/js/babel-plugin-recharts)
[![build status](https://travis-ci.org/recharts/babel-plugin-recharts.svg)](https://travis-ci.org/recharts/babel-plugin-recharts)
[![npm downloads](https://img.shields.io/npm/dt/babel-plugin-recharts.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-recharts)


## install
```
$ npm i -D babel-plugin-recharts
```

## Example

from

```
import { Line, Pie, Treemap } from 'recharts';
```

to

```
import Treemap from 'recharts/chart/Treemap';
import Pie from 'recharts/polar/Pie';
import Line from 'recharts/cartesian/Line';
```

## Usage

### .babelrc

```js
{
  "plugins": ["recharts"],
  "presets": ["es2015"]
}
```


### webpack.config.js

```
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
