import _ from 'lodash';

const json = (tree) => {
  const replacer = ' ';
  const spacesCount = 2;

  const getDisplayValue = (data) => {
    if (typeof data === 'string') return `"${data}"`;
    return data;
  };

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return getDisplayValue(currentValue);
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    if (Array.isArray(currentValue)) {
      const lines = Object
        .entries(currentValue)
        .map(([, val], i, list) => {
          const endsWith = i === list.length - 1 ? '' : ',';
          return `${currentIndent}${iter(val, depth + 1)}${endsWith}`;
        });

      return [
        '[',
        ...lines,
        `${bracketIndent}]`,
      ].join('\n');
    }

    const lines = Object
      .entries(currentValue)
      .map(([key, val], i, list) => {
        const endsWith = i === list.length - 1 ? '' : ',';
        return `${currentIndent}"${key}": ${iter(val, depth + 1)}${endsWith}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default json;
