/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "2024",
  },
  plugins: ["import", "prettier"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-extraneous-dependencies": "error",
    "import/order": ["error", {
      "newlines-between": "always",
      "alphabetize": { order: "asc" },
    }],
    "import/namespace": "off",
    "no-console": [
      "error",
      { allow: ["error", "info", "warn", "time", "timeEnd"] },
    ],
  },
}