import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { UsersAssignedIntoDivisionTable } from './ui/UsersAssignedIntoDivisionTable'

export async function defineUsersAssignedIntoDivisionTable() {
    defineCustomElement(ECustomElements.usersAssignedIntoDivisionTable, UsersAssignedIntoDivisionTable)
}

export type TUsersAssignedIntoDivisionTable = UsersAssignedIntoDivisionTable;
