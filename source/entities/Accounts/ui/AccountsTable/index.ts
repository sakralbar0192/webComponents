import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { AccountsTable } from './ui/AccountsTable'

export function defineAccountsTable() {
    defineCustomElement(ECustomElements.accountsTable, AccountsTable)
}

export type TAccountsTable = AccountsTable;

export { AccountsTable }
