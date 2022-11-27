import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const path1 = resolve(cwd(), filePath1);
  const path2 = resolve(cwd(), filePath2);

  const obj1 = parse(readFileSync(path1, 'utf-8'), extname(path1));
  const obj2 = parse(readFileSync(path2, 'utf-8'), extname(path1));

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.sort().map((key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);

    if (inObj1 && !inObj2) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (!inObj1 && inObj2) {
      return `  + ${key}: ${obj2[key]}`;
    }

    const isChanged = obj1[key] !== obj2[key];

    if (isChanged) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }

    return `    ${key}: ${obj1[key]}`;
  }).join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
