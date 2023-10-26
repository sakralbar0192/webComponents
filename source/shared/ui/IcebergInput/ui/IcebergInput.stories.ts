import { Meta, StoryObj } from '@storybook/web-components'
import { defineIcebergInput, EIcebergInputTypeAttribute } from '..'

defineIcebergInput()

const meta: Meta = {
    title: 'Shared/IcebergInput',
    component: 'iceberg-input',
    tags: ['autodocs'],
    args: {
        placeholder: 'Any placeholder',
        value: 'some text',
        maxLength: 10,
    },
    argTypes: {
        type: {
            options: [
                EIcebergInputTypeAttribute.TEXT,
                EIcebergInputTypeAttribute.SEARCH,
                EIcebergInputTypeAttribute.PASSWORD,
                EIcebergInputTypeAttribute.NUMBER,
                EIcebergInputTypeAttribute.EMAIL
            ],
            control: { type: 'radio' },
            description: 'The type of input, such as the usual',
            defaultValue: {
                summary: EIcebergInputTypeAttribute.TEXT
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Is the input disabled',
            defaultValue: {
                summary: false
            },
        },
        maxLength: {
            control: 'number',
            description: 'Attribute defines the maximum number of characters the user can enter into an input'
        }
    }
}
export default meta

type Story = StoryObj;

export const IcebergInput: Story = {}
