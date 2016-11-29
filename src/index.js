/* 
 * restraint: 
 *   1. common code: import 'xx';
 *   2. export: export xx from xx, export x, { xx } from 'xx';
 *   
 */


import Module from 'module';
import path from 'path';
import fs from 'fs';
import * as babylon from "babylon";
import traverse from "babel-traverse";
import * as t from 'babel-types';

const recharts = 'recharts';
const rechartsLib = 'recharts/lib';

const _module = new Module();

const rechartsLibPath = path.dirname(Module._resolveFilename('recharts', {
  ..._module,
  paths: Module._nodeModulePaths(process.cwd()),
}));
const rechartsPath = path.join(rechartsLibPath, '..');
const rechartsSrcPath = path.join(rechartsPath, 'src');
const rechartsSrcIndexPath = path.join(rechartsSrcPath, 'index.js');
const srcCode = fs.readFileSync(rechartsSrcIndexPath, 'utf-8');

const srcAst = babylon.parse(srcCode, {
  sourceType: 'module',
  plugins: ["exportExtensions"],
});

function findPath(source) {
  const finalModule = {
    ..._module,
    paths: Module._nodeModulePaths(rechartsSrcPath),
  };

  const [id, paths] = Module._resolveLookupPaths(source, finalModule);
  const finalPaths = [...paths, rechartsSrcPath];

  const absPath = Module._findPath(source, finalPaths);

  if (absPath.indexOf(path.join(rechartsPath, 'node_modules')) >= 0) {
    // node_modules source
    return source;
  }

  return 'recharts/lib/' + path.relative(rechartsSrcPath, absPath);
}

let pkgMap = {};
let commonImport = [];

traverse(srcAst, {
  ImportDeclaration(path) {
    const { source, specifiers } = path.node;

    if (!specifiers.length) {
      // get common import like import 'polyfill'
      commonImport = [...commonImport, source.value];
    }
  },

  ExportNamedDeclaration(path) {
    const { source, specifiers } = path.node;

    specifiers.forEach(spec => {
      const { exported, local } = spec;

      if (t.isExportDefaultSpecifier(spec)) {
        pkgMap = {
          ...pkgMap,
          [exported.name]: source.value,
        };
      } else {
        pkgMap = {
          ...pkgMap,
          [exported.name]: [source.value, local.name],
        };
      }
    });
  },
});

Object.keys(pkgMap).forEach(key => {
  const pkgMapVal = pkgMap[key];

  if (Array.isArray(pkgMapVal)) {
    const source = findPath(pkgMapVal[0]);

    pkgMap[key] = [source, ...pkgMap.slice(1)];
  }

  pkgMap[key] = findPath(pkgMapVal);
});

commonImport = commonImport.map(source => {
  return findPath(source);
});

console.log(pkgMap, commonImport);

export default function ({types: t}) {
  // import common code once in a file
  let hasAddCommonCode = false;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        const { specifiers, source } = node;
        const { value: pkgId } = source;
        const specs = [];

        if (pkgId !== recharts) {
          return ;
        }

        if (!specifiers.filter(t.isImportSpecifier).length) {
          return;
        }

        specifiers.forEach(spec => {
          const { local , imported } = spec;
          const { name: localName } = local;

          let importedPath = recharts;

          if (t.isImportSpecifier(spec)) {
            const { name: importedName } = imported;

            spec = t.importDefaultSpecifier(t.identifier(localName));

            if (!pkgMap[importedName]) {
              throw new Error(`Recharts ${importedName} was not in known modules.`);
            }

            importedPath = pkgMap[importedName];
          }

          path.insertAfter(t.importDeclaration([spec], t.stringLiteral(importedPath)));

          if (!hasAddCommonCode) {
            hasAddCommonCode = true;
            commonImport.forEach(cPath => {
              path.insertAfter(t.importDeclaration([], t.stringLiteral(cPath)));
            });
          }
        });

        path.remove();
      }
    }
  };
}
