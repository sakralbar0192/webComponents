import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IcebergSearchField } from './ui/IcebergSearchField'
import { IIcebergSearchFieldSearchEventDetail, IIcebergSearchFieldSearchEvent } from './types'

export function defineIcebergSearchField() {
    defineCustomElement(ECustomElements.icebergSearchField, IcebergSearchField)
}

export type TIcebergSearchField = IcebergSearchField;

export { IIcebergSearchFieldSearchEventDetail, IIcebergSearchFieldSearchEvent }
