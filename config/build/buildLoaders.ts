import webpack from 'webpack'
import { buildStyleLoader } from './loaders/buildStyleLoader'
import { IBuildOptions } from './types/config'

export function buildLoaders({isDev}: IBuildOptions): webpack.RuleSetRule[] {
    const styleLoader = buildStyleLoader(isDev)

    const jsLoader = {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }

    const imageLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
            filename: isDev
                ? 'images/[name].[ext]'
                : 'images/[hash][ext][query]'
        }
    }

    const fontsLoader = {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
            filename: isDev
            ? 'fonts/[name].[ext]'
            : 'fonts/[hash][ext][query]'
        }
    }

    const tsLoader = {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const svgLoaders = {
        test: /\.svg$/,
        loader: 'lit-svg-loader'
    }

    return [
        tsLoader,
        jsLoader,
        imageLoader,
        fontsLoader,
        styleLoader,
        svgLoaders
    ]
}
