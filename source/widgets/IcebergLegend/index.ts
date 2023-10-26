import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { ILegendItem, ELegendClasses } from './types'
import { IcebergLegend } from './ui/IcebergLegend'

export function defineIcebergLegend() {
    defineCustomElement(ECustomElements.icebergLegend, IcebergLegend)
}

export { ILegendItem, ELegendClasses }

export type TIcebergLegend = IcebergLegend;
