import { IIcebergCheckboxChangeEvent, IIcebergCheckboxChangeEventDetail } from 'shared/ui/IcebergCheckbox'
import { ISelectOption } from 'shared/ui/IcebergSelect'

export interface IMultipleSelectOption extends ISelectOption {
    checked: boolean
    options?: IMultipleSelectOption[]
}

export interface IMultipleSelectCheckboxChangeEvent extends IIcebergCheckboxChangeEvent {
    detail: IMultipleSelectCheckboxChangeEventDetail
}

export interface IMultipleSelectCheckboxChangeEventDetail extends IIcebergCheckboxChangeEventDetail {
    key?: IMultipleSelectOption
    isItSelectAllCheckbox?: boolean
}

export interface IMultipleSelectAwaitedOptionsEvent extends CustomEvent {
    detail: IMultipleSelectAwaitedOptionsEventDetail
}

export interface IMultipleSelectAwaitedOptionsEventDetail {
    options: IMultipleSelectOption[]
}
