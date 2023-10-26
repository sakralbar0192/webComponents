import { IPossibleManagerItem, IUserItem } from 'entities/Users/types'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'
import { IIcebergCheckboxChangeEventDetail, IIcebergCheckboxChangeEvent } from 'shared/ui/IcebergCheckbox'

export interface IUpdateManagersPopupResultEvent extends IPopupResultEvent {
    detail: IUpdateManagersPopupResultEventDetail;
}

export interface IUpdateManagersPopupResultEventDetail extends IPopupResultEventDetail {
    Managers?: IUserItem[]
}

export interface IPossibleManagerCheckboxChangeEvent extends IIcebergCheckboxChangeEvent {
    detail: IPossibleManagerCheckboxChangeEventDetail
}

export interface IPossibleManagerCheckboxChangeEventDetail extends IIcebergCheckboxChangeEventDetail {
    key: IPossibleManagerItem
}
