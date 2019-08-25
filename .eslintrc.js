module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier', 'react-hooks'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'no-await-in-loop': 'off',
    'no-constant-condition': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'react/no-array-index-key': 'off',
    'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
  }
}