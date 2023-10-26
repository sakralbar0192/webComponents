import { ResolveOptions } from 'webpack'
import { IBuildOptions } from './types/config'

export function buildResolvers({sourcePath}: IBuildOptions): ResolveOptions {
    return {
        extensions: ['.ts', '.js'],
        preferAbsolute: true,
        modules: [
            sourcePath,
            'node_modules'
        ],
        mainFiles: ['index'],
        alias: {}
    }
}
