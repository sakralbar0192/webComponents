import { type StorybookConfig } from '@storybook/web-components-webpack5'
import path from 'path'
import { buildStyleLoader } from '../build/loaders/buildStyleLoader'

const config: StorybookConfig = {
    stories: ['../../source/**/*.stories.@(js|ts)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions'
    ],
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    },
    webpackFinal: (config) => {
        config.module?.rules?.push(buildStyleLoader(true))

        if (config.resolve) {
            config.resolve.extensions?.push('.ts')
            config.resolve.modules?.push(path.resolve(__dirname, '..', '..', 'source'))
        }

        return config
    }
}
export default config
