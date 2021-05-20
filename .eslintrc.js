module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [ '@typescript-eslint' ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    'react-app'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ["error"],
    '@typescript-eslint/explicit-module-boundary-types': ["error"],
    '@typescript-eslint/no-magic-numbers': [
      "error",
      { "ignoreEnums": true, "ignoreNumericLiteralTypes": true, "ignoreArrayIndexes": true, "ignore": [0] }
    ],
    'no-debugger': ["error"],
    'no-console': ["error"],
    'no-alert': ["error"],
    'multiline-ternary': ["warn", "always-multiline"],
    'no-mixed-spaces-and-tabs': ["error"],
    'no-extra-boolean-cast': ["error"],
    'no-unneeded-ternary': ["error"],
    'object-curly-spacing': [
      "error", "always",
      { "objectsInObjects": false, "arraysInObjects": false }
    ],
    'no-multi-spaces': ["error"],
    'indent': ["warn", 2],
    'semi': "error",
    'react/jsx-closing-bracket-location': ["error", "tag-aligned"],
    'react/jsx-first-prop-new-line': ["error", "multiline"],
    'react/jsx-indent': ["error", 2, { 'indentLogicalExpressions': true }]
  }
};
