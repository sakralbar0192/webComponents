import webpack from 'webpack'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { IBuildOptions } from './types/config'
import TerserPlugin from 'terser-webpack-plugin'

export function buildWebpackConfig(options: IBuildOptions): webpack.Configuration {
    const {mode, buildPath, isDev} = options
    return {
        entry: `${options.rootDir}/index.ts`,

        output: {
            path: buildPath,
            filename: isDev
                ? '[name].js'
                : (pathData) => {
                    if (typeof pathData.chunk !== 'undefined') {
                        return pathData.chunk.name !== 'Login'
                            ? '[name].[contenthash].js'
                            : '[name].js'
                    } else return '[name].js'
                },
            clean: true
        },

        module: {
            rules: buildLoaders(options)
        },

        resolve: buildResolvers(options),

        plugins: buildPlugins(options),
        mode: mode,
        optimization: {
            minimize: !isDev,
            minimizer: [new TerserPlugin()],
        },
        stats: isDev
            ? 'minimal'
            : {
                preset: 'minimal',
                warnings: false,
                warningsCount: false,
                errorDetails: false
            },
        devtool: isDev
            ? 'source-map'
            : false,
    }
}
