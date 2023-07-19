/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:storybook/recommended",
  ],
  overrides: [
    {
      extends: ["plugin:cypress/recommended"],
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["unused-imports", "simple-import-sort", "prettier", "sort-keys-custom-order"],
  root: true,
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    // For JS objects sorting
    "sort-keys-custom-order/object-keys": [
      "error",
      { orderedKeys: ["id", "username", "name", "title", "path"] },
    ],
    // For TS types sorting
    "sort-keys-custom-order/type-keys": [
      "error",
      { orderedKeys: ["id", "username", "name", "title", "path"] },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
