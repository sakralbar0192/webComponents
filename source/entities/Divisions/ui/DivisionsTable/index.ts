import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IChooseDivisionEvent, IModifyDivisionEvent } from './types'
import { DivisionsTable } from './ui/DivisionsTable'

export function defineDivisionsTable() {
    defineCustomElement(ECustomElements.divisionsTable, DivisionsTable)
}

export type TDivisionsTable = DivisionsTable;

export { DivisionsTable, IModifyDivisionEvent, IChooseDivisionEvent }
