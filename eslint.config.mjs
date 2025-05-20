import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  { ignores: ["node_modules/", "build/", "dist/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  prettier,
  eslintConfigPrettier,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      "prettier/prettier": "error"
    } 
  }
]);
