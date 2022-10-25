// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "rules": {
    "max-len": [
      "off", { "code": 80 },
    ],
    "object-curly-spacing": [
      "error", "always",
    ],
    "require-jsdoc": 0,
    "no-unused-vars": 1,
    "no-undef": 1,
    "quotes": 1,
    "camelcase": 0,
    "indent": 0,
  },
};
