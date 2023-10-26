import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IChoosePoolEvent, IModifyPoolEvent } from './types'
import { PoolsTable } from './ui/PoolsTable'

export async function definePoolsTable() {
    defineCustomElement(ECustomElements.poolsTable, PoolsTable)
}

export type TPoolsTable = PoolsTable;

export { IChoosePoolEvent, IModifyPoolEvent }
