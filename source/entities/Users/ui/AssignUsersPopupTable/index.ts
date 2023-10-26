import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { AssignUsersPopupTable } from './ui/AssignUsersPopupTable'

export async function defineAssignUsersPopupTable() {
    defineCustomElement(ECustomElements.assignUsersPopupTable, AssignUsersPopupTable)
}

export type TAssignUsersPopupTable = AssignUsersPopupTable;
