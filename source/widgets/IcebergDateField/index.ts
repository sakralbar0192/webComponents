import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IChangeCurrentDateEvent } from './types'
import { IcebergDateField } from './ui/IcebergDateField'

export function defineIcebergDateField() {
    defineCustomElement(ECustomElements.icebergDateField, IcebergDateField)
}

export type TIcebergDateField = IcebergDateField;

export { IChangeCurrentDateEvent }
