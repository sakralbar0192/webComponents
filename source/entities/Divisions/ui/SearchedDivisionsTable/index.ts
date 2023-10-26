import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { SearchedDivisionsTable } from './ui/SearchedDivisionsTable'

export function defineSearchedDivisionsTable() {
    defineCustomElement(ECustomElements.searchedDivisionsTable, SearchedDivisionsTable)
}

export type TSearchedDivisionsTable = SearchedDivisionsTable;

export { SearchedDivisionsTable }
