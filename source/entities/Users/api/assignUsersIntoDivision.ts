import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'
import { EServerRequestMethods, IResponse } from 'shared/types'
import { EUsersMethods, IUserItem } from '../types'

interface IAssignedIntoDivisionUser {
    UserId: number
    StartDate: string
}

export async function assignUsersIntoDivision(divisionId: number, users: IAssignedIntoDivisionUser[]): Promise<IResponse<IUserItem[]>> {
    const url = EUsersMethods.ASSIGN_USERS_INTO_DIVISIONS
    const method = EServerRequestMethods.POST
    const data = {
        users,
        divisionId
    }

    return requestFromServer({url, method, data})
}
