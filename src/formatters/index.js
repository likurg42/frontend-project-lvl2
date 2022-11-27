import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain': {
      return plain;
    }
    case 'stylish': {
      return stylish;
    }
    case 'json': {
      return json;
    }
    default: {
      throw new Error('Unknown formatter: '.concat(formatName));
    }
  }
};

export default getFormatter;
