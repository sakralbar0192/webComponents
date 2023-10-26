import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { UsersTable } from './ui/UsersTable'

export function defineUsersTable() {
    defineCustomElement(ECustomElements.usersTable, UsersTable)
}

export type TUsersTable = UsersTable;

export { UsersTable }
