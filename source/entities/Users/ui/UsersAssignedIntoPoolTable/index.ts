import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IUserRowIconClickEvent } from './types'
import { UsersAssignedIntoPoolTable } from './ui/UsersAssignedIntoPoolTable'

export async function defineUsersAssignedIntoPoolTable() {
    defineCustomElement(ECustomElements.usersAssignedIntoPoolTable, UsersAssignedIntoPoolTable)
}

export type TUsersAssignedIntoPoolTable = UsersAssignedIntoPoolTable;

export { IUserRowIconClickEvent }
