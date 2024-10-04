import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginTypescript from "typescript-eslint";

export default [pluginJs.configs.recommended, pluginPrettier, ...pluginTypescript.configs.recommended];
