import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import {  EServerRequestMethods, IResponse } from 'shared/types'
import { EPoolsMethods, IPoolItem } from '../types'

export async function getPoolDetails(poolId: number): Promise<IResponse<IPoolItem>> {
    const url = EPoolsMethods.GET_POOL_DETAILS
    const data = {
        poolId
    }
    const method = EServerRequestMethods.POST

    return requestFromServer<IPoolItem>({url, data, method})
}
