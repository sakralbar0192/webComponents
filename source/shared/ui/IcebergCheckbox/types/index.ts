import { TValueOf } from 'shared/types'

export interface IIcebergCheckboxChangeEvent extends CustomEvent {
    detail: IIcebergCheckboxChangeEventDetail
}

export interface IIcebergCheckboxChangeEventDetail {
    checkbox: HTMLInputElement
    checked: boolean
    key?: unknown
}

export const EIcebergCheckboxTypes = {
    CHECKBOX: 'checkbox',
    RADIO: 'radio'
} as const
export type EIcebergCheckboxTypes = TValueOf<typeof EIcebergCheckboxTypes>

export const EIcebergCheckboxPositioningTypes = {
    DEFAULT: '',
    REVERSE: 'reverse'
} as const
export type EIcebergCheckboxPositioningTypes = TValueOf<typeof EIcebergCheckboxPositioningTypes>
