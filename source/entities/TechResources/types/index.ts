import { IEntityItem } from 'shared/types'

export interface ITechResourceItem extends IEntityItem {
    Status?: string
    ProjectShortName?: string
    ProjectId?: number
    DateStart?: string
    DateEnd?: string
    Price?: number
    Currency?: string
    Physical?: string
}

export interface ITechResourceCategory {
    Category: string
    TechResources: ITechResourceItem[]
}
