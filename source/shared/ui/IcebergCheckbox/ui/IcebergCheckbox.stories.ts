import { Meta, StoryObj } from '@storybook/web-components'
import { defineIcebergCheckbox, EIcebergCheckboxPositioningTypes, EIcebergCheckboxTypes } from '..'

defineIcebergCheckbox()

const meta: Meta = {
    title: 'Shared/IcebergCheckbox',
    component: 'iceberg-checkbox',
    tags: ['autodocs'],
    args: {
        label: 'label',
        type: EIcebergCheckboxTypes.CHECKBOX,
        positioningType: EIcebergCheckboxPositioningTypes.DEFAULT,
        disabled: false,
        checked: false
    },
    argTypes: {
        label: {
            description: 'Text on checkbox label',
            defaultValue: {
                summary: ''
            }
        },
        type: {
            options: [EIcebergCheckboxTypes.CHECKBOX, EIcebergCheckboxTypes.RADIO],
            control: { type: 'inline-radio' },
            description: 'The type of the checkbox. The checkbox has a square shape, the radio is round',
            defaultValue: {
                summary: EIcebergCheckboxTypes.CHECKBOX
            },
        },
        positioningType: {
            options: [EIcebergCheckboxPositioningTypes.REVERSE],
            control: { type: 'check' },
            description: 'The positioning type of the checkbox. By default, the text is located from the checkbox on the right, when reversed - on the left',
            defaultValue: {
                summary: false
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Is the checkbox disabled',
            defaultValue: {
                summary: false
            },
        },
        checked: {
            control: 'boolean',
            description: 'Is the checkbox checked',
            defaultValue: {
                summary: false
            },
        }
    }
}
export default meta

type Story = StoryObj;

export const IcebergCheckbox: Story = {}
