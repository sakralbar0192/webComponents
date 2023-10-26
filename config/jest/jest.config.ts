import path from 'path'
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    modulePaths: ['<rootDir>/source'],
    moduleNameMapper: {
        '\\.lit.scss$': '<rootDir>/config/testing/litStylesStub.js',
    },
    transform: {
        '^.+\\.(js|ts)$': ['ts-jest', { allowJs: true }],
    },
    transformIgnorePatterns: ['node_modules/(?!@?lit)'],
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/config/jest/jest-setup.ts'],
    rootDir: path.resolve(__dirname, '..', '..')
}

export default jestConfig
