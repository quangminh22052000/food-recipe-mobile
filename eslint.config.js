// eslint.config.js
import expo from "eslint-config-expo/flat"
import { defineConfig } from "eslint/config"

import reactNative from "@react-native/eslint-plugin"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import importPlugin from "eslint-plugin-import"
import jest from "eslint-plugin-jest"
import prettier from "eslint-plugin-prettier"
import unusedImports from "eslint-plugin-unused-imports"

export default defineConfig([
  ...expo,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        JSX: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier,
      import: importPlugin,
      jest,
      "react-native": reactNative,
      "unused-imports": unusedImports,
    },
    rules: {
      // ✅ Format code theo Prettier
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          trailingComma: "all",
          tabWidth: 2,
          semi: false,
          singleQuote: false,
          bracketSpacing: true,
          printWidth: 80,
        },
      ],

      // ✅ TypeScript & unused
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-function": "off",

      // ✅ Import order: react riêng, internal alias, alphabet hóa
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          warnOnUnassignedImports: true,
        },
      ],
      "import/newline-after-import": "warn",
      "import/no-duplicates": "error",

      // ✅ React
      "react/react-in-jsx-scope": "off",

      // ✅ Jest
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },

  {
    files: ["*.test.ts", "*.test.tsx"],
    languageOptions: {
      env: { jest: true },
    },
  },

  {
    ignores: ["node_modules", "dist", "build", ".expo", "android", "ios"],
  },
])
