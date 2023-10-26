import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { IcebergTable } from './ui/IcebergTable'
import { ECustomElements } from 'shared/types/customElements'
import { ICell, IHeaderCell, EIcebergTableSortingModes, ECellClasses, IRowItem } from './types'

export { IcebergTable, ICell, IHeaderCell, EIcebergTableSortingModes, ECellClasses, IRowItem }

export function defineIcebergTable() {
    defineCustomElement(ECustomElements.icebergTable, IcebergTable)
}

export type TIcebergTable = IcebergTable;
