import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EUsersMethods, IUserItem } from '../types'

export async function getUsersByPool(
    poolId: number,
    divisionId: number,
    assignedPoolId: number
): Promise<IResponse<IUserItem[]>> {
    const url = EUsersMethods.GET_NOT_ASSIGNED_USER_BY_POOL_AND_DIVISION
    const data = {
        assignedPoolId,
        poolId,
        divisionId
    }
    const method = EServerRequestMethods.POST

    return requestFromServer<IUserItem[]>({url, data, method})
}
