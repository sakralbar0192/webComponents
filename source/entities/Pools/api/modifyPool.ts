import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { EPoolsMethods, IPoolItem } from '../types'
import { ECRUDModes, EServerRequestMethods, IResponse } from 'shared/types'
import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'

export async function modifyPool(
    mode: ECRUDModes,
    poolItem: IPoolItem
): Promise<IResponse<IPoolItem>> {
    let url, data
    const method = EServerRequestMethods.POST

    switch (mode) {
        case ECRUDModes.CREATE:
            data = {
                divisionId: poolItem.DivisionId,
                name: poolItem.Name,
                managerId: poolItem.ManagerId || 0
            }
            url = EPoolsMethods.CREATE_POOL
            break

        case ECRUDModes.DELETE:
            data =  {
                poolId: poolItem.Id
            },
            url = EPoolsMethods.DELETE_POOL
            break
        case ECRUDModes.UPDATE:
            data = {
                id: poolItem.Id,
                name: poolItem.Name,
                managerId: poolItem.ManagerId || 0
            }
            url = EPoolsMethods.UPDATE_POOL
            break
        default:  url = ''
    }

    if (url) {
        return requestFromServer<IPoolItem>({url, method, data})
    } else return {
        IsSucceeded: false,
        Message: UNKNOWN_ERROR_MESSAGE
    }
}
