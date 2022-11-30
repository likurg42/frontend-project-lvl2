import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'path';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import buildDiff from './buildDiff.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const path1 = resolve(cwd(), filePath1);
  const path2 = resolve(cwd(), filePath2);

  const obj1 = parse(readFileSync(path1, 'utf-8'), extname(path1));
  const obj2 = parse(readFileSync(path2, 'utf-8'), extname(path2));

  const format = getFormatter(formatName);
  const result = buildDiff(obj1, obj2);
  return format(result);
};

export default genDiff;
