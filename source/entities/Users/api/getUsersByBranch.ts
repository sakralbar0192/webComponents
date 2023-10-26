import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EUsersMethods, IUserItem } from '../types'

export async function getUsersByBranch(
    branchId: number,
    divisionId: number,
    assignedDivisionId: number
): Promise<IResponse<IUserItem[]>> {
    const url = EUsersMethods.GET_NOT_ASSIGNED_USER_BY_BRANCH_AND_DIVISION
    const data = {
        assignedDivisionId,
        branchId,
        divisionId
    }
    const method = EServerRequestMethods.POST

    return requestFromServer<IUserItem[]>({url, data, method})
}
