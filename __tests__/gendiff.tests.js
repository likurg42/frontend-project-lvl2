import path from 'path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(cwd(), '__fixtures__', filename);

const resultStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const resultPlain = 'Property \'common.follow\' was added with value: false\n'
  + 'Property \'common.setting2\' was removed\n'
  + 'Property \'common.setting3\' was updated. From true to null\n'
  + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
  + 'Property \'common.setting5\' was added with value: [complex value]\n'
  + 'Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n'
  + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
  + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
  + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
  + 'Property \'group2\' was removed\n'
  + 'Property \'group3\' was added with value: [complex value]';

const resultJson = JSON.parse(readFileSync(getFixturePath('jsondiff.json'), 'utf-8'));
const resultJsonString = JSON.stringify(resultJson, 0, 2);

test('gendiff json stylish', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(genDiff(path1, path2)).toEqual(resultStylish);
});

test('gendiff yaml', () => {
  const path1 = getFixturePath('file1.yaml');
  const path2 = getFixturePath('file2.yaml');
  expect(genDiff(path1, path2)).toEqual(resultStylish);
  const path3 = getFixturePath('file1.json');
  expect(genDiff(path3, path2)).toEqual(resultStylish);
});

test('gendiff plain', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
  const path3 = getFixturePath('file1.json');
  expect(genDiff(path3, path2, 'plain')).toEqual(resultPlain);
});

test('gendiff json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(genDiff(path1, path2, 'json')).toEqual(resultJsonString);
  const path3 = getFixturePath('file1.yaml');
  expect(genDiff(path3, path2, 'json')).toEqual(resultJsonString);
});
