import { IPoolItem } from 'entities/Pools/types'
import { IUserItem } from 'entities/Users/types'
import { IEntityItem } from 'shared/types'

export enum EDivisionsPageLayers {
    divisionsLayer = 'divisionsLayer',
    divisionDetailsLayer = 'divisionDetailsLayer',
    poolDetailsLayer = 'poolDetailsLayer'
}

export interface IDivisionItem extends IEntityItem {
    IsProduction?: boolean
    Managers?: IUserItem[]
    Pools?: IPoolItem[]
    SendTimeApprovalNotifications?: boolean
    UserCount?: number
    Users?: IUserItem[]
}

export const EDivisionsMethods = {
    GET_ALL_DIVISIONS: '/DivisionService.asmx/GetActiveDetails',
    CREATE_DIVISION: '/DivisionService.asmx/AddDivision',
    DELETE_DIVISION: '/DivisionService.asmx/DeleteDivision',
    UPDATE_DIVISION: '/DivisionService.asmx/UpdateDivision',
    GET_DIVISION_DETAILS: '/DivisionService.asmx/GetDetailsById',
    GET_DIVISIONS_NAMES_LIST: '/DivisionService.asmx/GetActiveShort',
    GET_DIVISION_POOLS: '/ResourcePoolService.asmx/GetActiveShort'
}
