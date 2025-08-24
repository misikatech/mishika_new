import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "build", ".next"], // ✅ Ignored folders
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // ✅ Added node globals for configs
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // ✅ TypeScript recommended rules
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "no-console": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  }
);
