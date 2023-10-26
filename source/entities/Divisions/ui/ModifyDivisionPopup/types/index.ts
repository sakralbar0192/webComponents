import { IDivisionItem } from 'entities/Divisions/types'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'

export interface IModifyDivisionPopupResultEvent extends IPopupResultEvent {
    detail: IModifyDivisionPopupResultEventDetail;
}

export interface IModifyDivisionPopupResultEventDetail extends IPopupResultEventDetail {
    DivisionItem?: IDivisionItem
}
