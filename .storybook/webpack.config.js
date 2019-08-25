module.exports = function({ config }) {
  config.module.rules.unshift(
    {
      test: /stories(.*)\.js$/,
      loaders: [{
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
          },
        },
      }],
      enforce: 'pre',
    }
  );

  return config;
};