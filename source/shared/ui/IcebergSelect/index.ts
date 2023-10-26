import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IIcebergSelectChangeEvent, ISelectOption } from './types'
import { IcebergSelect } from './ui/IcebergSelect'

export function defineIcebergSelect() {
    defineCustomElement(ECustomElements.icebergSelect, IcebergSelect)
}

type TIcebergSelect = IcebergSelect

export { IIcebergSelectChangeEvent, ISelectOption, IcebergSelect, TIcebergSelect }
