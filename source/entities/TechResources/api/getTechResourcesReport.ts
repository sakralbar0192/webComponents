import { REQUEST_FAILED_MESSAGE } from 'shared/messages'
import { IResponse } from 'shared/types'
import { ITechResourceCategory } from '../types'

interface IGetTechResourcesReportRequesrBody {
    categoryIds: number[]
    statusIds: number[]
}

export async function getTechResourcesReport(categoryIds: number[], statusIds: number[]): Promise<IResponse<ITechResourceCategory[]>> {
    const response: IResponse<ITechResourceCategory[]> = {
        IsSucceeded: false,
        Message: '',
        Value: []
    }

    const requestBody: IGetTechResourcesReportRequesrBody = {
        categoryIds,
        statusIds
    }

    return await fetch('/Services/TechResourcesService.asmx/GetTechResourceReport', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(requestBody)
    })
        .then(res => res.json())
        .then((serverResponse) => {
            response.IsSucceeded = serverResponse.d.IsSucceeded
            if (response.IsSucceeded) response.Value = [...serverResponse.d.Value] as ITechResourceCategory[]
            else response.Message = serverResponse.d.Message ? serverResponse.d.Message : REQUEST_FAILED_MESSAGE
            return response
        })
        .catch(function (error: Error) {
            response.Message = error.message ? error.message : REQUEST_FAILED_MESSAGE
            return response
        })
}
