import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'

export async function asyncDefineDivisionDetaisLayer() {
    const { DivisionDetailsLayer } = await import('./ui/DivisionDetailsLayer')
    defineCustomElement(ECustomElements.divisionDetailsLayer, DivisionDetailsLayer)
}
