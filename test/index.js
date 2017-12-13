import assert from 'assert';
import path from 'path';
import fs from 'fs';
import plugin from '../src/index';
import { transformFileSync } from 'babel-core';

describe('cherry-picked modular builds', () => {

  it('should work with cherry-pick modular builds', () => {
    const actualPath = path.join(__dirname, 'feature/actual.js');
    const expectedPath = path.join(__dirname, 'feature/expect.js');

    const actual = transformFileSync(actualPath, {
      'plugins': [plugin],
    }).code;
    const expected = fs.readFileSync(expectedPath, 'utf8');

    assert.strictEqual(actual.trim(), expected.trim());
  });

  it('should throw an error', () => {
    const errorPath = path.join(__dirname, 'error/actual.js');

    assert.throws(function() {
      transformFileSync(errorPath, {
        'plugins': [plugin],
      }).code;
    });
  });
});
