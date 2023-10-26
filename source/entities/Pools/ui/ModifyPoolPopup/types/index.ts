import { IPoolItem } from 'entities/Pools/types'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'

export interface IModifyPoolPopupResultEvent extends IPopupResultEvent {
    detail: IModifyPoolPopupResultEventDetail;
}

export interface IModifyPoolPopupResultEventDetail extends IPopupResultEventDetail {
    PoolItem?: IPoolItem
}
