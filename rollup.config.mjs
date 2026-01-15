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
    external: ["vue", "element-ui"],
    plugins: [
        clear({ targets: ["dist"] }),
        resolve(),
        vue({
            css: true,
            compileTemplate: true
        }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            plugins: ['@babel/plugin-transform-runtime'],
            presets: [['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not dead']
                }
            }]]
        }),
        commonjs(),
        json(),
        terser({
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 2,
                pure_funcs: ['console.log', 'console.warn']
            },
            output: {
                comments: (_, comment) => {
                    const text = comment.value;
                    return text.includes('ld-v2-kit version') || text.includes('Follow me on GitHub! @');
                }
            }
        })
    ],
};
