import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EDivisionsMethods, IDivisionItem } from '../types'

export async function getDivisionDetails(divisionId: number): Promise<IResponse<IDivisionItem>> {
    const url = EDivisionsMethods.GET_DIVISION_DETAILS
    const data = {divisionId}
    const method = EServerRequestMethods.POST

    return requestFromServer<IDivisionItem>({url, data, method})
}
