import axios from 'axios'
import { SUCCESS_RESPONSE_STATUS } from 'shared/consts'
import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { EServerRequestTypes, IRequestFromServerOptions, IResponse } from 'shared/types'
import { defineRequestType } from './defineRequestType'
import { requestFromApi } from './requestFromApi'
import { requestFromService } from './requestFromService'

export async function requestFromServer<T>(
    {
        url,
        method,
        params,
        data = {}
    }: IRequestFromServerOptions
): Promise<IResponse<T>> {

    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    }

    const defaultResponse = {
        IsSucceeded: false,
        Message: REQUEST_FAILED_MESSAGE
    }

    const requestType = defineRequestType(url)

    url = requestType === EServerRequestTypes.FROM_API
        ? '/Services' + url
        : '/Services' + url

    return await axios(
        {
            method,
            url,
            headers,
            data,
            params
        }
    )
        .then((res) => {
            if (res.status === SUCCESS_RESPONSE_STATUS) {
                switch (requestType) {
                    case EServerRequestTypes.FROM_SERVICE:
                        return requestFromService<T>(res)
                    case EServerRequestTypes.FROM_API:
                        return requestFromApi<T>(res)
                    default:
                        return defaultResponse
                }
            } else {
                throw new Error()
            }
        }).catch(() => {
            return defaultResponse
        })
}
