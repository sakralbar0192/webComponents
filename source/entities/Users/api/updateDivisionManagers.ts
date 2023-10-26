import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EUsersMethods, IUserItem } from '../types'

export interface IUpdateManagersRequestBody {
    divisionId: number
    userIds: number[]
}

export async function updateDivisionManagers(userIds: number[], divisionId: number): Promise<IResponse<IUserItem[]>> {
    const data = {
        divisionId,
        userIds
    }

    const url = EUsersMethods.SET_DIVISION_MANAGERS
    const method = EServerRequestMethods.POST

    return requestFromServer<IUserItem[]>({url, method, data})
}
