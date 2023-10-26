import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { EAssignUsersPopupMods, IAssignUsersPopupResultEventDetail, IAssignTableUserItem, IFilterButtonClickEvent } from './types'
import { AssignUsersPopup } from './ui/AssignUsersPopup'

export async function defineAssignUsersPopup() {
    defineCustomElement(ECustomElements.assignUsersPopup, AssignUsersPopup)
}

export type TAssignUsersPopup = AssignUsersPopup;

export { EAssignUsersPopupMods, IAssignUsersPopupResultEventDetail, IAssignTableUserItem, IFilterButtonClickEvent }
