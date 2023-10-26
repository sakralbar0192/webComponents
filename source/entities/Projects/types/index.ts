import { IEntityItem } from 'shared/types'

export interface IProjectItem extends IEntityItem {
    CustomerId?: number
    CustomerName?: string
    StartDate?: string
    EndDate?: string
    AccountName?: string
    AccountId?: number
    Supervisors?: IEntityItem[]
    Managers?: IEntityItem[]
    IsDeleteAllowed?: boolean
    IsViewProjectFinancesAllowed?: boolean
}

export interface IProjectTaskInfo {
    ProjectId: number
    ProjectName: string
    ProjectTasks: IProjectTask[]
    RoleId: number
    RoleName: string
}

export interface IProjectTask {
    Id: number
    Name: string
}
