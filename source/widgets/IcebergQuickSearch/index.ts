import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IcebergQuickSearch } from './ui/IcebergQuickSearch'

export function defineIcebergQuickSearch() {
    defineCustomElement(ECustomElements.icebergQuickSearch, IcebergQuickSearch)
}

export type TIcebergQuickSearch = IcebergQuickSearch;
