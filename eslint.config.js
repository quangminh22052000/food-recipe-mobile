import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import tseslint from "typescript-eslint"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // ✅ Định nghĩa môi trường Node cho các file cấu hình như app.config.js
  {
    files: ["app.config.js", "babel.config.js", "metro.config.js"],
    languageOptions: {
      env: {
        node: true,
      },
      globals: {
        process: "readonly",
      },
    },
  },

  // ✅ Cấu hình cho source code
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
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
]

export default config
