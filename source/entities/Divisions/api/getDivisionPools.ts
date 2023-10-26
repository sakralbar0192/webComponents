import { IPoolItem } from 'entities/Pools/types'
import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EDivisionsMethods } from '../types'

export async function getDivisionPools(): Promise<IResponse<IPoolItem[]>> {
    const url = EDivisionsMethods.GET_DIVISION_POOLS
    const method = EServerRequestMethods.POST

    return requestFromServer<IPoolItem[]>({url, method})
}
