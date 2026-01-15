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
    globals: { vue: 'Vue', 'element-ui': 'ELEMENT' },
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
        resolve({ extensions: ['.vue', '.js', '.json'],
            preferBuiltins: false
         }),
        commonjs(),
        json(),
        vue({
            css: true,
            compileTemplate: true
        }),
        babel({
            extensions: ['.vue', '.js'],
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            configFile: './babel.config.js'
        }),

        terser({
            ecma: 5,
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
