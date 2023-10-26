import { UNKNOWN_ERROR_MESSAGE } from 'shared/messages'
import { EDivisionsMethods, IDivisionItem } from '../types'
import { ECRUDModes, EServerRequestMethods, IResponse } from 'shared/types'
import { requestFromServer } from 'shared/helpers/serverRequests/requestFromServer'

export async function modifyDivision(mode: ECRUDModes, divisionItem: IDivisionItem): Promise<IResponse<IDivisionItem>> {
    let url, data
    const method = EServerRequestMethods.POST

    switch (mode) {
        case ECRUDModes.CREATE:
            data = {
                name: divisionItem.Name,
                sendTimeApprovalNotifications: divisionItem.SendTimeApprovalNotifications,
                isProduction: divisionItem.IsProduction
            }
            url = EDivisionsMethods.CREATE_DIVISION
            break

        case ECRUDModes.DELETE:
            data = {
                divisionId: divisionItem.Id
            }
            url = EDivisionsMethods.DELETE_DIVISION
            break

        case ECRUDModes.UPDATE:
            data = {
                id: divisionItem.Id,
                name: divisionItem.Name,
                sendTimeApprovalNotifications: divisionItem.SendTimeApprovalNotifications,
                isProduction: divisionItem.IsProduction
            }
            url = EDivisionsMethods.UPDATE_DIVISION
            break
        default: url = ''
    }

    if (url) {
        return requestFromServer<IDivisionItem>({url, method, data})
    } else return {
        IsSucceeded: false,
        Message: UNKNOWN_ERROR_MESSAGE
    }
}
