import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EDivisionsMethods, IDivisionItem } from '../types'

export async function getAllDivisions(): Promise<IResponse<IDivisionItem[]>> {
    const url = EDivisionsMethods.GET_ALL_DIVISIONS
    const method = EServerRequestMethods.POST

    return requestFromServer<IDivisionItem[]>({url, method})
}
