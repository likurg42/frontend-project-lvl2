import yaml from 'js-yaml';

const parse = (data, ext) => {
  switch (ext) {
    case '.json': {
      return JSON.parse(data);
    }
    case '.yaml' || '.yml': {
      return yaml.load(data);
    }
    default: {
      return null;
    }
  }
};

export default parse;
