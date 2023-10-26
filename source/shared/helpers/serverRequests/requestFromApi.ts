import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { EApiRequestResults, IApiResponse, IResponse } from 'shared/types'
import { AxiosResponse } from 'axios'

export async function requestFromApi<T>(
    axiosResponse: AxiosResponse<IApiResponse>
): Promise<IResponse<T>> {
    const response: IResponse<T> = {
        IsSucceeded: false,
        Message: REQUEST_FAILED_MESSAGE
    }

    const serverResponse = axiosResponse.data

    if (serverResponse) {
        response.IsSucceeded = serverResponse.RequestResult === EApiRequestResults.SUCCESS
            response.IsSucceeded
                ? response.Value = serverResponse.Data as T ?? undefined
                : response.Message = serverResponse.Message || REQUEST_FAILED_MESSAGE
    }

    return response
}
