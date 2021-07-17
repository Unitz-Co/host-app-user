const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-gatsby',
        {
          targets: {
            browsers: ['>0.25%', 'not dead'],
          },
        },
      ],
    ],
    plugins: [
      'macros',
      [
        'import-graphql',
        {
          nodePath: path.resolve(process.cwd(), '../../modules'),
        },
      ],
    ],
  };
};
