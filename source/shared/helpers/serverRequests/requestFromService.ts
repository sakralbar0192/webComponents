import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { IResponse, IServiceResponse } from 'shared/types'
import { AxiosResponse } from 'axios'

export async function requestFromService<T>(
    axiosResponse: AxiosResponse<IServiceResponse>
): Promise<IResponse<T>> {
    const response: IResponse<T> = {
        IsSucceeded: false,
        Message: REQUEST_FAILED_MESSAGE
    }

    const serverResponse = axiosResponse.data

    if (serverResponse && serverResponse.d) {
        response.IsSucceeded = serverResponse.d.IsSucceeded || false
        response.IsSucceeded
            ? response.Value = serverResponse.d.Value as T ?? undefined
            : response.Message = serverResponse.d.Message || REQUEST_FAILED_MESSAGE
    }
    return response
}
