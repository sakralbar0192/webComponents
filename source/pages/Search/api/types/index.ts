import { IResponse, IServerResponse } from 'shared/types'

export interface IGetSearchPermissionsServerResponse extends IServerResponse {
    d: IGetSearchPermissionsResponse
}

export type IGetSearchPermissionsResponse = IResponse<IsearchPermissions>

export interface IsearchPermissions {
    IsAccountsAllowed: boolean
    IsDivisionsAllowed: boolean
    IsProjectsAllowed: boolean
    IsUsersAllowed: boolean
}
