import { IUserItem } from 'entities/Users/types'
import { IIcebergCheckboxChangeEvent, IIcebergCheckboxChangeEventDetail } from 'shared/ui/IcebergCheckbox'
import { TIcebergInput } from 'shared/ui/IcebergInput'

export interface IUserItemInfo {
    userItem: IUserItem
    dateField: TIcebergInput
}

export interface IIcebergCheckboxInAssignTableChangeEvent extends IIcebergCheckboxChangeEvent {
    detail: IIcebergCheckboxInAssignTableChangeEventDetail
}

export interface IIcebergCheckboxInAssignTableChangeEventDetail extends IIcebergCheckboxChangeEventDetail {
    key: IUserItemInfo
}
