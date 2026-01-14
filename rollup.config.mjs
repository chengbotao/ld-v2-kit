import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import clear from "rollup-plugin-clear";
import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";

const { name, version, author } = pkg;
const outputConf = {
    banner: `/* ${name} version ${version} */`,
    footer: `/* Follow me on GitHub! @${author} */`,
};

export default {
    input: "packages/main.js",
    output: [
        {
            file: "dist/index.esm.js",
            format: "esm",
            ...outputConf,
        },
        {
            file: "dist/index.umd.js",
            format: "umd",
            name: name,
            ...outputConf,
        },
    ],
    plugins: [
        clear({ targets: ["dist"] }),
        resolve(),
        vue({
            css: true,
            compileTemplate: true
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env']
        }), commonjs(), json(), terser({
            output: {
                comments: (_, comment) => {
                    const text = comment.value;
                    return text.includes('ld-v2-kit version') || text.includes('Follow me on GitHub! @');
                }
            }
        })],

};
