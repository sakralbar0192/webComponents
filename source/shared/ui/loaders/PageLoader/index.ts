import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { PageLoader } from './ui/PageLoader'

export function definePageLoader() {
    defineCustomElement(ECustomElements.pageLoader, PageLoader)
}
