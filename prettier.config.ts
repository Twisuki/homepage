// prettier.config.ts, .prettierrc.ts, prettier.config.mts, or .prettierrc.mts

import { type Config } from "prettier";

const config: Config = {
  endOfLine: "crlf",
  useTabs: false,
  tabWidth: 2,
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  semi: true,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
  printWidth: 80,
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: true
};

export default config;
