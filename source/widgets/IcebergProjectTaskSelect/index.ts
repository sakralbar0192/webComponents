import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IcebergProjectTaskSelect } from './ui/IcebergProjectTaskSelect'

export function defineIcebergProjectTaskSelect() {
    defineCustomElement(ECustomElements.icebergProjectTaskSelect, IcebergProjectTaskSelect)
}

export type TIcebergProjectTaskSelect = IcebergProjectTaskSelect;
