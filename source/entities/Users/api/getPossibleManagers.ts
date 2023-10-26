import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EUsersMethods, IPossibleManagerItem } from '../types'

export async function getPossibleManagers(divisionId: number): Promise<IResponse<IPossibleManagerItem[]>> {
    const url = EUsersMethods.GET_POSSIBLE_MANAGERS
    const data = {
        divisionId
    }
    const method = EServerRequestMethods.POST

    return requestFromServer<IPossibleManagerItem[]>({url, data, method})
}
