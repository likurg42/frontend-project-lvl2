import _ from 'lodash';

const stylish = (tree) => {
  const replacer = ' ';
  const spacesCount = 4;
  const diffTypes = {
    added: '+',
    removed: '-',
  };

  const getIndent = (type, depth) => {
    const indentSize = replacer.repeat(spacesCount);

    if (type !== null && type in diffTypes) {
      const indent = indentSize.repeat(depth - 1);
      return `${indent}${replacer.repeat(2)}${diffTypes[type]}${replacer}`;
    }

    const indent = indentSize.repeat(depth);
    return `${indent}`;
  };

  const format = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }

    const lines = Object
      .entries(data)
      .map(([key, value]) => `${getIndent(null, depth)}${key}: ${format(value, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${getIndent(null, depth - 1)}}`,
    ].join('\n');
  };

  const iter = (elem, depth) => {
    const {
      name,
      value,
      children,
      oldValue,
      newValue,
      type,
    } = elem;

    switch (type) {
      case 'unchanged':
      case 'added':
      case 'removed': {
        return `${getIndent(type, depth)}${name}: ${format(value, depth + 1)}`;
      }
      case 'changed': {
        return [
          `${getIndent('removed', depth)}${name}: ${format(oldValue, depth + 1)}`,
          `${getIndent('added', depth)}${name}: ${format(newValue, depth + 1)}`].join('\n');
      }
      case 'nested': {
        return [
          `${getIndent(null, depth)}${name}: {`,
          `${children.map((el) => iter(el, depth + 1)).join('\n')}`,
          `${getIndent(null, depth)}}`,
        ].join('\n');
      }
      default: {
        throw new Error('error');
      }
    }
  };

  return [
    '{',
    tree.map((el) => iter(el, 1)).join('\n'),
    '}',
  ].join('\n');
};

export default stylish;
