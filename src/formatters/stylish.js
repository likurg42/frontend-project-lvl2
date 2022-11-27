import _ from 'lodash';

const stylish = (tree) => {
  const spacesCount = 4;
  const replacer = ' ';

  const getIndent = (depth) => {
    const indentSize = depth * spacesCount;
    return replacer.repeat(indentSize);
  };

  const format = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }

    return `{\n${Object.entries(data).map(([key, value]) => {
      const line = `${getIndent(depth)}${key}: ${format(value, depth + 1)}`;
      return line;
    }).join('\n')}\n${getIndent(depth - 1)}}`;
  };

  const iter = (line, depth) => {
    const {
      name,
      value,
      children,
      oldValue,
      newValue,
      type,
    } = line;

    const oldValueIndent = `${getIndent(depth).slice(0, -2)}- `;
    const newValueIndent = `${getIndent(depth).slice(0, -2)}+ `;

    switch (type) {
      case 'unchanged': {
        return `${getIndent(depth)}${name}: ${format(value, depth + 1)}`;
      }
      case 'changed': {
        return `${oldValueIndent}${name}: ${format(oldValue, depth + 1)}\n${newValueIndent}${name}: ${format(newValue, depth + 1)}`;
      }
      case 'added': {
        return `${newValueIndent}${name}: ${format(value, depth + 1)}`;
      }
      case 'removed': {
        return `${oldValueIndent}${name}: ${format(value, depth + 1)}`;
      }
      case 'nested': {
        return `${getIndent(depth)}${name}: {\n${children.map((el) => iter(el, depth + 1)).join('\n')}\n${getIndent(depth)}}`;
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
