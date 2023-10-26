import { Meta, StoryObj } from '@storybook/web-components'
import { defineIcebergSelect } from '..'
import { mockOptions } from '../mock/options'

defineIcebergSelect()

const selectedOptionIdOptions: (number|string)[] = []
mockOptions.forEach(option => {
    if (option.options) {
        return option.options.forEach(innerOption => {
            selectedOptionIdOptions.push(innerOption.id)
        })
    } else {
        selectedOptionIdOptions.push(option.id)
    }
})

const meta: Meta = {
    title: 'Shared/IcebergSelect',
    component: 'iceberg-select',
    tags: ['autodocs'],
    args: {
        options: mockOptions,
        selectedOptionId: 1
    },
    argTypes: {
        options: {
            table: {
                disable: true
            }
        },
        selectedOptionId: {
            control: 'select',
            options: selectedOptionIdOptions
        },
        disabled: {
            control: 'boolean',
            description: 'Is the select disabled',
            defaultValue: {
                summary: false
            }
        }
    }
}
export default meta

type Story = StoryObj;

export const IcebergInput: Story = {}
