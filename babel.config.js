module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '58',
                    ie: '11',
                    firefox: '54',
                    safari: '10'
                },
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false // 关闭模块化转换，交给Rollup处理，正确
            }
        ]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            corejs: 3,
            helpers: true,
            regenerator: true
        }]
    ]
}