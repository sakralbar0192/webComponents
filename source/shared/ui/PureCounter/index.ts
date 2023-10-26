import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { PureCounter } from './ui/PureCounter'

export async function definePureCounter() {
    defineCustomElement(ECustomElements.pureCounter, PureCounter)
}