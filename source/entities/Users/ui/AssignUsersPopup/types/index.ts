import { IUserItem } from 'entities/Users/types'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'

export enum EAssignUsersPopupMods {
    assignIntoDivision = 'into divisions',
    assignIntoPool = 'into pool',
}

export interface IFilterButtonClickEvent extends CustomEvent {
    detail: IFilterButtonClickEventDetail
}

export interface IFilterButtonClickEventDetail {
    mode: EAssignUsersPopupMods
}

export interface IAssignUsersPopupResultEvent extends IPopupResultEvent {
    detail: IAssignUsersPopupResultEventDetail
}

export interface IAssignUsersPopupResultEventDetail extends IPopupResultEventDetail {
    Users?: IUserItem[]
}

export interface IAssignTableUserItem extends IUserItem {
    AssignedStartDate?: string
    Checked?: boolean
}
