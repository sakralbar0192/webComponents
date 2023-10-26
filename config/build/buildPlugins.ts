import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { IBuildOptions } from './types/config'

export function buildPlugins({isDev}: IBuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isDev
                ? 'styles/[name].css'
                : (pathData) => {
                    if (typeof pathData.chunk !== 'undefined') {
                        return pathData.chunk.name !== 'Login' ? 'styles/[name].[contenthash].css' : 'styles/[name].css'
                    } else return 'styles/[name].css'
                }
        } )
    ]
}
