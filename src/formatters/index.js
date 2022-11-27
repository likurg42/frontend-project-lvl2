import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain': {
      return plain;
    }
    case 'stylish': {
      return stylish;
    }
    default: {
      throw new Error('Unknown formatter: '.concat(formatName));
    }
  }
};

export default getFormatter;
