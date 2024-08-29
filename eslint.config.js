import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPrettier from "eslint-plugin-prettier/recommended";

export default [
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  eslintPrettier,
  { 
    ignores: [
      "**/.gitignore",
      "**/templates",
      "coverage",
      "eslint.config.js",
      "ship.config.cjs",
    ]
  }
];
