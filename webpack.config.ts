import { IBuildEnv } from './config/build/types/config'
import webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import path from 'path'

export default (env: IBuildEnv): webpack.Configuration => {
    const mode = env.mode || 'development'
    const buildPath = path.resolve(__dirname, 'dist')
    const buildName = '/dist/'
    const sourcePath = path.resolve(__dirname, 'source')
    const isDev = mode === 'development'
    const rootDir = path.resolve(__dirname)
    const port = (!Number.isNaN(env.port))
        ? env.port
        : 3000

    const config =  buildWebpackConfig({
        rootDir,
        buildPath,
        buildName,
        sourcePath,
        mode,
        isDev,
        port
    })

    return config
}
