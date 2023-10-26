import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IModifyDivisionPopupResultEventDetail } from './types'
import { ModifyDivisionPopup } from './ui/ModifyDivisionPopup'

export async function defineModifyDivisionsPopup() {
    defineCustomElement(ECustomElements.modifyDivisionPopup, ModifyDivisionPopup)
}

export type TModifyDivisionPopup = ModifyDivisionPopup;

export { IModifyDivisionPopupResultEventDetail }
