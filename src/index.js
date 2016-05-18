import Module from 'module';
import path from 'path';
import fs from 'fs';

const recharts = 'recharts';
const rechartsLib = 'recharts/lib';

const _module = new Module();

const rechartsPath = path.dirname(Module._resolveFilename('recharts', {
  ..._module,
  paths: Module._nodeModulePaths(process.cwd()),
}));

const indexFile = fs.readFileSync(rechartsPath + '/../src/index.js', 'utf-8');
const regStr = 'export ([\\S]+) from \'([\\S]+)\';';

const regx = new RegExp(regStr);
const globalRegx = new RegExp(regStr, 'g');

const pkgMap = indexFile.match(globalRegx)
  .map(exp => exp.match(regx).slice(1))
  .reduce((result, [pkgId, path]) => {
    return {
      ...result,
      [pkgId]: path.slice(1),
    };
  }, {});

export default function ({types: t}) {
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

            importedPath += pkgMap[importedName];
          }

          path.insertAfter(t.importDeclaration([spec], t.stringLiteral(importedPath)));
        });

        path.remove();
      }
    }
  };
}
