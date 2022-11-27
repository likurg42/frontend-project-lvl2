import _ from 'lodash';

const plain = (tree) => {
  const iter = (value, ancestors) => {
    if (!Array.isArray(value)) {
      return [];
    }

    const getDisplayValue = (data) => {
      if (_.isObject(data)) {
        return '[complex value]';
      }

      if (typeof data === 'string') {
        return `'${data}'`;
      }

      return data;
    };

    const formatLines = (data) => {
      const resultLines = data.flatMap((line) => {
        const {
          name,
          oldValue,
          newValue,
          type,
        } = line;

        const currentAncestors = ancestors === '' ? `${name}` : `${ancestors}.${name}`;

        if (type === 'changed') {
          return `Property '${currentAncestors}' was updated. From ${getDisplayValue(oldValue)} to ${getDisplayValue(newValue)}`;
        }

        if (type === 'added') {
          return `Property '${currentAncestors}' was added with value: ${getDisplayValue(newValue)}`;
        }

        if (type === 'removed') {
          return `Property '${currentAncestors}' was removed`;
        }

        return iter(oldValue, currentAncestors);
      });

      return resultLines;
    };

    return [...formatLines(value)].join('\n');
  };

  return iter(tree, '');
};

export default plain;
