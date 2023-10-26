import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IcebergDateInput } from './ui/IcebergDateInput'

export function defineIcebergDateInput() {
    defineCustomElement(ECustomElements.icebergDateInput, IcebergDateInput)
}

export type TIcebergDateInput = IcebergDateInput;
