import { IUserItem } from 'entities/Users/types'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'

export interface IEditUserPoolPopupResultEvent extends IPopupResultEvent {
    UserItem?: IUserItem
}

export interface IEditUserPoolPopupResultEventDetail extends IPopupResultEventDetail {
    UserItem?: IUserItem
}
