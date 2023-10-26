import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IEditUserPoolPopupResultEventDetail } from './types'
import { EditPoolUserPopup } from './ui/EditPoolUserPopup'

export async function defineEditPoolUserPopup() {
    defineCustomElement(ECustomElements.editPoolUserPopup, EditPoolUserPopup)
}

export type TEditPoolUserPopup = EditPoolUserPopup;

export { IEditUserPoolPopupResultEventDetail }
