import { IProjectItem } from 'entities/Projects/types'
import { IPopupResultEvent, IPopupResultEventDetail } from 'shared/types'

export interface IRemoveProjectPopupResultEvent extends IPopupResultEvent {
    detail: IRemoveProjectPopupResultEventDetail
}

export interface IRemoveProjectPopupResultEventDetail extends IPopupResultEventDetail {
    ProjectItem?: IProjectItem
}
