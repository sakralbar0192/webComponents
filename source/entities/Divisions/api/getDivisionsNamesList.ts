import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EDivisionsMethods, IDivisionItem } from '../types'

export async function getDivisionsNamesList(): Promise<IResponse<IDivisionItem[]>> {
    const url = EDivisionsMethods.GET_DIVISIONS_NAMES_LIST
    const method = EServerRequestMethods.POST

    return requestFromServer<IDivisionItem[]>({url, method})
}
