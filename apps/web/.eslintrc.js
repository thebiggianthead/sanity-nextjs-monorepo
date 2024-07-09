const { resolve } = require("node:path");

module.exports = {
  extends: ["next/core-web-vitals", "@repo/eslint-config"],
  root: true,
  settings: {
    next: {
      rootDir: resolve(__dirname),
    },
    "import/resolver": {
      node: true,
      typescript: {
        project: resolve(__dirname, "./tsconfig.json"),
      },
    },
  },
};
