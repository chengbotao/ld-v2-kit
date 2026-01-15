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
                modules: false
            }
        ]
    ]
}