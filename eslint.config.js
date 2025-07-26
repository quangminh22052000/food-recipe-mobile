import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import tseslint from "typescript-eslint"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // 🧠 Quy tắc nhóm và thứ tự import
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // React, NodeJS
            "external", // Thư viện ngoài
            "internal", // alias nội bộ như @/
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // ⚠️ Rule khác
      "no-unused-vars": "off",
      "import/no-unresolved": "off",
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
]

export default config
