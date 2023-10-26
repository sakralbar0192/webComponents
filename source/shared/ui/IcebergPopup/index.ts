import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IcebergPopup } from './ui/IcebergPopup'
import { getPopupResponse } from './helpers/getPopupResponse'

export function defineIcebergModal() {
    defineCustomElement(ECustomElements.icebergPopup, IcebergPopup)
}

export { IcebergPopup, getPopupResponse }

export type TIcebergPopup = IcebergPopup;
