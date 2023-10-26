import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { SearchPage } from './ui/SearchPage'

export async function defineSearchPage() {
    defineCustomElement(ECustomElements.searchPage, SearchPage)
}
