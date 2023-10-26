import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { IcebergButton } from './ui/IcebergButton'
import { ECustomElements } from 'shared/types/customElements'
import { EIcebergButtonSizes, EIcebergButtonTypes } from './types'

export function defineIcebergButton() {
    defineCustomElement(ECustomElements.icebergButton, IcebergButton)
}

type TIcebergButton = IcebergButton

export { EIcebergButtonSizes, EIcebergButtonTypes, TIcebergButton }

