import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "src/emoji-claps.ts",
    output: {
      file: "dist/emoji-claps.js",
      format: "esm"
    },
    plugins: [typescript()],
    external: [
      "lit-element",
      "@realdennis/next-frame",
      "lodash-es/throttle",
      "suicide-animate",
      "element-animate-throttle"
    ]
  },
  {
    input: "src/emoji-claps.ts",
    output: {
      file: "dist/emoji-claps.umd.js",
      format: "umd",
      name: "emoji-claps"
    },
    plugins: [resolve(), typescript(), terser()]
  }
];
