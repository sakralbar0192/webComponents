import { IProjectItem } from 'entities/Projects/types'
import { ECRUDModes } from 'shared/types'

export interface IProjectRowDeleteIconClickEvent extends CustomEvent {
    detail: {
        mode: ECRUDModes
        projectItem: IProjectItem
    }
}
