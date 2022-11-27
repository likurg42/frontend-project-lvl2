import _ from 'lodash';

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const isDiff = Array.isArray(currentValue);

    const formatLines = (data, isObjDiff) => {
      if (isObjDiff) {
        return data.map((line) => {
          const {
            name,
            oldValue,
            newValue,
            type,
          } = line;

          const oldValueIndent = `${currentIndent.slice(0, -2)}- `;
          const newValueIndent = `${currentIndent.slice(0, -2)}+ `;

          switch (type) {
            case 'changed': {
              return `${oldValueIndent}${name}: ${iter(oldValue, depth + 1)}\n${newValueIndent}${name}: ${iter(newValue, depth + 1)}`;
            }
            case 'added': {
              return `${newValueIndent}${name}: ${iter(newValue, depth + 1)}`;
            }
            case 'removed': {
              return `${oldValueIndent}${name}: ${iter(oldValue, depth + 1)}`;
            }
            default: {
              return `${currentIndent}${name}: ${iter(oldValue, depth + 1)}`;
            }
          }
        });
      }

      return Object.entries(data).map(([key, value]) => {
        const line = `${currentIndent}${key}: ${iter(value, depth + 1)}`;
        return line;
      });
    };

    return [
      '{',
      ...formatLines(currentValue, isDiff),
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
