import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IRemoveProjectPopupResultEventDetail } from './types'
import { RemoveProjectPopup } from './ui/RemoveProjectPopup'

export async function defineRemoveProjectPopup() {
    defineCustomElement(ECustomElements.removeProjectPopup, RemoveProjectPopup)
}

export type TRemoveProjectPopup = RemoveProjectPopup;

export { IRemoveProjectPopupResultEventDetail }
