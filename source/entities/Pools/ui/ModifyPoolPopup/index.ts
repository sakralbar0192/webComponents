import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IModifyPoolPopupResultEventDetail } from './types'
import { ModifyPoolPopup } from './ui/ModifyPoolPopup'

export async function defineModifyPoolPopup() {
    defineCustomElement(ECustomElements.modifyPoolPopup, ModifyPoolPopup)
}

export type TModifyPoolPopup = ModifyPoolPopup;

export { IModifyPoolPopupResultEventDetail }
