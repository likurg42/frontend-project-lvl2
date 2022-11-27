import path from 'path';
import { cwd } from 'node:process';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const getFixturePath = (filename) => path.join(cwd(), '__fixtures__', filename);

const result = `{
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

test('gendiff json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(stylish(genDiff(path1, path2))).toEqual(result);
});

test('gendiff yaml', () => {
  const path1 = getFixturePath('file1.yaml');
  const path2 = getFixturePath('file2.yaml');
  expect(stylish(genDiff(path1, path2))).toEqual(result);
});
