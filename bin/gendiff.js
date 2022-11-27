#! /usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <formatType>', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    try {
      const diff = genDiff(filePath1, filePath2, options.format);
      console.log(diff);
    } catch (e) {
      console.log(e.message);
    }
  });

program.parse();
