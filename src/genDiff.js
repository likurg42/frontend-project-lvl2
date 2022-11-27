import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';

const makeDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  return keys.sort().map((key) => {
    const inObj1 = _.has(obj1, key);
    const inObj2 = _.has(obj2, key);
    const changed = obj1[key] !== obj2[key];
    const nested = _.isObject(obj1[key]) && _.isObject(obj2[key]);

    if (!inObj2) {
      return {
        name: key,
        value: _.isObject(obj1[key]) ? _.cloneDeep(obj1[key]) : obj1[key],
        type: 'removed',
      };
    }

    if (!inObj1) {
      return {
        name: key,
        value: _.isObject(obj2[key]) ? _.cloneDeep(obj2[key]) : obj2[key],
        type: 'added',
      };
    }

    if (nested) {
      return {
        name: key,
        children: _.isObject(obj1[key]) ? makeDiffTree(obj1[key], obj2[key]) : obj1[key],
        type: 'nested',
      };
    }

    if (changed) {
      return {
        name: key,
        oldValue: _.isObject(obj1[key]) ? _.cloneDeep(obj1[key]) : obj1[key],
        newValue: _.isObject(obj2[key]) ? _.cloneDeep(obj2[key]) : obj2[key],
        type: 'changed',
      };
    }

    return {
      name: key,
      value: _.isObject(obj1[key]) ? _.cloneDeep(obj1[key]) : obj1[key],
      type: 'unchanged',
    };
  });
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const path1 = resolve(cwd(), filePath1);
  const path2 = resolve(cwd(), filePath2);

  const obj1 = parse(readFileSync(path1, 'utf-8'), extname(path1));
  const obj2 = parse(readFileSync(path2, 'utf-8'), extname(path2));

  const format = getFormatter(formatName);
  const result = makeDiffTree(obj1, obj2);
  return format(result);
};

export default genDiff;
