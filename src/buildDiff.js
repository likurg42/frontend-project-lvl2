import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: _.isObject(obj1[key]) ? _.cloneDeep(obj1[key]) : obj1[key],
        type: 'removed',
      };
    }

    if (!_.has(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        type: 'added',
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        children: _.isObject(obj1[key]) ? buildDiff(obj1[key], obj2[key]) : obj1[key],
        type: 'nested',
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        oldValue: obj1[key],
        newValue: obj2[key],
        type: 'changed',
      };
    }

    return {
      name: key,
      value: obj1[key],
      type: 'unchanged',
    };
  });
};

export default buildDiff;
