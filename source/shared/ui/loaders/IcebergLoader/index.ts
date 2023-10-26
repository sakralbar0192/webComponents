import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IcebergLoader } from './ui/IcebergLoader'

export function defineIcebergLoader() {
    defineCustomElement(ECustomElements.icebergLoader, IcebergLoader)
}
