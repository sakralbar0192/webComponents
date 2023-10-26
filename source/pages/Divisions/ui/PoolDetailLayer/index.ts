import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'

export async function asyncDefinePoolDetailsLayer(){
    const {PoolDetailsLayer} = await import('./ui/PoolDetailsLayer')
    defineCustomElement(ECustomElements.poolDetailsLayer, PoolDetailsLayer)
}
