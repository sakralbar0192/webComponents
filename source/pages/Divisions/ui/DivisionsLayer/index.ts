import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'

export async function asyncDefineDivisionsLayer() {
    const { DivisionsLayer } = await import('./ui/DivisionsLayer')
    defineCustomElement(ECustomElements.divisionsLayer, DivisionsLayer)
}
