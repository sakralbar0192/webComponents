import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { DivisionsPage } from './ui/DivisionsPage';

(function defineDivisionsPage() {
    defineCustomElement(ECustomElements.divisionsPage, DivisionsPage)
})()
