// @ts-nocheck -- eslint-plugin-drizzle has no type declarations
import nextPlugin from "eslint-config-next";
import drizzle from "eslint-plugin-drizzle";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next/**", "drizzle/**"] },
  ...nextPlugin,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: { drizzle },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      // New in eslint-plugin-react-hooks v7; several hooks intentionally set
      // state from an effect to hydrate browser-only values (localStorage,
      // matchMedia) after mount without causing an SSR hydration mismatch.
      "react-hooks/set-state-in-effect": "warn",
      "drizzle/enforce-delete-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
    },
  },
);
