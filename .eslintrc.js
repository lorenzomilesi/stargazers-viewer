module.exports = {
  root: true,
  extends: [
    "plugin:react/recommended",
    "@react-native-community",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "react-native"],
  rules: {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-native/no-unused-styles": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        args: "none",
      },
    ],
  },
  globals: {
    logger: "readonly",
    localization: "readonly",
  },
};
