import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IChooseDateEvent } from './types'
import { IcebergCalendar } from './ui/IcebergCalendar'

export function defineIcebergCalendar() {
    defineCustomElement(ECustomElements.icebergCalendar, IcebergCalendar)
}

export type TIcebergCalendar = IcebergCalendar;

export { IChooseDateEvent }
