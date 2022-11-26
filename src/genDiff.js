import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve } from 'path';
import _ from 'lodash';

const genDiff = (filePath1, filePath2) => {
  const path1 = resolve(cwd(), filePath1);
  const path2 = resolve(cwd(), filePath2);

  const file1 = readFileSync(path1);
  const file2 = readFileSync(path2);

  const obj1 = JSON.parse(file1.toString());
  const obj2 = JSON.parse(file2.toString());

  const keys = _.sortBy(_.union([...Object.keys(obj1), ...Object.keys(obj2)]));

  const result = keys.map((key) => {
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
