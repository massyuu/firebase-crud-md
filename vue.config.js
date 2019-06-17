module.exports = {
    devServer: {
        port: 8891,
        host: 'localhost',
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    exclude: /node_modules/,
                    use: [
                        'vue-loader',
                        {
                            loader: 'markdown-to-vue-loader'
                        },
                    ],
                },
            ],
        },
    }
}
