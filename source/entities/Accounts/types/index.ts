import { IEntityItem } from 'shared/types'

export interface IAccountItem extends IEntityItem {
    Description?: string
    StartDate?: string
    EndDate?: string
    ProjectsCount?: number
    ManagerName?: string
    ManagerId?: number
}
