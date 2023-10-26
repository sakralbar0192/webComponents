import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IIcebergCheckboxChangeEvent, IIcebergCheckboxChangeEventDetail, EIcebergCheckboxTypes, EIcebergCheckboxPositioningTypes } from './types'
import { IcebergCheckbox } from './ui/IcebergCheckbox'

export function defineIcebergCheckbox() {
    defineCustomElement(ECustomElements.icebergCheckbox, IcebergCheckbox)
}

type TIcebergCheckbox = IcebergCheckbox;

export { IIcebergCheckboxChangeEvent, IIcebergCheckboxChangeEventDetail, EIcebergCheckboxTypes, TIcebergCheckbox, EIcebergCheckboxPositioningTypes }
