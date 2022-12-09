import path from 'path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const extensions = ['json', 'yaml', 'yml'];
const styles = ['stylish', 'plain', 'json'];
const getFixturePath = (filename) => path.join(cwd(), '__fixtures__', filename);

const results = styles.reduce((acc, style) => ({
  [style]: readFileSync(getFixturePath(`result_${style}.txt`), 'utf-8'),
  ...acc,
}), {});

test.each(extensions)('gendiff %s files', (extension) => {
  const path1 = getFixturePath(`file1.${extension}`);
  const path2 = getFixturePath(`file2.${extension}`);

  expect(genDiff(path1, path2)).toEqual(results.stylish);
  expect(genDiff(path1, path2, 'stylish')).toEqual(results.stylish);
  expect(genDiff(path1, path2, 'plain')).toEqual(results.plain);
  expect(genDiff(path1, path2, 'json')).toEqual(results.json);
});
