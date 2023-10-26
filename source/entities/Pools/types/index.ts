import { IUserItem } from 'entities/Users/types'
import { IEntityItem } from 'shared/types'

export interface IPoolItem extends IEntityItem {
    DivisionId?: number
    DivisionName?: string
    ManagerId?: number
    ManagerName?: string
    UserCount?: number
    Users?: IUserItem[]
}

export const EPoolsMethods = {
    GET_POOLS_NAMES_LIST: '/ResourcePoolService.asmx/GetActiveShortByDivisionId',
    CREATE_POOL: '/ResourcePoolService.asmx/AddPool',
    DELETE_POOL: '/ResourcePoolService.asmx/DeletePool',
    UPDATE_POOL: '/ResourcePoolService.asmx/UpdatePool',
    GET_POOL_DETAILS: '/ResourcePoolService.asmx/GetDetailsById',
    UPDATE_POOL_USER: '/ResourcePoolService.asmx/UpdateUserPoolHistoryDate'
}
