import { TValueOf } from 'shared/types'

export interface IIcebergInputInputEvent extends CustomEvent {
    detail: IIcebergInputInputEventDetail
}

export interface IIcebergInputInputEventDetail {
    input: HTMLInputElement
    value: string
}

export interface IIcebergInputChangeEvent extends CustomEvent {
    detail: IIcebergInputChangeEventDetail
}

export interface IIcebergInputChangeEventDetail {
    input: HTMLInputElement
    value: string
}

export const EIcebergInputTypeAttribute = {
    NUMBER: 'number',
    SEARCH: 'search',
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password'
} as const
export type EIcebergInputTypeAttribute = TValueOf<typeof EIcebergInputTypeAttribute>
