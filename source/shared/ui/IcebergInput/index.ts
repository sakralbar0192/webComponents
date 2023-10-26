import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IIcebergInputInputEvent, EIcebergInputTypeAttribute, IIcebergInputChangeEvent } from './types'
import { IcebergInput } from './ui/IcebergInput'

export function defineIcebergInput() {
    defineCustomElement(ECustomElements.icebergInput, IcebergInput)
}

export { IIcebergInputInputEvent, EIcebergInputTypeAttribute, IIcebergInputChangeEvent, IcebergInput }

export type TIcebergInput = IcebergInput;
