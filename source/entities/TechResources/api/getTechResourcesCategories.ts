import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { IEntityItem, IResponse } from 'shared/types'

export async function getTechResourcesCategories(): Promise<IResponse<IEntityItem[]>> {
    const response: IResponse<IEntityItem[]> = {
        IsSucceeded: false,
        Message: '',
        Value: []
    }

    return await fetch('/Services/TechResourcesService.asmx/GetTechResourceCategory', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
        .then(res => res.json())
        .then((serverResponse) => {
            response.IsSucceeded = serverResponse.d.IsSucceeded
            if (response.IsSucceeded) {
                response.Value = [...serverResponse.d.Value] as IEntityItem[]
            } else response.Message = serverResponse.d.Message
            return response
        })
        .catch(function (error: Error) {
            response.Message = error.message ? error.message : REQUEST_FAILED_MESSAGE
            return response
        })
}
