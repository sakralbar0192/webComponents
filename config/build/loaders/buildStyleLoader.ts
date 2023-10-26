import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildStyleLoader(isDev: boolean) {
    return {
        test: /\.(scss)$/,
        oneOf: [
            {
                test: /\.lit.scss$/,
                use: [
                    {
                        loader: 'lit-scss-loader',
                        options: {
                            minify: !isDev,
                        },
                    },
                    'extract-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/dist/',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                            modules: {
                                auto: (resPath:string) => Boolean(resPath.includes('.module.')),
                                localIdentName: isDev
                                    ? '[path][name]__[local]--[hash:base64:8]'
                                    : '[hash:base64:8]'
                            }
                        },
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
        ],
    }
}
