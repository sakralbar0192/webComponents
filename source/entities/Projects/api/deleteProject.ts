import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { IResponse } from 'shared/types'
import { IProjectItem } from '../types'

export interface IDeleteProjectRequestBody {
    projectId: number
}

export async function deleteProject(projectId: number): Promise<IResponse<IProjectItem>> {
    const response: IResponse<IProjectItem> = {
        IsSucceeded: false,
        Message: ''
    }

    const data: IDeleteProjectRequestBody = {
        projectId
    }

    return await fetch('/Services/ProjectService.asmx/DeleteProject', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((serverResponse) => {
            response.IsSucceeded = serverResponse.d.IsSucceeded
            if (response.IsSucceeded) {
                response.Value = serverResponse.d.Value as IProjectItem
            } else {
                response.Message = serverResponse.d.Message
            }
            return response
        })
        .catch(function () {
            response.IsSucceeded = false
            response.Message = REQUEST_FAILED_MESSAGE
            return response
        })
}
