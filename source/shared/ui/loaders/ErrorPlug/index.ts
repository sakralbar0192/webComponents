import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { ErrorPlug } from './ui/ErrorPlug'

export function defineErrorPlug() {
    defineCustomElement(ECustomElements.errorPlug, ErrorPlug)
}

export type TErrorPlug = ErrorPlug
