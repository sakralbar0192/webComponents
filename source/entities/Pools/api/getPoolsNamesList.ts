import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EPoolsMethods, IPoolItem } from '../types'

export async function getPoolsNamesList(divisionId: number): Promise<IResponse<IPoolItem[]>> {
    const url = EPoolsMethods.GET_POOLS_NAMES_LIST
    const data = {
        divisionId
    }
    const method = EServerRequestMethods.POST

    return requestFromServer<IPoolItem[]>({url, data, method})
}
