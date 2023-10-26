import { defineCustomElement } from 'shared/helpers/defineCustomElement'
import { ECustomElements } from 'shared/types/customElements'
import { IMultipleSelectOption, IMultipleSelectCheckboxChangeEvent, IMultipleSelectCheckboxChangeEventDetail, IMultipleSelectAwaitedOptionsEventDetail, IMultipleSelectAwaitedOptionsEvent } from './types'
import { IcebergMultipleSelect } from './ui/IcebergMultipleSelect'

export function defineIcebergMultipleSelect() {
    defineCustomElement(ECustomElements.icebergMultipleSelect, IcebergMultipleSelect)
}

export { IMultipleSelectCheckboxChangeEvent, IMultipleSelectOption, IMultipleSelectCheckboxChangeEventDetail, IMultipleSelectAwaitedOptionsEventDetail, IMultipleSelectAwaitedOptionsEvent }
