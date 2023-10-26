import { IEntityItem } from 'shared/types'

export interface IUserItem extends IEntityItem {
    BranchName?: string
    PoolId?: number
    PoolName?: string
    StartDate?: string
    FrameId?: number
    Login?: string
    Id1C?: string
    Division?: string
}

export interface IPossibleManagerItem extends IUserItem {
    IsManager: boolean
}

export const EUsersMethods = {
    GET_POSSIBLE_MANAGERS: '/DivisionService.asmx/SelectedManagersList',
    SET_DIVISION_MANAGERS: '/DivisionService.asmx/SetManagers',
    GET_NOT_ASSIGNED_USER_BY_BRANCH_AND_DIVISION: '/DivisionService.asmx/GetNotAssignedUsersByBranchAndDivision',
    GET_NOT_ASSIGNED_USER_BY_POOL_AND_DIVISION: '/ResourcePoolService.asmx/GetNotAssignedUsersByPoolAndDivision',
    ASSIGN_USERS_INTO_DIVISIONS: '/DivisionService.asmx/AddUsersDivisionHistoryEntries',
    ASSIGN_USERS_INTO_POOL: '/ResourcePoolService.asmx/AddUsersPoolHistoryEntries'
}
