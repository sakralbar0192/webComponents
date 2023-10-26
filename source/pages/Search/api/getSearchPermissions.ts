import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { IGetSearchPermissionsResponse, IGetSearchPermissionsServerResponse } from './types'

export async function getSearchPermissions(): Promise<IGetSearchPermissionsResponse> {
    const response: IGetSearchPermissionsResponse = {
        IsSucceeded: false,
        Message: '',
        Value: {
            IsAccountsAllowed: false,
            IsDivisionsAllowed: false,
            IsProjectsAllowed: false,
            IsUsersAllowed: false
        }
    }

    return await fetch('/Services/SearchService.asmx/SearchPermissions', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
        .then(res => res.json())
        .then((data: IGetSearchPermissionsServerResponse) => {
            response.IsSucceeded = data.d.IsSucceeded

            if (response.IsSucceeded) {
                response.Value = data.d.Value
            } else {
                response.Message = data.d.Message ? data.d.Message : REQUEST_FAILED_MESSAGE
            }
            return response
        })
        .catch(() => {
            response.Message = REQUEST_FAILED_MESSAGE
            return response
        })
}
