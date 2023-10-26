import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { ManagersTable } from './ui/ManagersTable'

export async function defineManagersTable() {
    defineCustomElement(ECustomElements.managersTable, ManagersTable)
}

export type TManagersTable = ManagersTable;
