import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EUsersMethods, IUserItem } from '../types'

interface IAssignedIntoPoolUser {
    UserId: number
    StartDate: string
}

export async function assignUsersIntoPool(poolId: number, users: IAssignedIntoPoolUser[]): Promise<IResponse<IUserItem[]>> {
    const url = EUsersMethods.ASSIGN_USERS_INTO_POOL
    const method = EServerRequestMethods.POST
    const data = {
        poolId,
        users
    }

    return requestFromServer({url, method, data})
}
