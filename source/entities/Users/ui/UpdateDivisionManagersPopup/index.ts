import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IUpdateManagersPopupResultEventDetail } from './types'
import { UpdateDivisionManagersPopup } from './ui/UpdateDivisionManagersPopup'

export async function defineUpdateDivisionManagersPopup() {
    defineCustomElement(ECustomElements.updateDivisionManagersPopup, UpdateDivisionManagersPopup)
}

export type TUpdateDivisionManagersPopup = UpdateDivisionManagersPopup;

export { IUpdateManagersPopupResultEventDetail }
