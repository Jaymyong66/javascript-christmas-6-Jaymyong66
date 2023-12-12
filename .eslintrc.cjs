module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "operator-linebreak": ["error", "before"],
    "max-depth": ["error", 2],
    'no-var': 2,
    'prefer-const': 2,
    'no-undef': 2,
    'no-unused-vars': 2,
    'max-lines-per-function': ['error', 15],
  },
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      js: "never",
    },
  ],
};