import { Meta, StoryObj } from '@storybook/web-components'
import { defineIcebergButton } from '..'
import { EIcebergButtonSizes, EIcebergButtonTypes } from '../types'

defineIcebergButton()

const meta: Meta = {
    title: 'Shared/IcebergButton',
    component: 'iceberg-button',
    tags: ['autodocs'],
    args: {
        text: 'Text',
        type: EIcebergButtonTypes.PRIMARY,
        size: EIcebergButtonSizes.SM,
        disabled: false
    },
    argTypes: {
        text: {
            description: 'The text displayed on the button',
            defaultValue: {
                summary: ''
            }
        },
        type: {
            options: [EIcebergButtonTypes.PRIMARY, EIcebergButtonTypes.OUTLINED],
            control: { type: 'inline-radio' },
            description: 'Defines the color of the text and background for the button',
            defaultValue: {
                summary: EIcebergButtonTypes.PRIMARY
            },
        },
        size: {
            options: [
                EIcebergButtonSizes.XXS,
                EIcebergButtonSizes.XS,
                EIcebergButtonSizes.SM,
                EIcebergButtonSizes.MD
            ],
            control: { type: 'inline-radio' },
            description: 'Defines the size of the button',
            defaultValue: {
                summary: EIcebergButtonSizes.SM
            }
        },
        disabled: {
            control: 'boolean',
            description: 'Is the button disabled',
            defaultValue: {
                summary: false
            },
        },

    }
}
export default meta

type Story = StoryObj;

export const IcebergButton: Story = {}
