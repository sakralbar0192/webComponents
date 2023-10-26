export type TBuildMode = 'development' | 'production';

export interface IBuildOptions {
    rootDir: string
    mode: TBuildMode
    buildPath: string
    buildName: string
    sourcePath: string
    isDev: boolean
    port: number
}

export interface IBuildEnv {
    mode: TBuildMode
    port: number
}

export type Entries = Record<string, string>;
type Path = Record<'path', string>;
export type Targets = Record<string, Path>;
