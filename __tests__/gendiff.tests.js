import path from 'path';
import { cwd } from 'node:process';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(cwd(), '__fixtures__', filename);

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(genDiff(path1, path2)).toEqual(result);
});

test('gendiff yaml', () => {
  const path1 = getFixturePath('file1.yaml');
  const path2 = getFixturePath('file2.yaml');
  expect(genDiff(path1, path2)).toEqual(result);
});
