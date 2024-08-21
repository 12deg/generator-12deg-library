import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  { 
    ignores: [
      "**/.giignore",
      "**/templates",
      "coverage",
      "eslint.config.js",
      "ship.config.cjs",
    ]
  }
];
