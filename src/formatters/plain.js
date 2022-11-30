import _ from 'lodash';

const plain = (tree) => {
  const iter = (el, ancestors) => {
    if (!Array.isArray(el)) {
      return [];
    }

    const format = (data) => {
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
          value,
          children,
          oldValue,
          newValue,
          type,
        } = line;

        const currentAncestors = ancestors === '' ? `${name}` : `${ancestors}.${name}`;

        if (type === 'changed') {
          return `Property '${currentAncestors}' was updated. From ${format(oldValue)} to ${format(newValue)}`;
        }

        if (type === 'added') {
          return `Property '${currentAncestors}' was added with value: ${format(value)}`;
        }

        if (type === 'removed') {
          return `Property '${currentAncestors}' was removed`;
        }

        if (type === 'nested') {
          return iter(children, currentAncestors);
        }

        return [];
      });

      return resultLines;
    };

    return [...formatLines(el)].join('\n');
  };

  return iter(tree, '');
};

export default plain;
