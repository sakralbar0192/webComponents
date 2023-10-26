import { IUserItem } from 'entities/Users/types'
import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EPoolsMethods } from '../types'

export async function updatePoolUser(userId: number, id: number, poolId: number, startDate: string): Promise<IResponse<IUserItem>> {
    const data = {
        userId, id, poolId, startDate
    }

    const method = EServerRequestMethods.POST

    const url = EPoolsMethods.UPDATE_POOL_USER

    return requestFromServer<IUserItem>({url, method, data})
}
