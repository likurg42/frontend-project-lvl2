import path from 'path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(cwd(), '__fixtures__', filename);

const stylish = readFileSync(getFixturePath('result_stylish.txt'), {
  encoding: 'utf8',
  flag: 'r',
});
const plain = readFileSync(getFixturePath('result_plain.txt'), {
  encoding: 'utf8',
  flag: 'r',
});
const json = readFileSync(getFixturePath('result_json.txt'), {
  encoding: 'utf8',
  flag: 'r',
});

const result = { stylish, plain, json };

test('gendiff json stylish', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(genDiff(path1, path2)).toEqual(result.stylish);
});

test('gendiff yaml', () => {
  const path1 = getFixturePath('file1.yaml');
  const path2 = getFixturePath('file2.yaml');
  expect(genDiff(path1, path2)).toEqual(result.stylish);
  const path3 = getFixturePath('file1.json');
  expect(genDiff(path3, path2)).toEqual(result.stylish);
  const path4 = getFixturePath('file1.yml');
  const path5 = getFixturePath('file2.yml');
  expect(genDiff(path4, path5)).toEqual(result.stylish);
});

test('gendiff plain', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(genDiff(path1, path2, 'plain')).toEqual(result.plain);
  const path3 = getFixturePath('file1.json');
  expect(genDiff(path3, path2, 'plain')).toEqual(result.plain);
});

test('gendiff json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(genDiff(path1, path2, 'json')).toEqual(result.json);
  const path3 = getFixturePath('file1.yaml');
  expect(genDiff(path3, path2, 'json')).toEqual(result.json);
});
